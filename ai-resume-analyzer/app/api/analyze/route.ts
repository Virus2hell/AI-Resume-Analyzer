import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/aiAnalyzer-groq";

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json();

    const analysis = await analyzeResume(resume, jobDescription);

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
