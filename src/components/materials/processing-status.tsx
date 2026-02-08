"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RefreshCw, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface ProcessingStatusProps {
  materialId: string;
  status: string;
  errorMessage?: string | null;
}

export function ProcessingStatus({ materialId, status, errorMessage }: ProcessingStatusProps) {
  const [retrying, setRetrying] = useState(false);
  const router = useRouter();

  async function handleRetry() {
    setRetrying(true);
    try {
      const res = await fetch(`/api/materials/${materialId}/process`, {
        method: "POST",
      });

      if (res.ok) {
        toast.success("Content extracted successfully");
        router.refresh();
      } else {
        toast.error("Extraction failed again");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setRetrying(false);
    }
  }

  if (status === "completed") {
    return (
      <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-3 py-2 text-sm">
        <CheckCircle className="w-4 h-4" />
        Content extracted successfully
      </div>
    );
  }

  if (status === "processing") {
    return (
      <div className="flex items-center gap-2 text-blue-700 bg-blue-50 rounded-lg px-3 py-2 text-sm">
        <LoadingSpinner className="w-4 h-4" />
        Extracting content...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-red-700 bg-red-50 rounded-lg px-3 py-2 text-sm">
          <AlertCircle className="w-4 h-4" />
          Extraction failed
          {errorMessage && <span className="text-red-500">: {errorMessage}</span>}
        </div>
        <button
          onClick={handleRetry}
          disabled={retrying}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
        >
          {retrying ? <LoadingSpinner className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
          Retry Extraction
        </button>
      </div>
    );
  }

  // pending
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg px-3 py-2 text-sm">
        <Clock className="w-4 h-4" />
        Pending extraction
      </div>
      <button
        onClick={handleRetry}
        disabled={retrying}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
      >
        {retrying ? <LoadingSpinner className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
        Extract Content
      </button>
    </div>
  );
}
