import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sourceType, content, chapterId, materialType, name } = body as {
    sourceType: "text" | "questions";
    content: string;
    chapterId?: string;
    materialType?: string;
    name?: string;
  };

  if (!sourceType || !content) {
    return NextResponse.json(
      { error: "sourceType and content are required" },
      { status: 400 }
    );
  }

  if (sourceType !== "text" && sourceType !== "questions") {
    return NextResponse.json(
      { error: "sourceType must be 'text' or 'questions'" },
      { status: 400 }
    );
  }

  const material = await prisma.material.create({
    data: {
      sourceType,
      sourceContent: content,
      chapterId: chapterId || null,
      materialType: materialType || "other",
      filename: name || null,
    },
  });

  return NextResponse.json(material, { status: 201 });
}
