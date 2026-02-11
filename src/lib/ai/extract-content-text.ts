import { anthropic } from "./client";
import { EXTRACT_TEXT_CONTENT_PROMPT } from "./prompts";
import { stripCodeFences } from "./utils";
import type { ExtractionResult, TypedQuestion } from "@/types";

export async function extractContentFromText(
  text: string
): Promise<ExtractionResult> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16384,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${EXTRACT_TEXT_CONTENT_PROMPT}\n\n---\n\n${text}`,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from AI");
  }

  if (message.stop_reason === "max_tokens") {
    throw new Error("AI response was truncated — content may be too large.");
  }

  const result = JSON.parse(stripCodeFences(textBlock.text)) as ExtractionResult;
  return result;
}

export function buildExtractionFromQuestions(
  sourceContent: string
): ExtractionResult {
  const questions: TypedQuestion[] = JSON.parse(sourceContent);

  const problems = questions.map((q) => ({
    question: q.question,
    answer: q.answer,
  }));

  const extractedText = questions
    .map((q, i) => {
      let text = `**Problem ${i + 1}:** ${q.question}`;
      if (q.answer) text += `\n**Answer:** ${q.answer}`;
      return text;
    })
    .join("\n\n");

  return {
    extractedText,
    topics: [],
    documentType: "worksheet",
    problems,
    keyFormulas: [],
    confidence: 1.0,
  };
}
