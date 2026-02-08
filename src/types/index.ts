export type Difficulty = "easy" | "medium" | "hard";
export type MaterialStatus = "pending" | "processing" | "completed" | "failed";
export type SessionStatus = "active" | "completed";

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
}
