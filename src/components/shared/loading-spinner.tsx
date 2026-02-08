import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={cn("w-5 h-5 animate-spin text-blue-600", className)} />;
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <LoadingSpinner className="w-8 h-8" />
    </div>
  );
}
