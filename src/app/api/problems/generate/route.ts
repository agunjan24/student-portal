import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateProblems } from "@/lib/ai/generate-problems";
import type { Difficulty } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { quizId, difficulty, count } = body as {
    quizId: string;
    difficulty: Difficulty;
    count: number;
  };

  if (!quizId || !difficulty || !count) {
    return NextResponse.json(
      { error: "quizId, difficulty, and count are required" },
      { status: 400 }
    );
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      materials: {
        where: { status: "completed" },
        select: { extractedText: true },
      },
    },
  });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  // Combine all extracted material text as context
  const materialContext = quiz.materials
    .map((m) => m.extractedText)
    .filter(Boolean)
    .join("\n\n---\n\n");

  try {
    const generated = await generateProblems(
      quiz.topic,
      difficulty,
      count,
      materialContext
    );

    // Save to database
    const problems = await Promise.all(
      generated.map((p) =>
        prisma.problem.create({
          data: {
            questionText: p.questionText,
            solutionText: p.solutionText,
            difficulty: p.difficulty,
            topic: p.topic,
            quizId,
          },
        })
      )
    );

    return NextResponse.json(problems, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Problem generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
