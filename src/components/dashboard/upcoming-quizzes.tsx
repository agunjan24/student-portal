import Link from "next/link";
import { Calendar, FileText } from "lucide-react";
import { DaysRemaining } from "@/components/shared/days-remaining";
import { EmptyState } from "@/components/shared/empty-state";

interface Quiz {
  id: string;
  topic: string;
  quizDate: Date;
  _count: { materials: number; problems: number; studySessions: number };
}

export function UpcomingQuizzes({ quizzes }: { quizzes: Quiz[] }) {
  const upcoming = quizzes.filter(
    (q) => new Date(q.quizDate) >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  if (upcoming.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No upcoming quizzes"
        description="Create a quiz to start tracking your preparation"
        actionLabel="Create Quiz"
        actionHref="/quizzes/new"
      />
    );
  }

  return (
    <div className="space-y-2">
      {upcoming.slice(0, 5).map((quiz) => (
        <Link
          key={quiz.id}
          href={`/quizzes/${quiz.id}`}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div>
            <p className="font-medium text-sm">{quiz.topic}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(quiz.quizDate).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <DaysRemaining date={new Date(quiz.quizDate)} />
        </Link>
      ))}
    </div>
  );
}
