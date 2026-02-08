import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { Header } from "@/components/layout/header";
import { prisma } from "@/lib/db";
import { StudyLauncher } from "@/components/study/study-launcher";

export default async function StudyPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      problems: { orderBy: { createdAt: "desc" } },
      materials: { where: { status: "completed" }, select: { id: true } },
      studySessions: {
        where: { status: "completed" },
        orderBy: { startedAt: "desc" },
        take: 10,
      },
    },
  });

  if (!quiz) notFound();

  const recentSessions = quiz.studySessions.map((s) => ({
    id: s.id,
    difficulty: s.difficulty,
    correctCount: s.correctCount,
    incorrectCount: s.incorrectCount,
    startedAt: s.startedAt.toISOString(),
  }));

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href={`/quizzes/${quiz.id}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {quiz.topic}
        </Link>

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          Study: {quiz.topic}
        </h1>

        <StudyLauncher
          quizId={quiz.id}
          quizTopic={quiz.topic}
          problemCount={quiz.problems.length}
          materialCount={quiz.materials.length}
          recentSessions={recentSessions}
        />
      </main>
    </>
  );
}
