// src/lib/analyzeResume.ts
import { groq } from "./groqClient";

export interface AnalysisResult {
  overallScore: number;
  matchPercentage: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  recommendations: string[];
}

export async function analyzeWithGroq(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const prompt = `
You are an expert ATS and resume evaluator.

Analyze the following resume against the job description and return ONLY valid JSON (no markdown, no explanation).

Resume:
${resumeText.slice(0, 4000)}

Job Description:
${jobDescription.slice(0, 4000)}

Return strictly this JSON shape:

{
  "overallScore": <number 0-100>,
  "matchPercentage": <number 0-100>,
  "strengths": ["..."],
  "improvements": ["..."],
  "missingKeywords": ["..."],
  "recommendations": ["..."]
}
`.trim();

  const completion = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    temperature: 0.2,
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from Groq");
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Groq response did not contain JSON");
  }

  return JSON.parse(jsonMatch[0]) as AnalysisResult;
}
