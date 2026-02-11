"use client";

import { MathRenderer } from "@/components/shared/math-renderer";
import type { TypedQuestion } from "@/types";

interface OriginalContentProps {
  sourceType: string;
  sourceContent: string | null;
  filepath: string | null;
  filename: string | null;
  mimeType: string | null;
}

export function OriginalContent({
  sourceType,
  sourceContent,
  filepath,
  filename,
  mimeType,
}: OriginalContentProps) {
  // Text-based materials: render with MathRenderer
  if (sourceType === "text" && sourceContent) {
    return <MathRenderer text={sourceContent} />;
  }

  // Questions-based materials: render each question
  if (sourceType === "questions" && sourceContent) {
    let questions: TypedQuestion[] = [];
    try {
      questions = JSON.parse(sourceContent);
    } catch {
      return <p className="text-sm text-gray-500">Could not parse questions.</p>;
    }

    return (
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <p className="text-xs font-medium text-gray-500 mb-1">Question {i + 1}</p>
            <MathRenderer text={q.question} />
            {q.answer && (
              <div className="mt-2">
                <p className="text-xs font-medium text-green-600 mb-1">Answer</p>
                <MathRenderer text={q.answer} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // File-based materials: show image or PDF link
  const isImage = mimeType?.startsWith("image/");
  if (isImage && filepath) {
    return (
      <img
        src={filepath}
        alt={filename ?? "Material"}
        className="max-w-full h-auto rounded"
      />
    );
  }

  if (filepath) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-sm">PDF preview not available</p>
        <a
          href={filepath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-1 inline-block"
        >
          Open PDF
        </a>
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-500 py-8 text-center">
      No original content available.
    </p>
  );
}
