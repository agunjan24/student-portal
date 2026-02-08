import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { extractContent } from "@/lib/ai/extract-content";

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
    const result = await extractContent(material.filepath, material.mimeType);

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
      const result = await extractContent(material.filepath, material.mimeType);

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
