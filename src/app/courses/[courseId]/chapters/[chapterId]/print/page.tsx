import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { PrintProblems } from "@/components/chapters/print-problems";
import { prisma } from "@/lib/db";

export default async function PrintProblemsPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const { courseId, chapterId } = await params;

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      course: true,
      problems: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!chapter || chapter.problems.length === 0) notFound();

  // Group problems into batches: problems created within 60 seconds of each other
  const batches: {
    id: string;
    date: string;
    difficulty: string;
    problems: typeof chapter.problems;
  }[] = [];

  let currentBatch: typeof chapter.problems = [];
  let batchStart: Date | null = null;

  for (const problem of chapter.problems) {
    const createdAt = new Date(problem.createdAt);
    if (
      batchStart === null ||
      createdAt.getTime() - batchStart.getTime() > 60_000
    ) {
      // Start a new batch
      if (currentBatch.length > 0) {
        const first = currentBatch[0];
        batches.push({
          id: `batch-${batches.length}`,
          date: new Date(first.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          difficulty: first.difficulty,
          problems: currentBatch,
        });
      }
      currentBatch = [problem];
      batchStart = createdAt;
    } else {
      currentBatch.push(problem);
    }
  }

  // Push the last batch
  if (currentBatch.length > 0) {
    const first = currentBatch[0];
    batches.push({
      id: `batch-${batches.length}`,
      date: new Date(first.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      difficulty: first.difficulty,
      problems: currentBatch,
    });
  }

  // Serialize for the client component
  const serializedBatches = batches.map((b) => ({
    ...b,
    problems: b.problems.map((p) => ({
      id: p.id,
      questionText: p.questionText,
      solutionText: p.solutionText,
      difficulty: p.difficulty,
      topic: p.topic,
    })),
  }));

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 print:max-w-none print:px-8 print:py-4">
        <div className="print:hidden">
          <Link
            href={`/courses/${courseId}/chapters/${chapterId}`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Ch {chapter.chapterNumber}: {chapter.title}
          </Link>

          <h1 className="text-2xl font-bold mb-6">
            Print Problems &mdash; Ch {chapter.chapterNumber}: {chapter.title}
          </h1>
        </div>

        <PrintProblems
          batches={serializedBatches}
          chapterTitle={`Ch ${chapter.chapterNumber}: ${chapter.title}`}
          courseName={chapter.course.courseName}
        />
      </main>
    </>
  );
}
