// server/index.ts
import express, { Request, Response } from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import nodemailer from "nodemailer"
import htmlPdf from "html-pdf-node";

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
 * Detailed resume vs JD analysis
 */
app.post(
  "/api/detailed-resume-analysis",
  async (req: Request, res: Response) => {
    try {
      const { resumeText, jobDescription } = req.body as {
        resumeText: string;
        jobDescription?: string;
      };

      if (!resumeText?.trim()) {
        return res.status(400).json({ error: "Missing resumeText" });
      }

      const prompt = `
You are an advanced ATS and HR expert.

Analyze the following resume AGAINST THE ENTIRE job posting, including:
- Title and summary
- Skills / Requirements
- Key Responsibilities / Duties / What you will do
- Any tools, technologies, or methods mentioned anywhere in the JD

Your goals:
1) Extract all important skills and keywords from the job description, even if they are only mentioned in responsibilities, tools, or narrative sections.
2) Compare those skills with the resume and score match quality.
3) Provide detailed, constructive feedback on content, skills, sections, formatting, and writing style.
4) Give precise grammar and spelling feedback with corrections.

RESUME:
${resumeText.slice(0, 8000)}

${
  jobDescription?.trim()
    ? `JOB DESCRIPTION (entire posting, including responsibilities and skills):
${jobDescription.slice(0, 4000)}`
    : "NO JOB DESCRIPTION PROVIDED – assume a generic full‑stack / software role and still provide a detailed analysis."
}

Return ONLY valid JSON using this exact shape:

{
  "overview": {
    "matchScore": number,
    "summary": string,
    "highlights": string[],
    "improvements": string[]
  },
  "radar": {
    "content": number,
    "skills": number,
    "format": number,
    "sections": number,
    "style": number
  },
  "content": {
    "description": string,
    "measurableResultScore": number,
    "spellingGrammarScore": number,
    "measurableSuggestions": string[],
    "grammarIssues": [
      {
        "original": string,
        "corrected": string,
        "issueType": "spelling" | "grammar" | "punctuation" | "word_choice",
        "explanation": string
      }
    ]
  },
  "skills": {
    "description": string,
    "hardSkillsSummary": {
      "missingCount": number,
      "presentCount": number
    },
    "softSkillsSummary": {
      "missingCount": number,
      "presentCount": number
    },
    "hardSkills": [
      {
        "name": string,
        "source": "explicit_skill_section" | "responsibilities" | "tools_section" | "other_jd_text",
        "requiredLevel": number,
        "resumeLevel": number,
        "status": "missing" | "present"
      }
    ],
    "softSkills": [
      {
        "name": string,
        "source": "explicit_skill_section" | "responsibilities" | "summary" | "other_jd_text",
        "requiredLevel": number,
        "resumeLevel": number,
        "status": "missing" | "present"
      }
    ]
  },
  "format": {
    "description": string,
    "dateFormattingStatus": "PASS" | "WARN" | "FAIL",
    "resumeLengthScore": number,
    "bulletPointScore": number,
    "dateFormattingTip": string,
    "resumeLengthSummary": string,
    "resumeLengthProTip": string,
    "bulletPointSummary": string,
    "bulletPointSuggestions": string[]
  },
  "sections": {
    "description": string,
    "totalRequired": number,
    "presentCount": number,
    "items": [
      {
        "label": string,
        "present": boolean,
        "detail": string
      }
    ]
  },
  "style": {
    "description": string,
    "voiceScore": number,
    "buzzwordScore": number,
    "voiceSuggestions": string[],
    "buzzwordSuggestions": string[]
  }
}

Important:
- When extracting skills from the JD, look at ALL parts, especially "Key Responsibilities", "What you will do", "Day‑to‑day", and similar sections, not just the explicit "Skills" list.
- For each hard or soft skill, set "source" to where it mainly came from in the JD (e.g., responsibilities vs skills).
- For grammarIssues, ALWAYS include the original text from the resume, a corrected version, a short issueType, and a brief explanation.
- In "format", evaluate date formats, overall resume length, and use of bullet points. Populate all fields with concise, specific text and at least one bulletPointSuggestions item when improvement is needed.
- Respond ONLY with JSON, no markdown, no commentary, no backticks.
`.trim();

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.25,
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        return res
          .status(500)
          .json({ error: "Empty response from Groq for detailed analysis" });
      }

      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch (err) {
        console.error("JSON parse error from Groq:", err, content);
        return res
          .status(500)
          .json({ error: "Failed to parse detailed analysis JSON" });
      }

      return res.json(parsed);
    } catch (error) {
      console.error("Groq detailed analysis error:", error);
      return res
        .status(500)
        .json({ error: "Failed to run detailed resume analysis." });
    }
  }
);

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

// roadmap feature
interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  level: number;
  prerequisites: string[];
}

interface RoadmapPayload {
  roleTitle: string;
  companyName?: string;
  summary: string;
  roadmap: RoadmapNode[];
  projectIdeas: {
    title: string;
    description: string;
    techStack: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
  }[];
  youtubeResources: {
    title: string;
    url: string;
    description: string;
    skillsCovered: string[];
  }[];
}

/**
 * Job-description → roadmap, projects & resources
 */
app.post("/api/generate-roadmap", async (req: Request, res: Response) => {
  try {
    const { jobDescription } = req.body as { jobDescription: string };

    if (!jobDescription?.trim()) {
      return res.status(400).json({ error: "Missing jobDescription" });
    }

    const prompt = `
You are an expert technical mentor and hiring manager.

Given a complete job description, you must:
1) Infer the REAL required skills and tools for the role, reading ALL parts of the JD:
   - Title and summary
   - Responsibilities / What you will do / Day-to-day
   - Requirements / Qualifications
   - Nice to have / Good to have / About the role
2) Break the skills into a step-by-step LEARNING ROADMAP that can be shown as a flowchart.
3) For each major skill area, include its prerequisites (for example: "React" requires "HTML + CSS + core JavaScript").
4) Generate 5–10 concrete project ideas that fit the company domain and stack and would look strong on a resume.
5) Suggest high-quality YouTube channels or playlists (with direct URLs) that can realistically teach these skills.

IMPORTANT about the flowchart:
- The roadmap must be returned as an array called "roadmap".
- Each item is a node (box) in the flowchart.
- Each node has:
  - "id": short unique string identifier (e.g. "html", "js-basics", "react-core").
  - "title": short label that can fit in a small box.
  - "description": 1–2 line explanation of what to learn at this step.
  - "level": integer from 1 to 6 where 1 is the earliest step in the flowchart.
  - "prerequisites": array of "id" values of nodes that should be learned BEFORE this node. Use [] for first-level nodes.
- Use only 4–6 distinct levels so the UI can show horizontal rows.
- Cluster nodes by abstraction level. Example:
  - Level 1: Computer science / internet basics if required
  - Level 2: Core language fundamentals
  - Level 3: Frameworks & libraries
  - Level 4: Databases / infrastructure / DevOps
  - Level 5+: System design, testing, scaling, domain-specific knowledge.

Project ideas:
- Each project is an object in "projectIdeas".
- Shape:
  {
    "title": string,
    "description": string,
    "techStack": string[],
    "difficulty": "beginner" | "intermediate" | "advanced"
  }
- Make them specific to the role and company domain. For example, if the JD is for a fintech backend engineer, include payments, ledgers, risk dashboards, etc.

YouTube / learning resources:
- Provide 5–10 items as "youtubeResources".
- Shape:
  {
    "title": string,
    "url": string,
    "description": string,
    "skillsCovered": string[]
  }
- "url" MUST be a full, direct YouTube URL starting with "https://www.youtube.com/..." (no bit.ly or other shorteners).
- Prefer highly rated, free resources from channels like freeCodeCamp.org, Traversy Media, The Net Ninja, Hitesh Choudhary, CodeWithHarry, Web Dev Simplified, etc., matching the required stack.
- Example of a valid url: "https://www.youtube.com/watch?v=Zftx68K-1D4".

Output format (VERY IMPORTANT):
Return ONLY valid JSON using this exact top-level structure:

{
  "roleTitle": string,
  "companyName": string | null,
  "summary": string,
  "roadmap": RoadmapNode[],
  "projectIdeas": ProjectIdea[],
  "youtubeResources": YouTubeResource[]
}

where RoadmapNode, ProjectIdea and YouTubeResource have the exact fields described above.
Do not wrap with markdown. Do not include comments or extra keys.

JOB DESCRIPTION (full text):
${jobDescription.slice(0, 6000)}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return res
        .status(500)
        .json({ error: "Empty response from Groq for roadmap generation" });
    }

    let parsed: RoadmapPayload;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error("JSON parse error from Groq (roadmap):", err, content);
      return res
        .status(500)
        .json({ error: "Failed to parse roadmap JSON from model" });
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Groq roadmap generation error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate roadmap. Please try again." });
  }
});

/**
 * NEW: Email resume analysis report as PDF
 * Body: { email: string; html: string }
 */
app.post(
  "/api/send-resume-report",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, html } = req.body as { email: string; html: string };

      if (!email || !html) {
        return res.status(400).json({ error: "Missing email or html" });
      }

      // 1. Render HTML to PDF buffer
      const file = { content: html };
      const pdfBuffer: Buffer = await htmlPdf.generatePdf(file, {
        format: "A4",
      });

      // 2. Create SMTP transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false, // DEV ONLY, not for production
        },
      });

      // 3. Send email with attachment
      await transporter.sendMail({
        from: `"KeyWorded" <${process.env.SMTP_FROM || "no-reply@keyworded.in"}>`,
        to: email,
        subject: "Your KeyWorded resume analysis report",
        html: `<p>Hi,</p>
<p>Thanks for using <strong>KeyWorded</strong>. Your resume analysis report is attached as a PDF.</p>
<p>Happy job hunting!</p>`,
        attachments: [
          {
            filename: "resume-analysis-report.pdf",
            content: pdfBuffer,
          },
        ],
      });

      return res.json({ ok: true });
    } catch (err: any) {
      console.error("send-resume-report error:", err);
      return res
        .status(500)
        .json({ error: err.message || "Failed to send report email" });
    }
  }
);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Groq API server running at http://localhost:${PORT}`);
});
