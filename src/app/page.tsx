import { Header } from "@/components/layout/header";
import { UpcomingQuizzes } from "@/components/dashboard/upcoming-quizzes";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ProgressSummary } from "@/components/dashboard/progress-summary";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [quizzes, materialCount, problemCount, sessions] = await Promise.all([
    prisma.quiz.findMany({
      orderBy: { quizDate: "asc" },
      include: {
        _count: {
          select: { materials: true, problems: true, studySessions: true },
        },
      },
    }),
    prisma.material.count(),
    prisma.problem.count(),
    prisma.studySession.findMany({
      where: { status: "completed" },
      orderBy: { completedAt: "desc" },
      take: 10,
      include: {
        quiz: { select: { id: true, topic: true } },
      },
    }),
  ]);

  const totalCorrect = sessions.reduce((sum, s) => sum + s.correctCount, 0);
  const totalAnswered = sessions.reduce(
    (sum, s) => sum + s.correctCount + s.incorrectCount,
    0
  );
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Track your quiz preparation progress</p>
        </div>

        {/* Quick Actions */}
        <QuickActions hasQuizzes={quizzes.length > 0} />

        {/* Progress Summary */}
        <ProgressSummary
          overallAccuracy={overallAccuracy}
          sessionCount={sessions.length}
          materialCount={materialCount}
          problemCount={problemCount}
        />

        {/* Two-column layout on desktop */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold mb-3">Upcoming Quizzes</h2>
            <UpcomingQuizzes quizzes={quizzes} />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold mb-3">Recent Study Sessions</h2>
            <RecentActivity
              sessions={sessions.map((s) => ({
                ...s,
                completedAt: s.completedAt?.toISOString() ?? null,
              }))}
            />
          </div>
        </div>
      </main>
    </>
  );
}
