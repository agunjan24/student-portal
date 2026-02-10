import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const chapters = await prisma.chapter.findMany({
    where: { courseId },
    orderBy: { chapterNumber: "asc" },
    include: {
      _count: {
        select: { materials: true, problems: true, studySessions: true },
      },
    },
  });
  return NextResponse.json(chapters);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const body = await request.json();
  const { title, chapterNumber, description, testDate, standardIds } = body;

  if (!title || chapterNumber === undefined) {
    return NextResponse.json(
      { error: "Title and chapter number are required" },
      { status: 400 }
    );
  }

  const chapter = await prisma.chapter.create({
    data: {
      courseId,
      title,
      chapterNumber,
      description: description || null,
      testDate: testDate ? new Date(testDate) : null,
      standardIds: standardIds ? JSON.stringify(standardIds) : null,
    },
  });

  return NextResponse.json(chapter, { status: 201 });
}
