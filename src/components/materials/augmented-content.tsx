"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MathRenderer } from "@/components/shared/math-renderer";
import type { AugmentationResult } from "@/types";

interface AugmentedContentProps {
  augmentedContent: string; // JSON string
}

export function AugmentedContent({ augmentedContent }: AugmentedContentProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    supplementary: true,
    gaps: false,
    vocabulary: false,
    formulas: false,
    standards: false,
  });

  let result: AugmentationResult;
  try {
    result = JSON.parse(augmentedContent);
  } catch {
    return <p className="text-sm text-red-500">Failed to parse augmented content.</p>;
  }

  function toggleSection(key: string) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-4">
      {/* Supplementary content */}
      <Section
        title="Supplementary Content"
        expanded={expandedSections.supplementary}
        onToggle={() => toggleSection("supplementary")}
      >
        <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
          <MathRenderer text={result.supplementaryContent} />
        </div>
      </Section>

      {/* Gap analysis */}
      {result.gapAnalysis?.length > 0 && (
        <Section
          title={`Gap Analysis (${result.gapAnalysis.length})`}
          expanded={expandedSections.gaps}
          onToggle={() => toggleSection("gaps")}
        >
          <ul className="space-y-2">
            {result.gapAnalysis.map((gap, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 mt-0.5 flex-shrink-0">!</span>
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Vocabulary */}
      {result.vocabulary?.length > 0 && (
        <Section
          title={`Key Vocabulary (${result.vocabulary.length})`}
          expanded={expandedSections.vocabulary}
          onToggle={() => toggleSection("vocabulary")}
        >
          <div className="divide-y divide-gray-100">
            {result.vocabulary.map((item, i) => (
              <div key={i} className="py-2">
                <dt className="text-sm font-medium text-gray-900">{item.term}</dt>
                <dd className="text-sm text-gray-600 mt-0.5">{item.definition}</dd>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Formulas */}
      {result.formulas?.length > 0 && (
        <Section
          title={`Key Formulas (${result.formulas.length})`}
          expanded={expandedSections.formulas}
          onToggle={() => toggleSection("formulas")}
        >
          <div className="space-y-3">
            {result.formulas.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm mb-1">
                  <MathRenderer text={item.formula} />
                </div>
                <p className="text-xs text-gray-500">{item.explanation}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Matched standards */}
      {result.matchedStandards?.length > 0 && (
        <Section
          title={`Standards Alignment (${result.matchedStandards.length})`}
          expanded={expandedSections.standards}
          onToggle={() => toggleSection("standards")}
        >
          <div className="space-y-2">
            {result.matchedStandards.map((match, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 flex-shrink-0">
                  {match.standardId}
                </span>
                <div className="text-sm">
                  <span className="text-gray-600">{match.reason}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    ({Math.round(match.confidence * 100)}% confidence)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {title}
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {expanded && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}
