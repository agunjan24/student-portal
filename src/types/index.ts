export type Difficulty = "easy" | "medium" | "hard";
export type MaterialStatus = "pending" | "processing" | "completed" | "failed";
export type SessionStatus = "active" | "completed";
export type CourseLevel = "regular" | "honors" | "AP";
export type MaterialType = "classNotes" | "quiz" | "homework" | "classwork" | "practiceTest" | "other";
export type Grade = 9 | 10 | 11 | 12;
export type AugmentationStatus = "pending" | "processing" | "completed" | "failed";

export interface ExtractionResult {
  extractedText: string;
  topics: string[];
  documentType: string;
  problems: { question: string; answer?: string }[];
  keyFormulas: string[];
  confidence: number;
}

export interface GeneratedProblem {
  questionText: string;
  solutionText: string;
  difficulty: Difficulty;
  topic: string;
  standardId?: string;
}

export interface AugmentationResult {
  supplementaryContent: string;
  gapAnalysis: string[];
  vocabulary: { term: string; definition: string }[];
  formulas: { formula: string; explanation: string }[];
  matchedStandards: { standardId: string; confidence: number; reason: string }[];
}
