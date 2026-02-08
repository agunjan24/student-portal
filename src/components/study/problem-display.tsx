"use client";

import { MathRenderer } from "@/components/shared/math-renderer";
import { cn } from "@/lib/utils";
import { DIFFICULTY_COLORS, DIFFICULTY_LABELS } from "@/lib/constants";

interface ProblemDisplayProps {
  questionText: string;
  difficulty: string;
  topic: string;
  problemNumber: number;
  totalProblems: number;
}

export function ProblemDisplay({
  questionText,
  difficulty,
  topic,
  problemNumber,
  totalProblems,
}: ProblemDisplayProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Problem {problemNumber} of {totalProblems}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{topic}</span>
          <span
            className={cn(
              "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
              DIFFICULTY_COLORS[difficulty]
            )}
          >
            {DIFFICULTY_LABELS[difficulty] || difficulty}
          </span>
        </div>
      </div>
      <div className="text-base leading-relaxed">
        <MathRenderer text={questionText} />
      </div>
    </div>
  );
}
