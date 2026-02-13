import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const session = await prisma.studySession.findUnique({
    where: { id: sessionId },
    include: {
      chapter: {
        select: { id: true, title: true, courseId: true, course: { select: { id: true, courseName: true } } },
      },
      responses: {
        include: { problem: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(session);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const body = await request.json();
  const { status, name } = body;

  const session = await prisma.studySession.update({
    where: { id: sessionId },
    data: {
      ...(status && { status }),
      ...(status === "completed" && { completedAt: new Date() }),
      ...(name !== undefined && { name }),
    },
  });

  return NextResponse.json(session);
}
