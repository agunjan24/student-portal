"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { MathInput } from "@/components/shared/math-input";
import { MaterialMetadataFields } from "./material-metadata-fields";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  courseName: string;
}

interface QuestionEntry {
  question: string;
  answer: string;
}

interface TypeQuestionsFormProps {
  chapters: Chapter[];
  defaultChapterId?: string;
}

export function TypeQuestionsForm({ chapters, defaultChapterId }: TypeQuestionsFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState<QuestionEntry[]>([
    { question: "", answer: "" },
  ]);
  const [chapterId, setChapterId] = useState(defaultChapterId ?? "");
  const [materialType, setMaterialType] = useState("other");
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);

  function updateQuestion(index: number, field: keyof QuestionEntry, value: string) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, { question: "", answer: "" }]);
  }

  function removeQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  const hasValidQuestions = questions.some((q) => q.question.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasValidQuestions) return;

    const validQuestions = questions
      .filter((q) => q.question.trim())
      .map((q) => ({
        question: q.question.trim(),
        answer: q.answer.trim() || undefined,
      }));

    setSubmitting(true);
    try {
      const res = await fetch("/api/materials/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType: "questions",
          content: JSON.stringify(validQuestions),
          chapterId: chapterId || undefined,
          materialType,
          name: name.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save material");
      }

      const material = await res.json();
      toast.success("Questions saved");

      // Auto-trigger processing
      setProcessing(true);
      const processRes = await fetch(`/api/materials/${material.id}/process`, {
        method: "POST",
      });

      if (processRes.ok) {
        toast.success("Content processed successfully");
      } else {
        toast.error("Processing failed — you can retry from the material page");
      }

      router.push(`/materials/${material.id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setSubmitting(false);
      setProcessing(false);
    }
  }

  const isSubmitting = submitting || processing;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Set Name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Homework 3 Practice Questions"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {questions.map((q, index) => (
        <div
          key={index}
          className="p-4 bg-white rounded-lg border border-gray-200 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Question {index + 1}
            </span>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </button>
            )}
          </div>
          <MathInput
            value={q.question}
            onChange={(v) => updateQuestion(index, "question", v)}
            placeholder="Type the question here... Use $...$ for math."
            rows={3}
          />
          <MathInput
            label="Answer (optional)"
            value={q.answer}
            onChange={(v) => updateQuestion(index, "answer", v)}
            placeholder="Type the answer here..."
            rows={3}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Another Question
      </button>

      <MaterialMetadataFields
        chapters={chapters}
        chapterId={chapterId}
        onChapterChange={setChapterId}
        materialType={materialType}
        onMaterialTypeChange={setMaterialType}
      />

      <button
        type="submit"
        disabled={!hasValidQuestions || isSubmitting}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
      >
        {isSubmitting && <LoadingSpinner className="w-4 h-4" />}
        {processing ? "Processing..." : submitting ? "Saving..." : "Save & Process"}
      </button>
    </form>
  );
}
