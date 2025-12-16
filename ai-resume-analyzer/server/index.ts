// server/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

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

    console.log("Received analyze request:", {
      resumeLength: resumeText.length,
      jdLength: jobDescription.length,
    });

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
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    console.log("Groq raw content:", content);

    if (!content) {
      return res.status(500).json({ error: "Empty response from Groq" });
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON match in Groq content");
      return res
        .status(500)
        .json({ error: "Groq response did not contain JSON" });
    }

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON.parse failed:", e);
      return res
        .status(500)
        .json({ error: "Failed to parse Groq response JSON" });
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Groq analysis error (outer catch):", error);
    return res
      .status(500)
      .json({ error: "Failed to analyze resume. Please try again." });
  }
});

app.post("/api/generate-cover-letter", async (req, res) => {
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
You are an expert career coach and professional cover letter writer.

Given the user's resume and the target job description, write a polished, ATS-friendly cover letter.

Requirements:
- Use the same person details (name, email, phone, LinkedIn, portfolio) as in the resume when they are available.
- If any detail is missing, leave a clearly marked placeholder like "[Your Name]" or "[Your Email]" instead of inventing data.
- Match the tone to a mid‑level software/IT professional unless the resume suggests otherwise.
- Keep it to 3–5 concise paragraphs.
- Return ONLY the final cover letter text, no markdown, no JSON, no explanations.

RESUME:
${resumeText.slice(0, 6000)}

JOB DESCRIPTION:
${jobDescription.slice(0, 4000)}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res
        .status(500)
        .json({ error: "Empty response from Groq for cover letter" });
    }

    // Just return raw text
    return res.json({ coverLetter: content.trim() });
  } catch (error) {
    console.error("Groq cover letter error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate cover letter. Please try again." });
  }
});


const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Groq API server running at http://localhost:${PORT}`);
});
