"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function DeleteChapterButton({
  courseId,
  chapterId,
  chapterTitle,
}: {
  courseId: string;
  chapterId: string;
  chapterTitle: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Chapter deleted");
      router.push(`/courses/${courseId}`);
      router.refresh();
    } catch {
      toast.error("Failed to delete chapter");
    }
    setShowConfirm(false);
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete
      </button>
      <ConfirmDialog
        open={showConfirm}
        title="Delete Chapter"
        message={`Are you sure you want to delete "${chapterTitle}"? This will also delete all associated problems and study sessions.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
