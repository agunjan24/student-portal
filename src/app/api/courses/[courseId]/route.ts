import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { chapterNumber: "asc" },
        include: {
          _count: {
            select: { materials: true, problems: true, studySessions: true },
          },
        },
      },
      _count: { select: { chapters: true } },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const body = await request.json();
  const { grade, level, courseName } = body;

  const course = await prisma.course.update({
    where: { id: courseId },
    data: {
      ...(grade !== undefined && { grade }),
      ...(level !== undefined && { level }),
      ...(courseName !== undefined && { courseName }),
    },
  });

  return NextResponse.json(course);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  await prisma.course.delete({ where: { id: courseId } });
  return NextResponse.json({ success: true });
}
