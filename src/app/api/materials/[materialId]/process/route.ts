import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { extractContent } from "@/lib/ai/extract-content";
import {
  extractContentFromText,
  buildExtractionFromQuestions,
} from "@/lib/ai/extract-content-text";
import type { ExtractionResult } from "@/types";

async function runExtraction(material: {
  sourceType: string;
  filepath: string | null;
  mimeType: string | null;
  sourceContent: string | null;
}): Promise<ExtractionResult> {
  if (material.sourceType === "questions" && material.sourceContent) {
    return buildExtractionFromQuestions(material.sourceContent);
  }
  if (material.sourceType === "text" && material.sourceContent) {
    return extractContentFromText(material.sourceContent);
  }
  // Default: file-based extraction
  if (!material.filepath || !material.mimeType) {
    throw new Error("File path and MIME type are required for file extraction");
  }
  return extractContent(material.filepath, material.mimeType);
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ materialId: string }> }
) {
  const { materialId } = await params;
  const material = await prisma.material.findUnique({
    where: { id: materialId },
  });

  if (!material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  // Mark as processing
  await prisma.material.update({
    where: { id: materialId },
    data: { status: "processing", errorMessage: null },
  });

  try {
    const result = await runExtraction(material);

    await prisma.material.update({
      where: { id: materialId },
      data: {
        status: "completed",
        extractedText: result.extractedText,
        extractedTopics: JSON.stringify(result.topics),
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error during extraction";

    // Retry once
    try {
      const result = await runExtraction(material);

      await prisma.material.update({
        where: { id: materialId },
        data: {
          status: "completed",
          extractedText: result.extractedText,
          extractedTopics: JSON.stringify(result.topics),
        },
      });

      return NextResponse.json({ success: true, result });
    } catch (retryError) {
      const retryMessage =
        retryError instanceof Error ? retryError.message : "Unknown error during extraction";

      await prisma.material.update({
        where: { id: materialId },
        data: {
          status: "failed",
          errorMessage: retryMessage,
        },
      });

      return NextResponse.json(
        { error: retryMessage },
        { status: 500 }
      );
    }
  }
}
