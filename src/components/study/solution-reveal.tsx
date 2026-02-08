"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MathRenderer } from "@/components/shared/math-renderer";

interface SolutionRevealProps {
  solutionText: string;
  isRevealed: boolean;
  onReveal: () => void;
}

export function SolutionReveal({ solutionText, isRevealed, onReveal }: SolutionRevealProps) {
  if (!isRevealed) {
    return (
      <button
        onClick={onReveal}
        className="w-full mt-4 py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Show Solution
      </button>
    );
  }

  return (
    <div className="mt-4 bg-blue-50 rounded-lg border border-blue-200 p-5">
      <h4 className="text-sm font-medium text-blue-800 mb-3 flex items-center gap-1.5">
        <EyeOff className="w-4 h-4" />
        Solution
      </h4>
      <div className="text-sm leading-relaxed text-blue-900">
        <MathRenderer text={solutionText} />
      </div>
    </div>
  );
}
