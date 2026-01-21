import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { styleDescription } = await request.json();

    if (!styleDescription) {
      return NextResponse.json(
        { error: "Style description is required" },
        { status: 400 }
      );
    }

    const rubric = await geminiModel.generateStyleRubric(styleDescription);

    return NextResponse.json({ success: true, rubric });
  } catch (error: any) {
    console.error("Rubric generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
