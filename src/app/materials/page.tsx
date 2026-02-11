import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { Header } from "@/components/layout/header";
import { MaterialCard } from "@/components/materials/material-card";
import { EmptyState } from "@/components/shared/empty-state";
import { prisma } from "@/lib/db";

export default async function MaterialsPage() {
  const materials = await prisma.material.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      chapter: {
        select: { id: true, title: true, course: { select: { id: true, courseName: true } } },
      },
    },
  });

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Materials</h1>
          <Link
            href="/materials/upload"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Material
          </Link>
        </div>

        {materials.length === 0 ? (
          <EmptyState
            icon={Upload}
            title="No materials yet"
            description="Add study materials (upload files, paste text, or type questions) to get started with AI extraction"
            actionLabel="Add Material"
            actionHref="/materials/upload"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={{
                  ...material,
                  createdAt: material.createdAt.toISOString(),
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
