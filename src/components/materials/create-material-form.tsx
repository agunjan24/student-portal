"use client";

import { useState } from "react";
import { Upload, FileText, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadForm } from "./upload-form";
import { PasteTextForm } from "./paste-text-form";
import { TypeQuestionsForm } from "./type-questions-form";

interface Chapter {
  id: string;
  title: string;
  chapterNumber: number;
  courseName: string;
}

interface CreateMaterialFormProps {
  chapters: Chapter[];
  defaultChapterId?: string;
}

const TABS = [
  { id: "upload", label: "Upload File", icon: Upload },
  { id: "text", label: "Paste Text", icon: FileText },
  { id: "questions", label: "Type Questions", icon: ClipboardList },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function CreateMaterialForm({ chapters, defaultChapterId }: CreateMaterialFormProps) {
  const [activeTab, setActiveTab] = useState<TabId>("upload");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "upload" && (
        <UploadForm chapters={chapters} defaultChapterId={defaultChapterId} />
      )}
      {activeTab === "text" && (
        <PasteTextForm chapters={chapters} defaultChapterId={defaultChapterId} />
      )}
      {activeTab === "questions" && (
        <TypeQuestionsForm chapters={chapters} defaultChapterId={defaultChapterId} />
      )}
    </div>
  );
}
