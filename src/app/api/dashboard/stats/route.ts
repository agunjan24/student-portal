import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [courses, materialCount, sessions, totalProblems] = await Promise.all([
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        chapters: {
          orderBy: { chapterNumber: "asc" },
          include: {
            _count: { select: { materials: true, problems: true, studySessions: true } },
          },
        },
        _count: { select: { chapters: true } },
      },
    }),
    prisma.material.count(),
    prisma.studySession.findMany({
      where: { status: "completed" },
      orderBy: { completedAt: "desc" },
      take: 10,
      include: {
        chapter: {
          select: { id: true, title: true, course: { select: { id: true, courseName: true } } },
        },
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
    courses,
    courseCount: courses.length,
    materialCount,
    problemCount: totalProblems,
    sessionCount: totalSessions,
    overallAccuracy,
    recentSessions: sessions,
  });
}
