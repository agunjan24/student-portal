import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Plus, Layers } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ChapterCard } from "@/components/chapters/chapter-card";
import { DeleteCourseButton } from "@/components/courses/delete-course-button";
import { EmptyState } from "@/components/shared/empty-state";
import { COURSE_LEVEL_LABELS } from "@/lib/constants";
import { prisma } from "@/lib/db";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: { chapterNumber: "asc" },
        include: {
          _count: {
            select: { materials: true, problems: true, studySessions: true },
          },
        },
      },
      _count: { select: { chapters: true } },
    },
  });

  if (!course) notFound();

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{course.courseName}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                {COURSE_LEVEL_LABELS[course.level] || course.level}
              </span>
            </div>
            <p className="text-sm text-gray-500">Grade {course.grade} &middot; {course._count.chapters} chapter{course._count.chapters !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/courses/${course.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <DeleteCourseButton courseId={course.id} courseName={course.courseName} />
          </div>
        </div>

        {/* Add chapter button */}
        <div className="mb-6">
          <Link
            href={`/courses/${course.id}/chapters/new`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Chapter
          </Link>
        </div>

        {/* Chapters list */}
        {course.chapters.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="No chapters yet"
            description="Add your first chapter to start organizing study materials"
            actionLabel="Add Chapter"
            actionHref={`/courses/${course.id}/chapters/new`}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {course.chapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                courseId={course.id}
                chapter={{
                  ...chapter,
                  testDate: chapter.testDate?.toISOString() ?? null,
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
