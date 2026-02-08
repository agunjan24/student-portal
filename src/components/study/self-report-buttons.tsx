"use client";

import { Check, X } from "lucide-react";

interface SelfReportButtonsProps {
  onReport: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export function SelfReportButtons({ onReport, disabled }: SelfReportButtonsProps) {
  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={() => onReport(true)}
        disabled={disabled}
        className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Check className="w-5 h-5" />
        Got it right
      </button>
      <button
        onClick={() => onReport(false)}
        disabled={disabled}
        className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <X className="w-5 h-5" />
        Got it wrong
      </button>
    </div>
  );
}
