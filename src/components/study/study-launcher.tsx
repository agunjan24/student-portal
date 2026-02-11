"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Brain, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { DifficultySelector } from "./difficulty-selector";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { DIFFICULTY_LABELS, MATERIAL_TYPE_LABELS, SOURCE_TYPE_LABELS } from "@/lib/constants";
import type { Difficulty } from "@/types";

interface MaterialInfo {
  id: string;
  filename: string | null;
  materialType: string;
  sourceType: string;
}

interface StudyLauncherProps {
  chapterId: string;
  chapterTitle: string;
  courseId: string;
  problemCount: number;
  materials: MaterialInfo[];
  recentSessions: {
    id: string;
    difficulty: string;
    correctCount: number;
    incorrectCount: number;
    startedAt: string;
  }[];
}

export function StudyLauncher({
  chapterId,
  chapterTitle,
  courseId,
  problemCount,
  materials,
  recentSessions,
}: StudyLauncherProps) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [starting, setStarting] = useState(false);
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<Set<string>>(
    () => new Set(materials.map((m) => m.id))
  );
  const [materialsExpanded, setMaterialsExpanded] = useState(false);

  function toggleMaterial(id: string) {
    setSelectedMaterialIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleAll() {
    if (selectedMaterialIds.size === materials.length) {
      setSelectedMaterialIds(new Set());
    } else {
      setSelectedMaterialIds(new Set(materials.map((m) => m.id)));
    }
  }

  async function handleGenerateAndStart() {
    setGenerating(true);
    try {
      const genRes = await fetch("/api/problems/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterId,
          difficulty,
          count,
          materialIds: selectedMaterialIds.size < materials.length
            ? Array.from(selectedMaterialIds)
            : undefined,
        }),
      });

      if (!genRes.ok) {
        const data = await genRes.json();
        throw new Error(data.error || "Failed to generate problems");
      }

      const problems = await genRes.json();
      toast.success(`Generated ${problems.length} problems`);

      await startSession(problems.map((p: { id: string }) => p.id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate problems");
    } finally {
      setGenerating(false);
    }
  }

  async function handleStartWithExisting() {
    setStarting(true);
    try {
      const res = await fetch(`/api/courses/${courseId}/chapters/${chapterId}`);
      if (!res.ok) throw new Error("Failed to fetch chapter");
      const chapter = await res.json();

      const matchingProblems = chapter.problems
        .filter((p: { difficulty: string }) => p.difficulty === difficulty)
        .slice(0, count);

      if (matchingProblems.length === 0) {
        toast.error("No existing problems at this difficulty. Generate new ones.");
        setStarting(false);
        return;
      }

      await startSession(matchingProblems.map((p: { id: string }) => p.id));
    } catch {
      toast.error("Failed to start session");
    } finally {
      setStarting(false);
    }
  }

  async function startSession(problemIds: string[]) {
    const sessionRes = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId, difficulty, problemIds }),
    });

    if (!sessionRes.ok) throw new Error("Failed to create session");

    const session = await sessionRes.json();
    const params = new URLSearchParams({
      sessionId: session.id,
      problems: problemIds.join(","),
    });
    router.push(`/study/${chapterId}/session?${params}`);
  }

  const isLoading = generating || starting;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Session Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <DifficultySelector value={difficulty} onChange={setDifficulty} />
          </div>

          <div>
            <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Problems
            </label>
            <select
              id="count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[3, 5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>
                  {n} problems
                </option>
              ))}
            </select>
          </div>
        </div>

        {materials.length > 0 && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setMaterialsExpanded(!materialsExpanded)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Source Materials
              <span className="text-xs text-gray-500">
                ({selectedMaterialIds.size}/{materials.length} selected)
              </span>
              {materialsExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {materialsExpanded && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                <label className="flex items-center gap-2 text-xs text-gray-600 pb-2 border-b border-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMaterialIds.size === materials.length}
                    onChange={toggleAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">Select All</span>
                </label>
                {materials.map((m) => {
                  const displayName =
                    m.filename ??
                    SOURCE_TYPE_LABELS[m.sourceType] ??
                    "Material";
                  return (
                    <label
                      key={m.id}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterialIds.has(m.id)}
                        onChange={() => toggleMaterial(m.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="truncate">{displayName}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 flex-shrink-0">
                        {MATERIAL_TYPE_LABELS[m.materialType] || m.materialType}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleGenerateAndStart}
            disabled={isLoading || (materials.length > 0 && selectedMaterialIds.size === 0)}
            className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
          >
            {generating ? (
              <LoadingSpinner className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {generating ? "Generating..." : "Generate & Start"}
          </button>

          {problemCount > 0 && (
            <button
              onClick={handleStartWithExisting}
              disabled={isLoading}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
            >
              {starting ? (
                <LoadingSpinner className="w-4 h-4 text-gray-500" />
              ) : (
                <Brain className="w-4 h-4" />
              )}
              Practice Existing ({problemCount})
            </button>
          )}
        </div>

        {materials.length === 0 && (
          <p className="text-sm text-amber-600 mt-3">
            No study materials uploaded yet. Problems will be generated based on the topic only.
          </p>
        )}
      </div>

      {recentSessions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-3">Recent Sessions</h2>
          <div className="divide-y divide-gray-100">
            {recentSessions.map((session) => {
              const total = session.correctCount + session.incorrectCount;
              const accuracy = total > 0 ? Math.round((session.correctCount / total) * 100) : 0;
              return (
                <div key={session.id} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium capitalize">
                      {DIFFICULTY_LABELS[session.difficulty] || session.difficulty}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(session.startedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">{session.correctCount}</span>
                    <span className="text-gray-400">/{total}</span>
                    <span className="text-gray-500 ml-1">({accuracy}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
