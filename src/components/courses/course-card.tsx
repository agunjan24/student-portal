import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import { COURSE_LEVEL_LABELS } from "@/lib/constants";

interface CourseCardProps {
  course: {
    id: string;
    grade: number;
    level: string;
    courseName: string;
    _count: { chapters: number };
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{course.courseName}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
          {COURSE_LEVEL_LABELS[course.level] || course.level}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3">Grade {course.grade}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          {course._count.chapters} chapter{course._count.chapters !== 1 ? "s" : ""}
        </span>
      </div>
    </Link>
  );
}
