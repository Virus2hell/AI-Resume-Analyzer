// server/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

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

/**
 * Existing resume vs JD analysis
 */
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

    let parsed: AnalysisResult;
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

/**
 * Cover letter generation
 */
app.post("/api/generate-cover-letter", async (req: Request, res: Response) => {
  try {
    const { resumeText, jobDescription, tone, length, language } = req.body as {
      resumeText: string;
      jobDescription: string;
      tone?: "formal" | "casual" | "concise";
      length?: "short" | "long";
      language?: string;
    };

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return res
        .status(400)
        .json({ error: "Missing resumeText or jobDescription" });
    }

    const toneText =
      tone === "formal"
        ? "Use a formal, professional tone."
        : tone === "casual"
        ? "Use a friendly, conversational tone while staying professional."
        : "Use a concise, to-the-point professional tone.";

    const lengthText =
      length === "short"
        ? "Aim for around 250 words."
        : "Aim for around 350 words.";

    const languageText = language?.trim()
      ? `Write the entire cover letter in ${language}.`
      : "Write the cover letter in English.";

    const prompt = `
You are an expert career coach and professional cover letter writer.

Given the user's resume and the target job description, write a polished, ATS-friendly cover letter.

Style requirements:
- ${toneText}
- ${lengthText}
- ${languageText}

Other requirements:
- Use the same person details (name, email, phone, LinkedIn, portfolio) as in the resume when they are available.
- If any detail is missing, leave a clearly marked placeholder like "[Your Name]" or "[Your Email]" instead of inventing data.
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

    return res.json({ coverLetter: content.trim() });
  } catch (error) {
    console.error("Groq cover letter error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate cover letter. Please try again." });
  }
});

/**
 * NEW: ATS-style resume-only analysis
 * Returns ATS score + detailed feedback and structure analysis
 */
app.post("/api/ats-analyze-resume", async (req: Request, res: Response) => {
  try {
    const { resumeText } = req.body as { resumeText: string };

    if (!resumeText?.trim()) {
      return res.status(400).json({ error: "Missing resumeText" });
    }

    const prompt = `
You are an industry-level HR and ATS expert who evaluates resumes for software / IT roles.

Analyze the following resume and produce a structured JSON report with these exact top-level keys:

- "ats_score": number from 0 to 100 (how well this resume is likely to pass an ATS screen)
- "ats_score_explanation": short string explanation of the score
- "suggestions": array of strings (concrete suggestions to improve content, keywords, clarity)
- "formatting_feedback": array of strings (spacing, font, bullet points, consistency, section ordering)
- "ats_friendly_format_tips": array of strings (tips for ATS-safe formatting and layout)
- "resume_structure_analysis": array of strings (what sections exist or are missing, how strong each section is)

Constraints:
- Respond ONLY with valid JSON, no markdown, no backticks, no extra commentary.
- Do not invent personal data (phone, email, links) that are not clearly present.

RESUME:
${resumeText.slice(0, 8000)}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 900,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res
        .status(500)
        .json({ error: "Empty response from Groq for ATS analysis" });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("JSON parse error from Groq:", err, content);
      return res
        .status(500)
        .json({ error: "Failed to parse ATS analysis. Please try again." });
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Groq ATS analysis error:", error);
    return res
      .status(500)
      .json({ error: "Failed to analyze resume. Please try again." });
  }
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Groq API server running at http://localhost:${PORT}`);
});
