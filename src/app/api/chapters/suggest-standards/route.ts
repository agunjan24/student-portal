import { NextRequest, NextResponse } from "next/server";
import { suggestStandardsForTitle } from "@/lib/curriculum/suggest-standards";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { chapterTitle, courseName } = body as {
    chapterTitle: string;
    courseName: string;
  };

  if (!chapterTitle || !courseName) {
    return NextResponse.json(
      { error: "chapterTitle and courseName are required" },
      { status: 400 }
    );
  }

  try {
    const suggestions = await suggestStandardsForTitle(chapterTitle, courseName);
    return NextResponse.json({ suggestions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Standards suggestion failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
