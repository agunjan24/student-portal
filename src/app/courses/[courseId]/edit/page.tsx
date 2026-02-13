import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { CourseForm } from "@/components/courses/course-form";
import { prisma } from "@/lib/db";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) notFound();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
        <CourseForm
          initialData={{
            id: course.id,
            grade: course.grade,
            subject: course.subject,
            level: course.level,
            courseName: course.courseName,
          }}
        />
      </main>
    </>
  );
}
