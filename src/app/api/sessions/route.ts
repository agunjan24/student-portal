import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quizId = searchParams.get("quizId");

  const where: Record<string, unknown> = {};
  if (quizId) where.quizId = quizId;

  const sessions = await prisma.studySession.findMany({
    where,
    orderBy: { startedAt: "desc" },
    include: {
      quiz: { select: { id: true, topic: true } },
      _count: { select: { responses: true } },
    },
  });

  return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { quizId, difficulty, problemIds } = body as {
    quizId: string;
    difficulty: string;
    problemIds: string[];
  };

  if (!quizId || !difficulty || !problemIds?.length) {
    return NextResponse.json(
      { error: "quizId, difficulty, and problemIds are required" },
      { status: 400 }
    );
  }

  const session = await prisma.studySession.create({
    data: {
      quizId,
      difficulty,
      totalProblems: problemIds.length,
    },
  });

  return NextResponse.json({ ...session, problemIds }, { status: 201 });
}
