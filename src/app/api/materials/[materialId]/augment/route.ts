import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { augmentContent } from "@/lib/ai/augment-content";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ materialId: string }> }
) {
  const { materialId } = await params;
  const material = await prisma.material.findUnique({
    where: { id: materialId },
    include: {
      chapter: { include: { course: true } },
    },
  });

  if (!material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  if (material.status !== "completed") {
    return NextResponse.json(
      { error: "Material must be extracted before augmentation" },
      { status: 400 }
    );
  }

  if (!material.chapter) {
    return NextResponse.json(
      { error: "Material must be linked to a chapter for augmentation" },
      { status: 400 }
    );
  }

  // Mark as processing
  await prisma.material.update({
    where: { id: materialId },
    data: { augmentationStatus: "processing" },
  });

  try {
    let topics: string[] = [];
    try {
      if (material.extractedTopics) topics = JSON.parse(material.extractedTopics);
    } catch { /* ignore */ }

    let standardIds: string[] = [];
    try {
      if (material.chapter.standardIds) standardIds = JSON.parse(material.chapter.standardIds);
    } catch { /* ignore */ }

    const result = await augmentContent({
      grade: material.chapter.course.grade,
      level: material.chapter.course.level,
      courseName: material.chapter.course.courseName,
      chapterTitle: material.chapter.title,
      standardIds,
      extractedText: material.extractedText || "",
      extractedTopics: topics,
    });

    await prisma.material.update({
      where: { id: materialId },
      data: {
        augmentedContent: JSON.stringify(result),
        augmentationStatus: "completed",
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Augmentation failed";

    await prisma.material.update({
      where: { id: materialId },
      data: { augmentationStatus: "failed" },
    });

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
