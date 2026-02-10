import Link from "next/link";
import { Calendar } from "lucide-react";
import { DaysRemaining } from "@/components/shared/days-remaining";
import { EmptyState } from "@/components/shared/empty-state";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  testDate: Date | null;
  courseId: string;
  courseName: string;
}

export function UpcomingTests({ chapters }: { chapters: Chapter[] }) {
  const upcoming = chapters
    .filter((ch) => ch.testDate && new Date(ch.testDate) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => new Date(a.testDate!).getTime() - new Date(b.testDate!).getTime());

  if (upcoming.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No upcoming tests"
        description="Add a chapter with a test date to track your preparation"
        actionLabel="Create Course"
        actionHref="/courses/new"
      />
    );
  }

  return (
    <div className="space-y-2">
      {upcoming.slice(0, 5).map((ch) => (
        <Link
          key={ch.id}
          href={`/courses/${ch.courseId}/chapters/${ch.id}`}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div>
            <p className="font-medium text-sm">
              Ch {ch.chapterNumber}: {ch.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {ch.courseName} &middot;{" "}
              {new Date(ch.testDate!).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <DaysRemaining date={new Date(ch.testDate!)} />
        </Link>
      ))}
    </div>
  );
}
