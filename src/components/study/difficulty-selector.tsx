"use client";

import { cn } from "@/lib/utils";
import { DIFFICULTIES, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/constants";
import type { Difficulty } from "@/types";

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
}

export function DifficultySelector({ value, onChange }: DifficultySelectorProps) {
  return (
    <div className="flex gap-2">
      {DIFFICULTIES.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(d)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            value === d
              ? cn(DIFFICULTY_COLORS[d], "ring-2 ring-offset-1 ring-current")
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {DIFFICULTY_LABELS[d]}
        </button>
      ))}
    </div>
  );
}
