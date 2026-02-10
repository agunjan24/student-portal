import { Header } from "@/components/layout/header";
import { UploadForm } from "@/components/materials/upload-form";
import { prisma } from "@/lib/db";

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ chapterId?: string }>;
}) {
  const { chapterId } = await searchParams;
  const chapters = await prisma.chapter.findMany({
    select: { id: true, title: true, chapterNumber: true, course: { select: { courseName: true } } },
    orderBy: { chapterNumber: "asc" },
  });

  const formattedChapters = chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    chapterNumber: ch.chapterNumber,
    courseName: ch.course.courseName,
  }));

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Upload Material</h1>
        <UploadForm chapters={formattedChapters} defaultChapterId={chapterId} />
      </main>
    </>
  );
}
