import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { chapters: true } },
    },
  });
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { subject, grade, level, courseName } = body;

  if (!courseName) {
    return NextResponse.json(
      { error: "Course name is required" },
      { status: 400 }
    );
  }

  const course = await prisma.course.create({
    data: {
      grade: grade ?? 10,
      subject: subject ?? "Mathematics",
      level: level ?? "regular",
      courseName,
    },
  });

  return NextResponse.json(course, { status: 201 });
}
