import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Header } from "@/components/layout/header";
import { QuizCard } from "@/components/quizzes/quiz-card";
import { EmptyState } from "@/components/shared/empty-state";
import { prisma } from "@/lib/db";

export default async function QuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { quizDate: "asc" },
    include: {
      _count: {
        select: {
          materials: true,
          problems: true,
          studySessions: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Quizzes</h1>
          <Link
            href="/quizzes/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Quiz
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No quizzes yet"
            description="Create your first quiz to start preparing"
            actionLabel="Create Quiz"
            actionHref="/quizzes/new"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={{
                  ...quiz,
                  quizDate: quiz.quizDate.toISOString(),
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
