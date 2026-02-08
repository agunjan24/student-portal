"use client";

import Link from "next/link";
import { Trophy, Target, RotateCcw, ArrowLeft } from "lucide-react";

interface SessionSummaryProps {
  quizId: string;
  quizTopic: string;
  correct: number;
  incorrect: number;
  total: number;
  difficulty: string;
}

export function SessionSummary({
  quizId,
  quizTopic,
  correct,
  incorrect,
  total,
  difficulty,
}: SessionSummaryProps) {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  let emoji: string;
  let message: string;
  if (accuracy >= 90) {
    emoji = "🎉";
    message = "Excellent work! You're well prepared.";
  } else if (accuracy >= 70) {
    emoji = "👍";
    message = "Good job! Keep practicing to improve.";
  } else if (accuracy >= 50) {
    emoji = "💪";
    message = "Getting there! Review the topics you missed.";
  } else {
    emoji = "📚";
    message = "Keep studying! Try reviewing the materials again.";
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center max-w-md mx-auto">
      <div className="text-4xl mb-4">{emoji}</div>
      <h2 className="text-xl font-bold mb-2">Session Complete!</h2>
      <p className="text-gray-500 mb-6">{message}</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-center mb-1">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold">{accuracy}%</p>
          <p className="text-xs text-gray-500">Accuracy</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <p className="text-2xl font-bold text-green-700">{correct}</p>
          <p className="text-xs text-gray-500">Correct</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <p className="text-2xl font-bold text-red-700">{incorrect}</p>
          <p className="text-xs text-gray-500">Incorrect</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/study/${quizId}`}
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Study Again
        </Link>
        <Link
          href={`/quizzes/${quizId}`}
          className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quiz
        </Link>
      </div>
    </div>
  );
}
