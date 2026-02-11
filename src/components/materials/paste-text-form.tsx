"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MathInput } from "@/components/shared/math-input";
import { MaterialMetadataFields } from "./material-metadata-fields";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  courseName: string;
}

interface PasteTextFormProps {
  chapters: Chapter[];
  defaultChapterId?: string;
}

export function PasteTextForm({ chapters, defaultChapterId }: PasteTextFormProps) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [chapterId, setChapterId] = useState(defaultChapterId ?? "");
  const [materialType, setMaterialType] = useState("other");
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/materials/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceType: "text",
          content: content.trim(),
          chapterId: chapterId || undefined,
          materialType,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save material");
      }

      const material = await res.json();
      toast.success("Text material saved");

      // Auto-trigger AI processing
      setProcessing(true);
      const processRes = await fetch(`/api/materials/${material.id}/process`, {
        method: "POST",
      });

      if (processRes.ok) {
        toast.success("Content extracted successfully");
      } else {
        toast.error("Extraction failed — you can retry from the material page");
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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <MathInput
        label="Paste or type your content *"
        value={content}
        onChange={setContent}
        placeholder="Paste your study notes, formulas, or any math content here...&#10;&#10;Use $...$ for inline math and $$...$$ for display math, or use the toolbar above."
        rows={12}
      />

      <MaterialMetadataFields
        chapters={chapters}
        chapterId={chapterId}
        onChapterChange={setChapterId}
        materialType={materialType}
        onMaterialTypeChange={setMaterialType}
      />

      <button
        type="submit"
        disabled={!content.trim() || isSubmitting}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
      >
        {isSubmitting && <LoadingSpinner className="w-4 h-4" />}
        {processing ? "Extracting content..." : submitting ? "Saving..." : "Save & Extract"}
      </button>
    </form>
  );
}
