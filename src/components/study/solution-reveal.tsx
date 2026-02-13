"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MathRenderer } from "@/components/shared/math-renderer";

interface SolutionRevealProps {
  solutionText: string;
  isRevealed: boolean;
  onReveal: () => void;
}

export function SolutionReveal({ solutionText, isRevealed, onReveal }: SolutionRevealProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Reset collapsed state when navigating to a different problem
  useEffect(() => {
    setCollapsed(false);
  }, [solutionText]);

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

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="w-full mt-4 py-3 px-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        Show Solution
      </button>
    );
  }

  return (
    <div className="mt-4 bg-blue-50 rounded-lg border border-blue-200 p-5">
      <button
        onClick={() => setCollapsed(true)}
        className="text-sm font-medium text-blue-800 mb-3 flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <EyeOff className="w-4 h-4" />
        Solution
      </button>
      <div className="text-sm leading-relaxed text-blue-900">
        <MathRenderer text={solutionText} />
      </div>
    </div>
  );
}
