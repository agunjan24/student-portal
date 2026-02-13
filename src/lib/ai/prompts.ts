export const EXTRACT_CONTENT_PROMPT = `You are analyzing a study material (worksheet, textbook page, or notes). Extract all academic content from this image.

Return a JSON object with these fields:
- "extractedText": A complete text transcription of the document. Use $...$ for inline LaTeX math and $$...$$ for block/display LaTeX math.
- "topics": An array of topics covered (e.g., ["quadratic equations", "factoring"] or ["chemical bonding", "Lewis structures"])
- "documentType": One of "worksheet", "textbook", "notes", "test", "other"
- "problems": An array of objects with "question" (string) and optionally "answer" (string) for any practice problems found. Use LaTeX notation.
- "keyFormulas": An array of important formulas found, in LaTeX notation (wrapped in $...$)
- "confidence": A number 0-1 indicating how confident you are in the extraction

Be thorough — capture every problem, formula, and concept. Use proper LaTeX for all math and scientific expressions (chemical equations, formulas, etc.).

Return ONLY valid JSON, no markdown code fences.`;

export const EXTRACT_TEXT_CONTENT_PROMPT = `You are analyzing study material provided as text (copy-pasted notes, typed content, etc.). Extract and organize all academic content.

Return a JSON object with these fields:
- "extractedText": A cleaned-up version of the text with proper formatting. Use $...$ for inline LaTeX math and $$...$$ for block/display LaTeX math.
- "topics": An array of topics covered (e.g., ["quadratic equations", "factoring"] or ["chemical bonding", "Lewis structures"])
- "documentType": One of "worksheet", "textbook", "notes", "test", "other"
- "problems": An array of objects with "question" (string) and optionally "answer" (string) for any practice problems found. Use LaTeX notation.
- "keyFormulas": An array of important formulas found, in LaTeX notation (wrapped in $...$)
- "confidence": A number 0-1 indicating how confident you are in the extraction

Be thorough — capture every problem, formula, and concept. Use proper LaTeX for all math and scientific expressions (chemical equations, formulas, etc.).

Return ONLY valid JSON, no markdown code fences.`;

export const GENERATE_PROBLEMS_PROMPT = `You are a tutor creating practice problems for a student preparing for a quiz.

Given the topic and study material context below, generate practice problems with step-by-step solutions.

Requirements:
- Each problem should test understanding of the topic
- Include step-by-step solutions using LaTeX notation
- Use $...$ for inline math and $$...$$  for display/block math
- Problems should be at the requested difficulty level:
  - Easy: Direct application of a single concept
  - Medium: Requires combining 2+ concepts or multi-step reasoning
  - Hard: Complex problems requiring deep understanding, word problems, or proofs
- Make problems similar in style to those in the study materials, but NOT identical
- Vary the types of problems (computation, word problems, conceptual)

Return a JSON array of objects, each with:
- "questionText": The problem statement (with LaTeX)
- "solutionText": Step-by-step solution (with LaTeX)
- "difficulty": The difficulty level
- "topic": The specific sub-topic being tested

Return ONLY valid JSON array, no markdown code fences.`;

export const EXTRACT_EXACT_PROBLEMS_PROMPT = `You are a tutor extracting practice problems from a student's study materials (quizzes, homework, worksheets, practice tests).

Your job is to find and reproduce EVERY question/problem EXACTLY as written in the materials. Do NOT rephrase, simplify, or create new problems — copy them verbatim.

For each problem found:
- Reproduce the question text exactly as it appears
- Provide a clear, concise step-by-step solution (key steps only, avoid excessive explanation)
- Tag with an appropriate difficulty level (easy, medium, or hard)
- Tag with a specific topic

Use $...$ for inline math and $$...$$ for display/block math in both questions and solutions.

Difficulty guidelines:
- Easy: Direct application of a single concept, straightforward computation
- Medium: Requires combining 2+ concepts or multi-step reasoning
- Hard: Complex problems requiring deep understanding, word problems, or proofs

Return a JSON array of objects, each with:
- "questionText": The exact problem statement as written (with LaTeX)
- "solutionText": Step-by-step solution (with LaTeX)
- "difficulty": The assessed difficulty level
- "topic": The specific sub-topic being tested

If no problems are found in the materials, return an empty array [].

Return ONLY valid JSON array, no markdown code fences.`;

export const GENERATE_SOLUTION_PROMPT = `You are a tutor providing a detailed solution for a problem.

Given the problem below, provide a clear, step-by-step solution.

Requirements:
- Show every step clearly
- Use $...$ for inline math and $$...$$ for display/block math
- Explain the reasoning at each step
- Include the final answer clearly marked

Return the solution as a text string with LaTeX notation. Do NOT wrap in JSON.`;

export function generateProblemsPrompt(context: {
  grade: number;
  level: string;
  courseName: string;
  chapterTitle: string;
  subject?: string;
  standardIds?: string[];
}): string {
  const subject = context.subject || "math";
  const levelDesc =
    context.level === "AP"
      ? "AP-level (college-level rigor, exam-style problems)"
      : context.level === "honors"
      ? "Honors-level (proofs, extensions, deeper reasoning)"
      : "Regular-level (scaffolded, concept-building)";

  return `You are a ${subject} tutor creating practice problems for a Grade ${context.grade} student in ${levelDesc} ${context.courseName}, Chapter: "${context.chapterTitle}".

${context.standardIds?.length ? `Aligned to MA Curriculum Framework standards: ${context.standardIds.join(", ")}` : ""}

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
${context.standardIds?.length ? "- Tag each problem with the most relevant standard ID from the list above" : ""}

Return a JSON array of objects, each with:
- "questionText": The problem statement (with LaTeX)
- "solutionText": Step-by-step solution (with LaTeX)
- "difficulty": The difficulty level
- "topic": The specific sub-topic being tested
${context.standardIds?.length ? '- "standardId": The most relevant standard ID (e.g., "G-SRT.6")' : ""}

Return ONLY valid JSON array, no markdown code fences.`;
}

export function augmentContentPrompt(context: {
  grade: number;
  level: string;
  courseName: string;
  chapterTitle: string;
  subject?: string;
  standardIds?: string[];
  extractedText: string;
  extractedTopics: string[];
}): string {
  const levelDesc =
    context.level === "AP"
      ? "AP-level: include exam-style content, rigorous definitions, and challenging extensions"
      : context.level === "honors"
      ? "Honors-level: include proof-based content, theoretical extensions, and enrichment"
      : "Regular-level: include scaffolded explanations, worked examples, and concept-building exercises";

  return `You are a curriculum specialist augmenting a student's study material for Grade ${context.grade} ${context.courseName} (${levelDesc}), Chapter: "${context.chapterTitle}".

${context.standardIds?.length ? `MA Curriculum Framework standards for this chapter: ${context.standardIds.join(", ")}` : ""}

## Student's Extracted Material
Topics covered: ${context.extractedTopics.join(", ")}

Content excerpt:
${context.extractedText.slice(0, 4000)}

## Your Task
Analyze the student's material and generate supplementary content to fill gaps between what the material covers and what the curriculum standards expect. Return a JSON object with:

1. "supplementaryContent": A comprehensive text (with LaTeX math using $...$ and $$...$$) that covers:
   - Key concepts not adequately covered in the student's material
   - Additional worked examples for topics that need reinforcement
   - Common mistakes and how to avoid them
   - Tips and strategies specific to this topic

2. "gapAnalysis": An array of strings describing gaps between the material and curriculum standards. Each string should identify a specific concept or skill that is expected but missing or inadequately covered.

3. "vocabulary": An array of objects with "term" and "definition" for key vocabulary the student should know for this chapter.

4. "formulas": An array of objects with "formula" (LaTeX string) and "explanation" for key formulas relevant to this chapter.

5. "matchedStandards": An array of objects with "standardId", "confidence" (0-1), and "reason" for each MA standard that this material relates to.

Return ONLY valid JSON, no markdown code fences.`;
}
