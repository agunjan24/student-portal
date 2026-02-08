"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export function DeleteQuizButton({ quizId, quizTopic }: { quizId: string; quizTopic: string }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Quiz deleted");
      router.push("/quizzes");
      router.refresh();
    } catch {
      toast.error("Failed to delete quiz");
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
        title="Delete Quiz"
        message={`Are you sure you want to delete "${quizTopic}"? This will also delete all associated materials, problems, and study sessions.`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
