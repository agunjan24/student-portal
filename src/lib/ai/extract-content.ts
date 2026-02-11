import Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "./client";
import { EXTRACT_CONTENT_PROMPT } from "./prompts";
import { readFileAsBase64 } from "../upload";
import { stripCodeFences } from "./utils";
import type { ExtractionResult } from "@/types";

type ImageMediaType = "image/jpeg" | "image/png" | "image/gif" | "image/webp";

export async function extractContent(
  filepath: string,
  mimeType: string
): Promise<ExtractionResult> {
  const base64 = await readFileAsBase64(filepath);

  const fileBlock: Anthropic.Messages.ImageBlockParam | Anthropic.Messages.DocumentBlockParam =
    mimeType === "application/pdf"
      ? {
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: base64,
          },
        }
      : {
          type: "image",
          source: {
            type: "base64",
            media_type: mimeType as ImageMediaType,
            data: base64,
          },
        };

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16384,
    messages: [
      {
        role: "user",
        content: [
          fileBlock,
          {
            type: "text",
            text: EXTRACT_CONTENT_PROMPT,
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
    throw new Error("AI response was truncated — document may be too large. Try uploading fewer pages.");
  }

  const result = JSON.parse(stripCodeFences(textBlock.text)) as ExtractionResult;
  return result;
}
