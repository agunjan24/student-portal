import Link from "next/link";
import { FileImage, FileText, ClipboardList, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { MATERIAL_STATUS_COLORS, MATERIAL_TYPE_LABELS, SOURCE_TYPE_LABELS } from "@/lib/constants";

interface MaterialCardProps {
  material: {
    id: string;
    filename: string | null;
    mimeType: string | null;
    fileSize: number | null;
    sourceType?: string;
    status: string;
    materialType: string;
    createdAt: string;
    chapter?: { id: string; title: string; course: { id: string; courseName: string } } | null;
  };
}

export function MaterialCard({ material }: MaterialCardProps) {
  const sourceType = material.sourceType ?? "file";
  const Icon =
    sourceType === "questions"
      ? ClipboardList
      : sourceType === "text"
      ? Type
      : material.mimeType?.startsWith("image/")
      ? FileImage
      : FileText;

  const displayName =
    material.filename ?? SOURCE_TYPE_LABELS[sourceType] ?? "Material";

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
            <p className="text-sm font-medium truncate">{displayName}</p>
            <span
              className={cn(
                "inline-flex px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                MATERIAL_STATUS_COLORS[material.status] || MATERIAL_STATUS_COLORS.pending
              )}
            >
              {material.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
              {MATERIAL_TYPE_LABELS[material.materialType] || material.materialType}
            </span>
            {sourceType !== "file" && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                {SOURCE_TYPE_LABELS[sourceType] || sourceType}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {material.fileSize != null
              ? `${(material.fileSize / 1024).toFixed(1)} KB`
              : SOURCE_TYPE_LABELS[sourceType] ?? ""}
            {material.chapter && (
              <span>
                {" "}&middot; {material.chapter.course.courseName} — {material.chapter.title}
              </span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
