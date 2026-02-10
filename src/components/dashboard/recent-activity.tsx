import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { DIFFICULTY_LABELS } from "@/lib/constants";

interface Session {
  id: string;
  difficulty: string;
  correctCount: number;
  incorrectCount: number;
  completedAt: string | null;
  chapter: { id: string; title: string; course: { id: string; courseName: string } };
}

export function RecentActivity({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        title="No study sessions yet"
        description="Start studying to see your activity here"
      />
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => {
        const total = session.correctCount + session.incorrectCount;
        const accuracy = total > 0 ? Math.round((session.correctCount / total) * 100) : 0;

        return (
          <Link
            key={session.id}
            href={`/courses/${session.chapter.course.id}/chapters/${session.chapter.id}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-medium">{session.chapter.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {session.chapter.course.courseName} &middot;{" "}
                {DIFFICULTY_LABELS[session.difficulty] || session.difficulty} &middot;{" "}
                {session.completedAt
                  ? new Date(session.completedAt).toLocaleDateString()
                  : "In progress"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{accuracy}%</p>
              <p className="text-xs text-gray-400">
                {session.correctCount}/{total}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
