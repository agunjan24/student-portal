import { anthropic } from "@/lib/ai/client";
import { stripCodeFences } from "@/lib/ai/utils";
import { getStandardsForCourse } from "./ma-standards";

export interface StandardSuggestion {
  standardId: string;
  confidence: number;
  reason: string;
}

export async function suggestStandardsForTitle(
  chapterTitle: string,
  courseName: string
): Promise<StandardSuggestion[]> {
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
        content: `You are a curriculum alignment specialist for the MA Mathematics Curriculum Framework. Given a chapter title from a ${courseName} course, suggest which standards this chapter likely covers.

## Standards for ${courseName}:
${standardsSummary}

## Chapter Title:
${chapterTitle}

Analyze the chapter title and match it to the most relevant standards. Consider:
- Keywords and mathematical topics in the title
- Common chapter groupings in ${courseName} courses
- Abbreviations and shorthand teachers commonly use

Return a JSON array of suggested standards. Each object should have:
- "standardId": the standard ID (e.g., "F-IF.7e")
- "confidence": number 0-1 indicating how likely this standard is covered
- "reason": brief explanation of why this standard matches the chapter title

Only include standards with confidence >= 0.4. Return ONLY valid JSON array, no markdown code fences.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return [];
  }

  try {
    const suggestions = JSON.parse(stripCodeFences(textBlock.text)) as StandardSuggestion[];
    return suggestions.filter((s) => s.confidence >= 0.4);
  } catch {
    return [];
  }
}
