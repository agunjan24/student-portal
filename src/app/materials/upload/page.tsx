import { Header } from "@/components/layout/header";
import { UploadForm } from "@/components/materials/upload-form";
import { prisma } from "@/lib/db";

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ quizId?: string }>;
}) {
  const { quizId } = await searchParams;
  const quizzes = await prisma.quiz.findMany({
    select: { id: true, topic: true },
    orderBy: { quizDate: "asc" },
  });

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Upload Material</h1>
        <UploadForm quizzes={quizzes} defaultQuizId={quizId} />
      </main>
    </>
  );
}
