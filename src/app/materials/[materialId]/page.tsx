import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ProcessingStatus } from "@/components/materials/processing-status";
import { ExtractedContent } from "@/components/materials/extracted-content";
import { DeleteMaterialButton } from "@/components/materials/delete-material-button";
import { AugmentationStatus } from "@/components/materials/augmentation-status";
import { AugmentedContent } from "@/components/materials/augmented-content";
import { OriginalContent } from "@/components/materials/original-content";
import { MATERIAL_TYPE_LABELS, SOURCE_TYPE_LABELS } from "@/lib/constants";
import { prisma } from "@/lib/db";

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const material = await prisma.material.findUnique({
    where: { id: materialId },
    include: {
      chapter: {
        select: {
          id: true,
          title: true,
          courseId: true,
          standardIds: true,
          course: { select: { id: true, courseName: true } },
        },
      },
    },
  });

  if (!material) notFound();

  const sourceType = material.sourceType ?? "file";
  const isFile = sourceType === "file";
  const isImage = isFile && material.mimeType?.startsWith("image/");
  const displayName = material.filename ?? SOURCE_TYPE_LABELS[sourceType] ?? "Material";

  let chapterStandards: string[] = [];
  try {
    if (material.chapter?.standardIds) chapterStandards = JSON.parse(material.chapter.standardIds);
  } catch { /* ignore */ }

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Materials
            </Link>
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              {material.fileSize != null && (
                <span>{(material.fileSize / 1024).toFixed(1)} KB</span>
              )}
              {!isFile && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">
                  {SOURCE_TYPE_LABELS[sourceType] || sourceType}
                </span>
              )}
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                {MATERIAL_TYPE_LABELS[material.materialType] || material.materialType}
              </span>
              {material.chapter && (
                <Link
                  href={`/courses/${material.chapter.courseId}/chapters/${material.chapter.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {material.chapter.course.courseName} &mdash; {material.chapter.title}
                </Link>
              )}
            </div>
          </div>
          <DeleteMaterialButton materialId={material.id} filename={displayName} />
        </div>

        {/* Processing status */}
        <div className="mb-4">
          <ProcessingStatus
            materialId={material.id}
            status={material.status}
            errorMessage={material.errorMessage}
          />
        </div>

        {/* Augmentation status */}
        <div className="mb-6">
          <AugmentationStatus
            materialId={material.id}
            status={material.status}
            augmentationStatus={material.augmentationStatus}
            hasChapter={!!material.chapter}
          />
        </div>

        {/* Content: side-by-side on desktop */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Original content */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Original</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <OriginalContent
                sourceType={sourceType}
                sourceContent={material.sourceContent}
                filepath={material.filepath}
                filename={material.filename}
                mimeType={material.mimeType}
              />
            </div>
          </div>

          {/* Extracted content */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Extracted Content</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {material.status === "completed" && material.extractedText ? (
                <ExtractedContent
                  extractedText={material.extractedText}
                  extractedTopics={material.extractedTopics}
                />
              ) : material.status === "processing" ? (
                <p className="text-sm text-gray-500 py-8 text-center">
                  Content is being extracted...
                </p>
              ) : material.status === "failed" ? (
                <p className="text-sm text-red-500 py-8 text-center">
                  Extraction failed. Use the retry button above.
                </p>
              ) : (
                <p className="text-sm text-gray-500 py-8 text-center">
                  Click &quot;Extract Content&quot; above to process this material.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Augmented content */}
        {material.augmentationStatus === "completed" && material.augmentedContent && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">AI-Augmented Content</h2>
            <div className="bg-white rounded-lg border border-purple-200 p-4">
              <AugmentedContent augmentedContent={material.augmentedContent} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
