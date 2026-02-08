import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const body = await request.json();
  const { problemId, isCorrect, timeSpentSecs } = body;

  if (!problemId || isCorrect === undefined) {
    return NextResponse.json(
      { error: "problemId and isCorrect are required" },
      { status: 400 }
    );
  }

  // Create the response
  const response = await prisma.problemResponse.create({
    data: {
      problemId,
      sessionId,
      isCorrect,
      timeSpentSecs: timeSpentSecs ?? null,
    },
  });

  // Update session counts
  await prisma.studySession.update({
    where: { id: sessionId },
    data: {
      [isCorrect ? "correctCount" : "incorrectCount"]: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(response, { status: 201 });
}
