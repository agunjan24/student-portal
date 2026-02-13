"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import type { StandardSuggestion } from "@/lib/curriculum/suggest-standards";
import { getStandardById } from "@/lib/curriculum/standards";

interface StandardsSuggestionsProps {
  suggestions: StandardSuggestion[];
  alreadySelected: string[];
  onAccept: (ids: string[]) => void;
  onDismiss: () => void;
}

function confidenceBadge(confidence: number) {
  if (confidence >= 0.7) {
    return <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">{Math.round(confidence * 100)}%</span>;
  }
  if (confidence >= 0.5) {
    return <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">{Math.round(confidence * 100)}%</span>;
  }
  return <span className="px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">{Math.round(confidence * 100)}%</span>;
}

export function StandardsSuggestions({
  suggestions,
  alreadySelected,
  onAccept,
  onDismiss,
}: StandardsSuggestionsProps) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const s of suggestions) {
      if (!alreadySelected.includes(s.standardId) && s.confidence >= 0.7) {
        initial.add(s.standardId);
      }
    }
    return initial;
  });

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleAccept() {
    onAccept(Array.from(checked));
  }

  const newSuggestions = suggestions.filter((s) => !alreadySelected.includes(s.standardId));
  const alreadySuggested = suggestions.filter((s) => alreadySelected.includes(s.standardId));

  return (
    <div className="border border-indigo-200 rounded-lg bg-indigo-50/50 p-3 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-indigo-900">
          AI Suggested Standards ({suggestions.length})
        </h4>
        <button
          type="button"
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        {newSuggestions.map((s) => {
          const standard = getStandardById(s.standardId);
          return (
            <label
              key={s.standardId}
              className="flex items-start gap-2 p-2 rounded hover:bg-indigo-100/50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked.has(s.standardId)}
                onChange={() => toggleCheck(s.standardId)}
                className="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-900">{s.standardId}</span>
                  {confidenceBadge(s.confidence)}
                </div>
                {standard && (
                  <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{standard.description}</p>
                )}
                <p className="text-xs text-indigo-600 mt-0.5">{s.reason}</p>
              </div>
            </label>
          );
        })}

        {alreadySuggested.map((s) => {
          const standard = getStandardById(s.standardId);
          return (
            <div
              key={s.standardId}
              className="flex items-start gap-2 p-2 rounded opacity-60"
            >
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 rounded border-gray-300 text-gray-400"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-900">{s.standardId}</span>
                  {confidenceBadge(s.confidence)}
                  <span className="text-xs text-gray-500">(already selected)</span>
                </div>
                {standard && (
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{standard.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {newSuggestions.length > 0 && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAccept}
            disabled={checked.size === 0}
            className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            Accept Selected ({checked.size})
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
