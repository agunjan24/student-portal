"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { StandardsSelector } from "./standards-selector";
import { StandardsSuggestions } from "./standards-suggestions";
import type { StandardSuggestion } from "@/lib/curriculum/suggest-standards";

interface ChapterFormProps {
  courseId: string;
  courseName: string;
  initialData?: {
    id: string;
    title: string;
    chapterNumber: number;
    description: string | null;
    testDate: string | null;
    standardIds: string[] | null;
  };
}

export function ChapterForm({ courseId, courseName, initialData }: ChapterFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [chapterNumber, setChapterNumber] = useState(initialData?.chapterNumber ?? 1);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [testDate, setTestDate] = useState(
    initialData?.testDate
      ? new Date(initialData.testDate).toISOString().split("T")[0]
      : ""
  );
  const [standardIds, setStandardIds] = useState<string[]>(initialData?.standardIds ?? []);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<StandardSuggestion[] | null>(null);
  const [suggestLoading, setSuggestLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/courses/${courseId}/chapters/${initialData.id}`
        : `/api/courses/${courseId}/chapters`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          chapterNumber,
          description,
          testDate: testDate || null,
          standardIds: standardIds.length > 0 ? standardIds : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save chapter");

      toast.success(isEditing ? "Chapter updated" : "Chapter created");
      router.push(`/courses/${courseId}`);
      router.refresh();
    } catch {
      toast.error("Failed to save chapter");
    } finally {
      setLoading(false);
    }
  }

  async function handleSuggestStandards() {
    if (!title.trim()) {
      toast.error("Enter a chapter title first");
      return;
    }
    setSuggestLoading(true);
    try {
      const res = await fetch("/api/chapters/suggest-standards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterTitle: title, courseName }),
      });
      if (!res.ok) throw new Error("Failed to get suggestions");
      const data = await res.json();
      setSuggestions(data.suggestions);
    } catch {
      toast.error("Failed to suggest standards");
    } finally {
      setSuggestLoading(false);
    }
  }

  function handleAcceptSuggestions(ids: string[]) {
    const merged = Array.from(new Set([...standardIds, ...ids]));
    setStandardIds(merged);
    setSuggestions(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label htmlFor="chapterNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Chapter # *
          </label>
          <input
            id="chapterNumber"
            type="number"
            min={1}
            value={chapterNumber}
            onChange={(e) => setChapterNumber(Number(e.target.value))}
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Right Triangles and Trigonometry"
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this chapter cover?"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label htmlFor="testDate" className="block text-sm font-medium text-gray-700 mb-1">
          Test Date
        </label>
        <input
          id="testDate"
          type="date"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">
            MA Standards Alignment
          </label>
          <button
            type="button"
            onClick={handleSuggestStandards}
            disabled={suggestLoading || !title.trim()}
            className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1"
          >
            {suggestLoading ? (
              <LoadingSpinner className="w-3 h-3" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            Suggest Standards
          </button>
        </div>
        {suggestions && (
          <div className="mb-2">
            <StandardsSuggestions
              suggestions={suggestions}
              alreadySelected={standardIds}
              onAccept={handleAcceptSuggestions}
              onDismiss={() => setSuggestions(null)}
            />
          </div>
        )}
        <StandardsSelector
          courseName={courseName}
          selected={standardIds}
          onChange={setStandardIds}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !title}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
        >
          {loading && <LoadingSpinner className="w-4 h-4" />}
          {isEditing ? "Update Chapter" : "Create Chapter"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
