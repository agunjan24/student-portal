import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      materials: { orderBy: { createdAt: "desc" } },
      problems: { orderBy: { createdAt: "desc" } },
      studySessions: { orderBy: { startedAt: "desc" } },
      _count: {
        select: {
          materials: true,
          problems: true,
          studySessions: true,
        },
      },
    },
  });

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json(quiz);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const body = await request.json();
  const { topic, description, quizDate } = body;

  const quiz = await prisma.quiz.update({
    where: { id: quizId },
    data: {
      ...(topic !== undefined && { topic }),
      ...(description !== undefined && { description: description || null }),
      ...(quizDate !== undefined && { quizDate: new Date(quizDate) }),
    },
  });

  return NextResponse.json(quiz);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  await prisma.quiz.delete({ where: { id: quizId } });
  return NextResponse.json({ success: true });
}
