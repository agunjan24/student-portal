import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ChapterForm } from "@/components/chapters/chapter-form";
import { prisma } from "@/lib/db";

export default async function EditChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const { courseId, chapterId } = await params;
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { course: { select: { id: true, courseName: true } } },
  });

  if (!chapter) notFound();

  let parsedStandards: string[] | null = null;
  try {
    if (chapter.standardIds) parsedStandards = JSON.parse(chapter.standardIds);
  } catch { /* ignore */ }

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Chapter</h1>
        <ChapterForm
          courseId={courseId}
          courseName={chapter.course.courseName}
          initialData={{
            id: chapter.id,
            title: chapter.title,
            chapterNumber: chapter.chapterNumber,
            description: chapter.description,
            testDate: chapter.testDate?.toISOString() ?? null,
            standardIds: parsedStandards,
          }}
        />
      </main>
    </>
  );
}
