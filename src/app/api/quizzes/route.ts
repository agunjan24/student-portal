import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { quizDate: "asc" },
    include: {
      _count: {
        select: {
          materials: true,
          problems: true,
          studySessions: true,
        },
      },
    },
  });
  return NextResponse.json(quizzes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { topic, description, quizDate } = body;

  if (!topic || !quizDate) {
    return NextResponse.json(
      { error: "Topic and quiz date are required" },
      { status: 400 }
    );
  }

  const quiz = await prisma.quiz.create({
    data: {
      topic,
      description: description || null,
      quizDate: new Date(quizDate),
    },
  });

  return NextResponse.json(quiz, { status: 201 });
}
