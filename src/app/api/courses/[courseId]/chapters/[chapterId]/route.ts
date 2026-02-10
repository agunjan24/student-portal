import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  const { chapterId } = await params;
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      course: true,
      materials: { orderBy: { createdAt: "desc" } },
      problems: { orderBy: { createdAt: "desc" } },
      studySessions: { orderBy: { startedAt: "desc" } },
      _count: {
        select: { materials: true, problems: true, studySessions: true },
      },
    },
  });

  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  return NextResponse.json(chapter);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  const { chapterId } = await params;
  const body = await request.json();
  const { title, chapterNumber, description, testDate, standardIds } = body;

  const chapter = await prisma.chapter.update({
    where: { id: chapterId },
    data: {
      ...(title !== undefined && { title }),
      ...(chapterNumber !== undefined && { chapterNumber }),
      ...(description !== undefined && { description: description || null }),
      ...(testDate !== undefined && {
        testDate: testDate ? new Date(testDate) : null,
      }),
      ...(standardIds !== undefined && {
        standardIds: standardIds ? JSON.stringify(standardIds) : null,
      }),
    },
  });

  return NextResponse.json(chapter);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  const { chapterId } = await params;
  await prisma.chapter.delete({ where: { id: chapterId } });
  return NextResponse.json({ success: true });
}
