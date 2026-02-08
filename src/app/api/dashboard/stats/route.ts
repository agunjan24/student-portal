import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [quizzes, materials, sessions, totalProblems] = await Promise.all([
    prisma.quiz.findMany({
      orderBy: { quizDate: "asc" },
      include: {
        _count: {
          select: { materials: true, problems: true, studySessions: true },
        },
      },
    }),
    prisma.material.count(),
    prisma.studySession.findMany({
      where: { status: "completed" },
      orderBy: { completedAt: "desc" },
      take: 10,
      include: {
        quiz: { select: { id: true, topic: true } },
      },
    }),
    prisma.problem.count(),
  ]);

  const totalSessions = sessions.length;
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correctCount, 0);
  const totalAnswered = sessions.reduce(
    (sum, s) => sum + s.correctCount + s.incorrectCount,
    0
  );
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  return NextResponse.json({
    quizzes,
    materialCount: materials,
    problemCount: totalProblems,
    sessionCount: totalSessions,
    overallAccuracy,
    recentSessions: sessions,
  });
}
