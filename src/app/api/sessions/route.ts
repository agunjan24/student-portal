import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chapterId = searchParams.get("chapterId");

  const where: Record<string, unknown> = {};
  if (chapterId) where.chapterId = chapterId;

  const sessions = await prisma.studySession.findMany({
    where,
    orderBy: { startedAt: "desc" },
    include: {
      chapter: {
        select: { id: true, title: true, course: { select: { id: true, courseName: true } } },
      },
      _count: { select: { responses: true } },
    },
  });

  return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { chapterId, difficulty, problemIds } = body as {
    chapterId: string;
    difficulty: string;
    problemIds: string[];
  };

  if (!chapterId || !difficulty || !problemIds?.length) {
    return NextResponse.json(
      { error: "chapterId, difficulty, and problemIds are required" },
      { status: 400 }
    );
  }

  const session = await prisma.studySession.create({
    data: {
      chapterId,
      difficulty,
      totalProblems: problemIds.length,
    },
  });

  return NextResponse.json({ ...session, problemIds }, { status: 201 });
}
