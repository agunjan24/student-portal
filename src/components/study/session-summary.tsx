"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Target, RotateCcw, ArrowLeft, Tag } from "lucide-react";

interface SessionSummaryProps {
  sessionId: string;
  chapterId: string;
  chapterTitle: string;
  courseId: string;
  correct: number;
  incorrect: number;
  total: number;
  difficulty: string;
}

export function SessionSummary({
  sessionId,
  chapterId,
  chapterTitle,
  courseId,
  correct,
  incorrect,
  total,
  difficulty,
}: SessionSummaryProps) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

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

  async function saveName() {
    if (!name.trim()) return;
    try {
      await fetch(`/api/sessions/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      setSaved(true);
    } catch {
      // Silently handle
    }
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

      <div className="mb-6">
        <label htmlFor="session-name" className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
          <Tag className="w-3.5 h-3.5" />
          Name this session
        </label>
        <div className="flex gap-2">
          <input
            id="session-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveName(); }}
            placeholder="e.g. Quadratics practice"
            disabled={saved}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
          />
          {!saved ? (
            <button
              onClick={saveName}
              disabled={!name.trim()}
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Save
            </button>
          ) : (
            <span className="px-3 py-2 text-sm text-green-600 font-medium">Saved</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/study/${chapterId}`}
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Study Again
        </Link>
        <Link
          href={`/courses/${courseId}/chapters/${chapterId}`}
          className="w-full py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chapter
        </Link>
      </div>
    </div>
  );
}
