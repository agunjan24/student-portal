import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateProblems, extractExactProblems } from "@/lib/ai/generate-problems";
import type { Difficulty } from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { chapterId, difficulty, count, materialIds, mode = "generate" } = body as {
    chapterId: string;
    difficulty: Difficulty;
    count: number;
    materialIds?: string[];
    mode?: "generate" | "extract";
  };

  if (!chapterId || !difficulty || (mode === "generate" && !count)) {
    return NextResponse.json(
      { error: "chapterId and difficulty are required (count required for generate mode)" },
      { status: 400 }
    );
  }

  const materialWhere: Record<string, unknown> = {
    chapterId,
    status: "completed",
  };
  if (materialIds) {
    materialWhere.id = { in: materialIds };
  }

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: {
      course: true,
      materials: {
        where: materialWhere,
        select: { extractedText: true },
      },
    },
  });

  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  // Combine selected material text as context
  const materialContext = chapter.materials
    .map((m) => m.extractedText)
    .filter(Boolean)
    .join("\n\n---\n\n");

  try {
    const courseContext = {
      grade: chapter.course.grade,
      level: chapter.course.level,
      courseName: chapter.course.courseName,
      chapterTitle: chapter.title,
      subject: chapter.course.subject,
      standardIds: chapter.standardIds ? JSON.parse(chapter.standardIds) : undefined,
    };

    const generated = mode === "extract"
      ? await extractExactProblems(chapter.title, materialContext, courseContext)
      : await generateProblems(chapter.title, difficulty, count, materialContext, courseContext);

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
