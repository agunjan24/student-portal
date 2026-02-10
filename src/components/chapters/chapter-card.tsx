import Link from "next/link";
import { FileText, Brain, GraduationCap } from "lucide-react";
import { DaysRemaining } from "@/components/shared/days-remaining";

interface ChapterCardProps {
  courseId: string;
  chapter: {
    id: string;
    title: string;
    chapterNumber: number;
    testDate: string | null;
    standardIds: string | null;
    _count: {
      materials: number;
      problems: number;
      studySessions: number;
    };
  };
}

export function ChapterCard({ courseId, chapter }: ChapterCardProps) {
  let parsedStandards: string[] = [];
  try {
    if (chapter.standardIds) parsedStandards = JSON.parse(chapter.standardIds);
  } catch { /* ignore */ }

  return (
    <Link
      href={`/courses/${courseId}/chapters/${chapter.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">
          Ch {chapter.chapterNumber}: {chapter.title}
        </h3>
        {chapter.testDate && <DaysRemaining date={new Date(chapter.testDate)} />}
      </div>

      {parsedStandards.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {parsedStandards.slice(0, 4).map((id) => (
            <span
              key={id}
              className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700"
            >
              {id}
            </span>
          ))}
          {parsedStandards.length > 4 && (
            <span className="text-[10px] text-gray-400">+{parsedStandards.length - 4} more</span>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          {chapter._count.materials} material{chapter._count.materials !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1">
          <Brain className="w-3.5 h-3.5" />
          {chapter._count.problems} problem{chapter._count.problems !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5" />
          {chapter._count.studySessions} session{chapter._count.studySessions !== 1 ? "s" : ""}
        </span>
      </div>

      {chapter.testDate && (
        <p className="text-xs text-gray-400 mt-3">
          Test:{" "}
          {new Date(chapter.testDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </Link>
  );
}
