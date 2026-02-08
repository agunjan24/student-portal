import Link from "next/link";
import { Plus, Upload, Brain } from "lucide-react";

interface QuickActionsProps {
  hasQuizzes: boolean;
}

export function QuickActions({ hasQuizzes }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Link
        href="/quizzes/new"
        className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium text-sm text-blue-900">New Quiz</p>
          <p className="text-xs text-blue-600">Create a quiz to track</p>
        </div>
      </Link>

      <Link
        href="/materials/upload"
        className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0">
          <Upload className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium text-sm text-purple-900">Upload Material</p>
          <p className="text-xs text-purple-600">Add study materials</p>
        </div>
      </Link>

      {hasQuizzes && (
        <Link
          href="/quizzes"
          className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm text-green-900">Study Now</p>
            <p className="text-xs text-green-600">Practice for a quiz</p>
          </div>
        </Link>
      )}
    </div>
  );
}
