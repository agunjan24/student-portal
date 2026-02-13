import { anthropic } from "./client";
import { GENERATE_PROBLEMS_PROMPT, EXTRACT_EXACT_PROBLEMS_PROMPT } from "./prompts";
import { stripCodeFences, parseTruncatedJsonArray } from "./utils";
import type { GeneratedProblem, Difficulty } from "@/types";

export interface CourseContext {
  grade: number;
  level: string;
  courseName: string;
  chapterTitle: string;
  subject?: string;
  standardIds?: string[];
}

export async function generateProblems(
  topic: string,
  difficulty: Difficulty,
  count: number,
  materialContext: string,
  courseContext?: CourseContext
): Promise<GeneratedProblem[]> {
  let prompt = GENERATE_PROBLEMS_PROMPT;

  if (courseContext) {
    const levelDesc =
      courseContext.level === "AP"
        ? "AP-level (college-level rigor, exam-style problems)"
        : courseContext.level === "honors"
        ? "Honors-level (proofs, extensions, deeper reasoning)"
        : "Regular-level (scaffolded, concept-building)";

    const subject = courseContext.subject || "math";
    prompt = `You are a ${subject} tutor creating practice problems for a Grade ${courseContext.grade} student in ${levelDesc} ${courseContext.courseName}, Chapter: "${courseContext.chapterTitle}".

${courseContext.standardIds?.length ? `Aligned to MA Curriculum Framework standards: ${courseContext.standardIds.join(", ")}` : ""}

Given the topic and study material context below, generate practice problems with step-by-step solutions.

Requirements:
- Each problem should test understanding of the topic
- Include step-by-step solutions using LaTeX notation
- Use $...$ for inline math and $$...$$ for display/block math
- Problems should be at the requested difficulty level:
  - Easy: Direct application of a single concept
  - Medium: Requires combining 2+ concepts or multi-step reasoning
  - Hard: Complex problems requiring deep understanding, word problems, or proofs
- Make problems similar in style to those in the study materials, but NOT identical
- Vary the types of problems (computation, word problems, conceptual)
${courseContext.standardIds?.length ? "- Tag each problem with the most relevant standard ID from the list above" : ""}

Return a JSON array of objects, each with:
- "questionText": The problem statement (with LaTeX)
- "solutionText": Step-by-step solution (with LaTeX)
- "difficulty": The difficulty level
- "topic": The specific sub-topic being tested
${courseContext.standardIds?.length ? '- "standardId": The most relevant standard ID (e.g., "G-SRT.6")' : ""}

Return ONLY valid JSON array, no markdown code fences.`;
  }

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16384,
    messages: [
      {
        role: "user",
        content: `${prompt}

Topic: ${topic}
Difficulty: ${difficulty}
Number of problems: ${count}

Study material context:
${materialContext || "No study materials provided. Generate standard practice problems for this topic."}`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from AI");
  }

  if (message.stop_reason === "max_tokens") {
    throw new Error("AI response was truncated — try generating fewer problems at a time.");
  }

  const problems = JSON.parse(stripCodeFences(textBlock.text)) as GeneratedProblem[];
  return problems.map((p) => ({
    ...p,
    difficulty,
  }));
}

export async function extractExactProblems(
  topic: string,
  materialContext: string,
  courseContext?: CourseContext
): Promise<GeneratedProblem[]> {
  if (!materialContext) {
    throw new Error("Study materials are required for extracting problems.");
  }

  let prompt = EXTRACT_EXACT_PROBLEMS_PROMPT;

  if (courseContext) {
    const subject = courseContext.subject || "math";
    const levelDesc =
      courseContext.level === "AP"
        ? "AP-level (college-level rigor, exam-style problems)"
        : courseContext.level === "honors"
        ? "Honors-level (proofs, extensions, deeper reasoning)"
        : "Regular-level (scaffolded, concept-building)";

    prompt = `You are a ${subject} tutor extracting practice problems from study materials for a Grade ${courseContext.grade} student in ${levelDesc} ${courseContext.courseName}, Chapter: "${courseContext.chapterTitle}".

${courseContext.standardIds?.length ? `Aligned to MA Curriculum Framework standards: ${courseContext.standardIds.join(", ")}` : ""}

${EXTRACT_EXACT_PROBLEMS_PROMPT}
${courseContext.standardIds?.length ? '\nAlso include "standardId": The most relevant standard ID (e.g., "G-SRT.6") for each problem.' : ""}`;
  }

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16384,
    messages: [
      {
        role: "user",
        content: `${prompt}

Topic/Chapter: ${topic}

Study material content:
${materialContext}`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from AI");
  }

  if (message.stop_reason === "max_tokens") {
    // Try to recover complete problems from the truncated response
    const recovered = parseTruncatedJsonArray<GeneratedProblem>(textBlock.text);
    if (recovered && recovered.length > 0) {
      return recovered;
    }
    throw new Error("AI response was truncated and no complete problems could be recovered. Try with fewer materials selected.");
  }

  const problems = JSON.parse(stripCodeFences(textBlock.text)) as GeneratedProblem[];
  return problems;
}
