import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { Header } from "@/components/layout/header";
import { prisma } from "@/lib/db";
import { StudyLauncher } from "@/components/study/study-launcher";

export default async function StudyPage({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      course: true,
      problems: { orderBy: { createdAt: "desc" } },
      materials: { where: { status: "completed" }, select: { id: true } },
      studySessions: {
        where: { status: "completed" },
        orderBy: { startedAt: "desc" },
        take: 10,
      },
    },
  });

  if (!chapter) notFound();

  const recentSessions = chapter.studySessions.map((s) => ({
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
          href={`/courses/${chapter.courseId}/chapters/${chapter.id}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Ch {chapter.chapterNumber}: {chapter.title}
        </Link>

        <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-600" />
          Study: {chapter.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">{chapter.course.courseName}</p>

        <StudyLauncher
          chapterId={chapter.id}
          chapterTitle={chapter.title}
          courseId={chapter.courseId}
          problemCount={chapter.problems.length}
          materialCount={chapter.materials.length}
          recentSessions={recentSessions}
        />
      </main>
    </>
  );
}
