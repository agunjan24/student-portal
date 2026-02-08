"use client";

import { MathRenderer } from "@/components/shared/math-renderer";

interface ExtractedContentProps {
  extractedText: string;
  extractedTopics: string | null;
}

export function ExtractedContent({ extractedText, extractedTopics }: ExtractedContentProps) {
  let topics: string[] = [];
  try {
    if (extractedTopics) {
      topics = JSON.parse(extractedTopics);
    }
  } catch {
    // ignore parse errors
  }

  return (
    <div className="space-y-4">
      {topics.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Topics</h3>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((topic, i) => (
              <span
                key={i}
                className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Extracted Content</h3>
        <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
          <MathRenderer text={extractedText} />
        </div>
      </div>
    </div>
  );
}
