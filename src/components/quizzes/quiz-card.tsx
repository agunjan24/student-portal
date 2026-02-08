import Link from "next/link";
import { FileText, Brain, GraduationCap } from "lucide-react";
import { DaysRemaining } from "@/components/shared/days-remaining";

interface QuizCardProps {
  quiz: {
    id: string;
    topic: string;
    description: string | null;
    quizDate: string;
    _count: {
      materials: number;
      problems: number;
      studySessions: number;
    };
  };
}

export function QuizCard({ quiz }: QuizCardProps) {
  const date = new Date(quiz.quizDate);

  return (
    <Link
      href={`/quizzes/${quiz.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{quiz.topic}</h3>
        <DaysRemaining date={date} />
      </div>

      {quiz.description && (
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{quiz.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" />
          {quiz._count.materials} material{quiz._count.materials !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1">
          <Brain className="w-3.5 h-3.5" />
          {quiz._count.problems} problem{quiz._count.problems !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5" />
          {quiz._count.studySessions} session{quiz._count.studySessions !== 1 ? "s" : ""}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      </p>
    </Link>
  );
}
