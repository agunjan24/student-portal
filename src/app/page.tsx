import { Header } from "@/components/layout/header";
import { UpcomingTests } from "@/components/dashboard/upcoming-tests";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ProgressSummary } from "@/components/dashboard/progress-summary";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [courses, materialCount, problemCount, sessions] = await Promise.all([
    prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        chapters: {
          orderBy: { chapterNumber: "asc" },
          select: {
            id: true,
            title: true,
            chapterNumber: true,
            testDate: true,
            courseId: true,
          },
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
        chapter: {
          select: { id: true, title: true, course: { select: { id: true, courseName: true } } },
        },
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

  // Flatten chapters for upcoming tests
  const allChapters = courses.flatMap((c) =>
    c.chapters.map((ch) => ({
      ...ch,
      courseName: c.courseName,
    }))
  );

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-gray-500 text-sm">Track your study preparation progress</p>
        </div>

        <QuickActions hasCourses={courses.length > 0} />

        <ProgressSummary
          overallAccuracy={overallAccuracy}
          sessionCount={sessions.length}
          materialCount={materialCount}
          problemCount={problemCount}
          courseCount={courses.length}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold mb-3">Upcoming Tests</h2>
            <UpcomingTests chapters={allChapters} />
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
