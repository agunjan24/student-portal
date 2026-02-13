import { anthropic } from "./client";
import { augmentContentPrompt } from "./prompts";
import { stripCodeFences } from "./utils";
import type { AugmentationResult } from "@/types";

interface AugmentContext {
  grade: number;
  level: string;
  courseName: string;
  chapterTitle: string;
  subject?: string;
  standardIds?: string[];
  extractedText: string;
  extractedTopics: string[];
}

export async function augmentContent(context: AugmentContext): Promise<AugmentationResult> {
  const prompt = augmentContentPrompt(context);

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16384,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from AI");
  }

  if (message.stop_reason === "max_tokens") {
    throw new Error("AI response was truncated — content may be too large for augmentation.");
  }

  const result = JSON.parse(stripCodeFences(textBlock.text)) as AugmentationResult;
  return result;
}
