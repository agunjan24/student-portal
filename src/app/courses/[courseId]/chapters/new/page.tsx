import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { ChapterForm } from "@/components/chapters/chapter-form";
import { prisma } from "@/lib/db";

export default async function NewChapterPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: { id: true, courseName: true },
  });

  if (!course) notFound();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Add Chapter to {course.courseName}</h1>
        <ChapterForm courseId={course.id} courseName={course.courseName} />
      </main>
    </>
  );
}
