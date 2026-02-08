"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface QuizFormProps {
  initialData?: {
    id: string;
    topic: string;
    description: string | null;
    quizDate: string;
  };
}

export function QuizForm({ initialData }: QuizFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [topic, setTopic] = useState(initialData?.topic ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [quizDate, setQuizDate] = useState(
    initialData?.quizDate
      ? new Date(initialData.quizDate).toISOString().split("T")[0]
      : ""
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/quizzes/${initialData.id}`
        : "/api/quizzes";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, description, quizDate }),
      });

      if (!res.ok) throw new Error("Failed to save quiz");

      const quiz = await res.json();
      toast.success(isEditing ? "Quiz updated" : "Quiz created");
      router.push(`/quizzes/${quiz.id}`);
      router.refresh();
    } catch {
      toast.error("Failed to save quiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
          Topic *
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Quadratic Equations"
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this quiz cover?"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label htmlFor="quizDate" className="block text-sm font-medium text-gray-700 mb-1">
          Quiz Date *
        </label>
        <input
          id="quizDate"
          type="date"
          value={quizDate}
          onChange={(e) => setQuizDate(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !topic || !quizDate}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
        >
          {loading && <LoadingSpinner className="w-4 h-4" />}
          {isEditing ? "Update Quiz" : "Create Quiz"}
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
