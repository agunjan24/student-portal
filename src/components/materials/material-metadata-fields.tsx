"use client";

import { MATERIAL_TYPE_LABELS } from "@/lib/constants";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  courseName: string;
}

interface MaterialMetadataFieldsProps {
  chapters: Chapter[];
  chapterId: string;
  onChapterChange: (value: string) => void;
  materialType: string;
  onMaterialTypeChange: (value: string) => void;
}

export function MaterialMetadataFields({
  chapters,
  chapterId,
  onChapterChange,
  materialType,
  onMaterialTypeChange,
}: MaterialMetadataFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="chapterId" className="block text-sm font-medium text-gray-700 mb-1">
          Link to Chapter
        </label>
        <select
          id="chapterId"
          value={chapterId}
          onChange={(e) => onChapterChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">No chapter selected</option>
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.courseName} — Ch {ch.chapterNumber}: {ch.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="materialType" className="block text-sm font-medium text-gray-700 mb-1">
          Material Type
        </label>
        <select
          id="materialType"
          value={materialType}
          onChange={(e) => onMaterialTypeChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.entries(MATERIAL_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
