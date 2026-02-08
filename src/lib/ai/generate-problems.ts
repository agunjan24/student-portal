import { anthropic } from "./client";
import { GENERATE_PROBLEMS_PROMPT } from "./prompts";
import { stripCodeFences } from "./utils";
import type { GeneratedProblem, Difficulty } from "@/types";

export async function generateProblems(
  topic: string,
  difficulty: Difficulty,
  count: number,
  materialContext: string
): Promise<GeneratedProblem[]> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: `${GENERATE_PROBLEMS_PROMPT}

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

  const problems = JSON.parse(stripCodeFences(textBlock.text)) as GeneratedProblem[];
  return problems.map((p) => ({
    ...p,
    difficulty,
  }));
}
