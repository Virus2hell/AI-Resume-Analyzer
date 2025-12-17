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

Analyze the following resume against the job description.

Return ONLY valid JSON (no markdown, no extra text) in exactly this shape:

{
  "overallScore": number,      // 0-100
  "matchPercentage": number,   // 0-100
  "strengths": string[],
  "improvements": string[],
  "missingKeywords": string[],
  "recommendations": string[]
}

Resume:
${resumeText.slice(0, 4000)}

Job Description:
${jobDescription.slice(0, 4000)}
`.trim();

  const completion = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    temperature: 0.2,
    max_tokens: 800,
    // JSON mode – forces a single JSON object string in content
    response_format: { type: "json_object" }, // [web:205][web:218]
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

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse Groq JSON:", err, content);
    throw new Error("Groq response was not valid JSON");
  }

  const result = parsed as AnalysisResult;

  // Basic runtime sanity checks to avoid crashing UI if model misbehaves
  return {
    overallScore: Number(result.overallScore ?? 0),
    matchPercentage: Number(result.matchPercentage ?? 0),
    strengths: result.strengths ?? [],
    improvements: result.improvements ?? [],
    missingKeywords: result.missingKeywords ?? [],
    recommendations: result.recommendations ?? [],
  };
}
