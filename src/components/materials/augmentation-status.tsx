"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { MATERIAL_STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AugmentationStatusProps {
  materialId: string;
  status: string; // extraction status
  augmentationStatus: string | null;
  hasChapter: boolean;
}

export function AugmentationStatus({
  materialId,
  status,
  augmentationStatus,
  hasChapter,
}: AugmentationStatusProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAugment() {
    setLoading(true);
    try {
      const res = await fetch(`/api/materials/${materialId}/augment`, {
        method: "POST",
      });

      if (res.ok) {
        toast.success("Content augmented successfully");
      } else {
        const data = await res.json();
        toast.error(data.error || "Augmentation failed");
      }

      router.refresh();
    } catch {
      toast.error("Augmentation failed");
    } finally {
      setLoading(false);
    }
  }

  if (status !== "completed") return null;

  if (!hasChapter) {
    return (
      <p className="text-sm text-gray-500">
        Link this material to a chapter to enable AI augmentation.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {augmentationStatus && (
        <span
          className={cn(
            "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
            MATERIAL_STATUS_COLORS[augmentationStatus] || MATERIAL_STATUS_COLORS.pending
          )}
        >
          Augmentation: {augmentationStatus}
        </span>
      )}

      {(!augmentationStatus || augmentationStatus === "failed") && (
        <button
          onClick={handleAugment}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <LoadingSpinner className="w-3.5 h-3.5" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          {loading ? "Augmenting..." : "Augment Content"}
        </button>
      )}
    </div>
  );
}
