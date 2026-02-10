import { anthropic } from "@/lib/ai/client";
import { stripCodeFences } from "@/lib/ai/utils";
import { getStandardsForCourse } from "./ma-standards";

export interface StandardMatch {
  standardId: string;
  confidence: number;
  reason: string;
}

export async function matchStandards(
  extractedTopics: string[],
  extractedText: string,
  courseName: string
): Promise<StandardMatch[]> {
  const standards = getStandardsForCourse(courseName);
  if (standards.length === 0) return [];

  const standardsSummary = standards
    .map((s) => `${s.id}: ${s.description} [Vocab: ${s.keyVocabulary.join(", ")}]`)
    .join("\n");

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a curriculum alignment specialist. Given extracted content from a student's study material and a list of MA Mathematics Curriculum Framework standards, identify which standards are covered by this material.

## Standards for ${courseName}:
${standardsSummary}

## Extracted Topics:
${extractedTopics.join(", ")}

## Extracted Text (excerpt):
${extractedText.slice(0, 3000)}

Return a JSON array of matched standards. Each object should have:
- "standardId": the standard ID (e.g., "G-SRT.6")
- "confidence": number 0-1 indicating match confidence
- "reason": brief explanation of why this standard matches

Only include standards with confidence >= 0.5. Return ONLY valid JSON array, no markdown code fences.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return [];
  }

  try {
    const matches = JSON.parse(stripCodeFences(textBlock.text)) as StandardMatch[];
    return matches.filter((m) => m.confidence >= 0.5);
  } catch {
    return [];
  }
}
