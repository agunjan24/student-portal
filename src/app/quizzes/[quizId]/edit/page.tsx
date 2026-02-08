import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { QuizForm } from "@/components/quizzes/quiz-form";
import { prisma } from "@/lib/db";

export default async function EditQuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
  });

  if (!quiz) notFound();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Quiz</h1>
        <QuizForm
          initialData={{
            id: quiz.id,
            topic: quiz.topic,
            description: quiz.description,
            quizDate: quiz.quizDate.toISOString(),
          }}
        />
      </main>
    </>
  );
}
