import Link from "next/link";
import { FileImage, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { MATERIAL_STATUS_COLORS } from "@/lib/constants";

interface MaterialCardProps {
  material: {
    id: string;
    filename: string;
    mimeType: string;
    fileSize: number;
    status: string;
    createdAt: string;
    quiz?: { id: string; topic: string } | null;
  };
}

export function MaterialCard({ material }: MaterialCardProps) {
  const isImage = material.mimeType.startsWith("image/");
  const Icon = isImage ? FileImage : FileText;

  return (
    <Link
      href={`/materials/${material.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium truncate">{material.filename}</p>
            <span
              className={cn(
                "inline-flex px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                MATERIAL_STATUS_COLORS[material.status] || MATERIAL_STATUS_COLORS.pending
              )}
            >
              {material.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {(material.fileSize / 1024).toFixed(1)} KB
            {material.quiz && (
              <span> &middot; {material.quiz.topic}</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
