import { AnalysisResult } from "./types";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

async function getGroqAnalysis(
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const prompt = `Analyze this resume against the job description and provide a JSON response.

RESUME:
${resume.substring(0, 2000)}

JOB DESCRIPTION:
${jobDescription.substring(0, 2000)}

Respond with ONLY valid JSON (no markdown, no explanation):
{
  "atsScore": <number 0-100>,
  "overview": "<brief summary>",
  "hardSkillsMatch": {
    "present": <number>,
    "total": <number>,
    "percent": <number 0-100>,
    "presentSkills": ["skill1", "skill2"],
    "missingSkills": ["skill3", "skill4"]
  },
  "softSkillsMatch": {
    "present": <number>,
    "total": <number>,
    "percent": <number 0-100>,
    "presentSkills": ["skill1"],
    "missingSkills": ["skill2"]
  },
  "missingSections": ["section1", "section2"],
  "presentSections": ["section1"],
  "recommendations": ["recommendation1", "recommendation2"]
}`.trim();

  const completion = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    max_tokens: 1000,
    temperature: 0.2,
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

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    const result = JSON.parse(jsonMatch[0]) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Failed to parse Groq response:", content);
    throw new Error("Failed to parse analysis results");
  }
}

export async function analyzeResume(
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> {
  try {
    return await getGroqAnalysis(resume, jobDescription);
  } catch (error) {
    console.error("Analysis error:", error);
    throw new Error("Failed to analyze resume. Please try again.");
  }
}
