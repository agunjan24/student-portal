export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

export const SUBJECTS = ["Mathematics"] as const;

export const GRADES = [9, 10, 11, 12] as const;

export const COURSE_LEVELS = ["regular", "honors", "AP"] as const;

export const COURSE_LEVEL_LABELS: Record<string, string> = {
  regular: "Regular",
  honors: "Honors",
  AP: "AP",
};

export const MATERIAL_TYPES = [
  "classNotes",
  "quiz",
  "homework",
  "classwork",
  "practiceTest",
  "other",
] as const;

export const MATERIAL_TYPE_LABELS: Record<string, string> = {
  classNotes: "Class Notes",
  quiz: "Quiz",
  homework: "Homework",
  classwork: "Classwork",
  practiceTest: "Practice Test",
  other: "Other",
};

export const COURSE_NAMES = [
  "Algebra I",
  "Geometry",
  "Algebra II",
  "Precalculus",
] as const;

export const COURSE_GRADE_MAP: Record<string, number[]> = {
  "Algebra I": [9, 10],
  Geometry: [9, 10, 11],
  "Algebra II": [10, 11],
  Precalculus: [11, 12],
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export const MATERIAL_STATUS_COLORS: Record<string, string> = {
  pending: "bg-gray-100 text-gray-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
};
