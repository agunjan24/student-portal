"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface Quiz {
  id: string;
  topic: string;
}

interface UploadFormProps {
  quizzes: Quiz[];
  defaultQuizId?: string;
}

export function UploadForm({ quizzes, defaultQuizId }: UploadFormProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [quizId, setQuizId] = useState(defaultQuizId ?? "");
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (quizId) formData.append("quizId", quizId);

      const uploadRes = await fetch("/api/materials", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.error || "Upload failed");
      }

      const material = await uploadRes.json();
      toast.success("File uploaded successfully");

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
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  }

  const isSubmitting = uploading || processing;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Study Material *
        </label>
        <FileDropzone
          onFileSelect={setFile}
          selectedFile={file}
          onClear={() => setFile(null)}
        />
      </div>

      <div>
        <label htmlFor="quizId" className="block text-sm font-medium text-gray-700 mb-1">
          Link to Quiz
        </label>
        <select
          id="quizId"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">No quiz selected</option>
          {quizzes.map((q) => (
            <option key={q.id} value={q.id}>
              {q.topic}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!file || isSubmitting}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
      >
        {isSubmitting && <LoadingSpinner className="w-4 h-4" />}
        {processing ? "Extracting content..." : uploading ? "Uploading..." : "Upload & Extract"}
      </button>
    </form>
  );
}
