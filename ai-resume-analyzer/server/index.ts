// server/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import Groq from "groq-sdk";

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("GROQ_API_KEY is not set in environment variables");
  process.exit(1);
}

const groq = new Groq({ apiKey });

interface AnalysisResult {
  overallScore: number;
  matchPercentage: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  recommendations: string[];
}

app.post("/api/analyze-resume", async (req: Request, res: Response) => {
  try {
    const { resumeText, jobDescription } = req.body as {
      resumeText: string;
      jobDescription: string;
    };

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return res
        .status(400)
        .json({ error: "Missing resumeText or jobDescription" });
    }

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
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res.status(500).json({ error: "Empty response from Groq" });
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res
        .status(500)
        .json({ error: "Groq response did not contain JSON" });
    }

    const parsed = JSON.parse(jsonMatch[0]) as AnalysisResult;
    return res.json(parsed);
  } catch (error) {
    console.error("Groq analysis error:", error);
    return res
      .status(500)
      .json({ error: "Failed to analyze resume. Please try again." });
  }
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Groq API server running at http://localhost:${PORT}`);
});
