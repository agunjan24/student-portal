"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { GRADES, COURSE_LEVELS, COURSE_LEVEL_LABELS, SUBJECTS, COURSE_NAMES_BY_SUBJECT, COURSE_GRADE_MAP } from "@/lib/constants";

interface CourseFormProps {
  initialData?: {
    id: string;
    grade: number;
    subject: string;
    level: string;
    courseName: string;
  };
}

export function CourseForm({ initialData }: CourseFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const [subject, setSubject] = useState(initialData?.subject ?? "Mathematics");
  const [grade, setGrade] = useState(initialData?.grade ?? 10);
  const [level, setLevel] = useState(initialData?.level ?? "regular");
  const [courseName, setCourseName] = useState(initialData?.courseName ?? "");
  const [loading, setLoading] = useState(false);

  const availableCourses = (COURSE_NAMES_BY_SUBJECT[subject] ?? []).filter(
    (name) => COURSE_GRADE_MAP[name]?.includes(grade)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `/api/courses/${initialData.id}`
        : "/api/courses";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, grade, level, courseName }),
      });

      if (!res.ok) throw new Error("Failed to save course");

      const course = await res.json();
      toast.success(isEditing ? "Course updated" : "Course created");
      router.push(`/courses/${course.id}`);
      router.refresh();
    } catch {
      toast.error("Failed to save course");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject *
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => {
            const newSubject = e.target.value;
            setSubject(newSubject);
            // Reset course name when subject changes
            const subjectCourses = COURSE_NAMES_BY_SUBJECT[newSubject] ?? [];
            if (!subjectCourses.some((name) => name === courseName && COURSE_GRADE_MAP[name]?.includes(grade))) {
              setCourseName("");
            }
          }}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
          Grade *
        </label>
        <select
          id="grade"
          value={grade}
          onChange={(e) => {
            const newGrade = Number(e.target.value);
            setGrade(newGrade);
            // Reset course name if not available for new grade
            if (!COURSE_GRADE_MAP[courseName]?.includes(newGrade)) {
              setCourseName("");
            }
          }}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {GRADES.map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
          Level *
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {COURSE_LEVELS.map((l) => (
            <option key={l} value={l}>
              {COURSE_LEVEL_LABELS[l]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
          Course *
        </label>
        <select
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a course</option>
          {availableCourses.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !courseName}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-2"
        >
          {loading && <LoadingSpinner className="w-4 h-4" />}
          {isEditing ? "Update Course" : "Create Course"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
