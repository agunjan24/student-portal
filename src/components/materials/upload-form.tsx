"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileDropzone } from "@/components/shared/file-dropzone";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { MATERIAL_TYPE_LABELS } from "@/lib/constants";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  courseName: string;
}

interface UploadFormProps {
  chapters: Chapter[];
  defaultChapterId?: string;
}

export function UploadForm({ chapters, defaultChapterId }: UploadFormProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [chapterId, setChapterId] = useState(defaultChapterId ?? "");
  const [materialType, setMaterialType] = useState("other");
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (chapterId) formData.append("chapterId", chapterId);
      formData.append("materialType", materialType);

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
        <label htmlFor="chapterId" className="block text-sm font-medium text-gray-700 mb-1">
          Link to Chapter
        </label>
        <select
          id="chapterId"
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">No chapter selected</option>
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.courseName} — Ch {ch.chapterNumber}: {ch.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="materialType" className="block text-sm font-medium text-gray-700 mb-1">
          Material Type
        </label>
        <select
          id="materialType"
          value={materialType}
          onChange={(e) => setMaterialType(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.entries(MATERIAL_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
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
