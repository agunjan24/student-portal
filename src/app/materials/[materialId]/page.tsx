import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { ProcessingStatus } from "@/components/materials/processing-status";
import { ExtractedContent } from "@/components/materials/extracted-content";
import { DeleteMaterialButton } from "@/components/materials/delete-material-button";
import { prisma } from "@/lib/db";

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const material = await prisma.material.findUnique({
    where: { id: materialId },
    include: { quiz: { select: { id: true, topic: true } } },
  });

  if (!material) notFound();

  const isImage = material.mimeType.startsWith("image/");

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
            <h1 className="text-2xl font-bold">{material.filename}</h1>
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
              <span>{(material.fileSize / 1024).toFixed(1)} KB</span>
              {material.quiz && (
                <Link
                  href={`/quizzes/${material.quiz.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {material.quiz.topic}
                </Link>
              )}
            </div>
          </div>
          <DeleteMaterialButton materialId={material.id} filename={material.filename} />
        </div>

        {/* Processing status */}
        <div className="mb-6">
          <ProcessingStatus
            materialId={material.id}
            status={material.status}
            errorMessage={material.errorMessage}
          />
        </div>

        {/* Content: side-by-side on desktop */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Original file */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Original</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              {isImage ? (
                <img
                  src={material.filepath}
                  alt={material.filename}
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">PDF preview not available</p>
                  <a
                    href={material.filepath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                  >
                    Open PDF
                  </a>
                </div>
              )}
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
      </main>
    </>
  );
}
