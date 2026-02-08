import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const { problemId } = await params;
  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
  });

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  return NextResponse.json(problem);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ problemId: string }> }
) {
  const { problemId } = await params;
  await prisma.problem.delete({ where: { id: problemId } });
  return NextResponse.json({ success: true });
}
