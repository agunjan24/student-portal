import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateProblems } from "@/lib/ai/generate-problems";
import type { Difficulty } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { chapterId, difficulty, count } = body as {
    chapterId: string;
    difficulty: Difficulty;
    count: number;
  };

  if (!chapterId || !difficulty || !count) {
    return NextResponse.json(
      { error: "chapterId, difficulty, and count are required" },
      { status: 400 }
    );
  }

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      course: true,
      materials: {
        where: { status: "completed" },
        select: { extractedText: true },
      },
    },
  });

  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  // Combine all extracted material text as context
  const materialContext = chapter.materials
    .map((m) => m.extractedText)
    .filter(Boolean)
    .join("\n\n---\n\n");

  try {
    const generated = await generateProblems(
      chapter.title,
      difficulty,
      count,
      materialContext,
      {
        grade: chapter.course.grade,
        level: chapter.course.level,
        courseName: chapter.course.courseName,
        chapterTitle: chapter.title,
        standardIds: chapter.standardIds ? JSON.parse(chapter.standardIds) : undefined,
      }
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
            standardId: p.standardId || null,
            chapterId,
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
