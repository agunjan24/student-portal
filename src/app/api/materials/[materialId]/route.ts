import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteFile } from "@/lib/upload";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ materialId: string }> }
) {
  const { materialId } = await params;
  const material = await prisma.material.findUnique({
    where: { id: materialId },
    include: {
      chapter: {
        select: { id: true, title: true, courseId: true, course: { select: { id: true, courseName: true } } },
      },
    },
  });

  if (!material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  return NextResponse.json(material);
}

export async function DELETE(
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

  await deleteFile(material.id, material.filename);
  await prisma.material.delete({ where: { id: materialId } });

  return NextResponse.json({ success: true });
}
