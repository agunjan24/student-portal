import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateFile, saveFile } from "@/lib/upload";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chapterId = searchParams.get("chapterId");
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (chapterId) where.chapterId = chapterId;
  if (status) where.status = status;

  const materials = await prisma.material.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      chapter: {
        select: { id: true, title: true, course: { select: { id: true, courseName: true } } },
      },
    },
  });

  return NextResponse.json(materials);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const chapterId = formData.get("chapterId") as string | null;
  const materialType = formData.get("materialType") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const validationError = validateFile(file);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // Create material record first to get ID
  const material = await prisma.material.create({
    data: {
      filename: file.name,
      filepath: "", // Will update after saving
      mimeType: file.type,
      fileSize: file.size,
      chapterId: chapterId || null,
      materialType: materialType || "other",
    },
  });

  // Save file to disk
  const { filepath, filename } = await saveFile(material.id, file);

  // Update with actual filepath
  const updated = await prisma.material.update({
    where: { id: material.id },
    data: { filepath, filename },
  });

  return NextResponse.json(updated, { status: 201 });
}
