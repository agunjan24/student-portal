"use client";

import { useState } from "react";
import { Printer, Eye, EyeOff } from "lucide-react";
import { MathRenderer } from "@/components/shared/math-renderer";
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Problem {
  id: string;
  questionText: string;
  solutionText: string;
  difficulty: string;
  topic: string;
}

interface Batch {
  id: string;
  date: string;
  difficulty: string;
  problems: Problem[];
}

interface PrintProblemsProps {
  batches: Batch[];
  chapterTitle: string;
  courseName: string;
}

export function PrintProblems({ batches, chapterTitle, courseName }: PrintProblemsProps) {
  const [selectedBatches, setSelectedBatches] = useState<Set<string>>(
    new Set(batches.map((b) => b.id))
  );
  const [showSolutions, setShowSolutions] = useState(false);

  function toggleBatch(batchId: string) {
    setSelectedBatches((prev) => {
      const next = new Set(prev);
      if (next.has(batchId)) {
        next.delete(batchId);
      } else {
        next.add(batchId);
      }
      return next;
    });
  }

  function selectAll() {
    setSelectedBatches(new Set(batches.map((b) => b.id)));
  }

  function selectNone() {
    setSelectedBatches(new Set());
  }

  const visibleBatches = batches.filter((b) => selectedBatches.has(b.id));
  const totalProblems = visibleBatches.reduce((sum, b) => sum + b.problems.length, 0);

  return (
    <>
      {/* Controls - hidden when printing */}
      <div className="print:hidden space-y-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Select Batches</h2>
            <div className="flex gap-2 text-xs">
              <button onClick={selectAll} className="text-blue-600 hover:text-blue-800">
                Select all
              </button>
              <span className="text-gray-300">|</span>
              <button onClick={selectNone} className="text-blue-600 hover:text-blue-800">
                Select none
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {batches.map((batch) => (
              <label
                key={batch.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedBatches.has(batch.id)}
                  onChange={() => toggleBatch(batch.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{batch.date}</span>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded capitalize",
                    DIFFICULTY_COLORS[batch.difficulty] || "bg-gray-100 text-gray-700"
                  )}
                >
                  {DIFFICULTY_LABELS[batch.difficulty] || batch.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  {batch.problems.length} problem{batch.problems.length !== 1 ? "s" : ""}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSolutions(!showSolutions)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showSolutions ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showSolutions ? "Hide Answers" : "Include Answers"}
          </button>

          <button
            onClick={() => window.print()}
            disabled={totalProblems === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print {totalProblems} Problem{totalProblems !== 1 ? "s" : ""}
          </button>
        </div>
      </div>

      {/* Printable content */}
      {visibleBatches.length === 0 ? (
        <p className="text-sm text-gray-500 print:hidden">
          No batches selected. Select at least one batch to preview and print.
        </p>
      ) : (
        <div className="space-y-8 print:space-y-6">
          {/* Print header - only visible when printing */}
          <div className="hidden print:block mb-6">
            <h1 className="text-xl font-bold">{courseName} &mdash; {chapterTitle}</h1>
            <p className="text-sm text-gray-500">Practice Problems</p>
          </div>

          {visibleBatches.map((batch, batchIndex) => (
            <div
              key={batch.id}
              className={cn(
                "print:break-inside-avoid-page",
                batchIndex > 0 && "print:break-before-page"
              )}
            >
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">
                  {batch.date}
                </h2>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded capitalize",
                    DIFFICULTY_COLORS[batch.difficulty] || "bg-gray-100 text-gray-700"
                  )}
                >
                  {DIFFICULTY_LABELS[batch.difficulty] || batch.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  ({batch.problems.length} problem{batch.problems.length !== 1 ? "s" : ""})
                </span>
              </div>

              <ol className="space-y-6 print:space-y-4">
                {batch.problems.map((problem, problemIndex) => (
                  <li key={problem.id} className="print:break-inside-avoid">
                    <div className="flex gap-3">
                      <span className="text-sm font-bold text-gray-500 mt-0.5 flex-shrink-0">
                        {problemIndex + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-500 mb-1 print:hidden">
                          <span className="capitalize">{problem.topic}</span>
                        </div>
                        <div className="text-sm">
                          <MathRenderer text={problem.questionText} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          {/* Answer key - separate section at the end, on its own page when printed */}
          {showSolutions && (
            <div className="print:break-before-page">
              <div className="mb-4 pb-2 border-b-2 border-gray-300">
                <h2 className="text-lg font-bold text-gray-800">Answer Key</h2>
                <p className="text-xs text-gray-500 hidden print:block">
                  {courseName} &mdash; {chapterTitle}
                </p>
              </div>

              {visibleBatches.map((batch) => (
                <div key={`answers-${batch.id}`} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">
                      {batch.date}
                    </h3>
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded capitalize",
                        DIFFICULTY_COLORS[batch.difficulty] || "bg-gray-100 text-gray-700"
                      )}
                    >
                      {DIFFICULTY_LABELS[batch.difficulty] || batch.difficulty}
                    </span>
                  </div>

                  <ol className="space-y-4 print:space-y-3">
                    {batch.problems.map((problem, problemIndex) => (
                      <li key={problem.id} className="print:break-inside-avoid">
                        <div className="flex gap-3">
                          <span className="text-sm font-bold text-gray-500 mt-0.5 flex-shrink-0">
                            {problemIndex + 1}.
                          </span>
                          <div className="flex-1 min-w-0 pl-3 border-l-2 border-blue-200 print:border-gray-300">
                            <div className="text-sm text-gray-700">
                              <MathRenderer text={problem.solutionText} />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
