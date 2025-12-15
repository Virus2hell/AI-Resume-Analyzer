// AI Analyzer using Groq API - Smart analysis with 68+ skills

import { AnalysisResult } from "./types";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Comprehensive skill lists
const HARD_SKILLS = [
  // Frontend
  "React",
  "Angular",
  "Vue.js",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Next.js",
  "Redux",

  // Backend
  "Node.js",
  "Express",
  "Python",
  "Django",
  "FastAPI",
  "Java",
  "C#",
  ".NET",
  "Go",
  "Rust",
  "PHP",
  "Laravel",

  // Databases
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  "DynamoDB",
  "SQL",
  "NoSQL",

  // Cloud & DevOps
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Jenkins",
  "GitHub Actions",
  "EC2",
  "S3",
  "Lambda",
  "Serverless",

  // Tools & Version Control
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Postman",
  "Jira",
  "Linux",
  "Windows Server",

  // Other Tech
  "REST API",
  "GraphQL",
  "WebSocket",
  "Microservices",
  "AI",
  "Machine Learning",
  "TensorFlow",
  "PyTorch",
  "NLTK",
];

const SOFT_SKILLS = [
  "Communication",
  "Teamwork",
  "Leadership",
  "Problem Solving",
  "Time Management",
  "Attention to Detail",
  "Collaboration",
  "Adaptability",
  "Critical Thinking",
  "Decision Making",
  "Creativity",
  "Analytical Skills",
  "Organization",
  "Accountability",
  "Interpersonal Skills",
  "Mentoring",
  "Project Management",
  "Documentation",
];

const RESUME_SECTIONS = [
  "Contact Information",
  "Professional Summary",
  "Work Experience",
  "Education",
  "Skills",
  "Certifications",
  "Projects",
  "Languages",
];

export async function analyzeResume(
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> {
  try {
    // First, do local analysis with skill matching
    const localAnalysis = performLocalAnalysis(resume, jobDescription);

    // Optionally, use Groq for enhanced analysis (optional enhancement)
    // Uncomment below if you want AI-powered insights in addition to skill matching
    /*
    try {
      const groqInsights = await getGroqInsights(resume, jobDescription);
      // Merge insights with local analysis if needed
      return {
        ...localAnalysis,
        // You can enhance the overview with Groq insights here
      };
    } catch (groqError) {
      console.warn("Groq API call failed, using local analysis:", groqError);
      return localAnalysis;
    }
    */

    return localAnalysis;
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
  }
}

// Local analysis - works without API calls
function performLocalAnalysis(
  resume: string,
  jobDescription: string
): AnalysisResult {
  const resumeText = resume.toLowerCase();
  const jobText = jobDescription.toLowerCase();

  // Extract skills present in resume
  const presentHardSkills = HARD_SKILLS.filter((skill) =>
    resumeText.includes(skill.toLowerCase())
  );

  const presentSoftSkills = SOFT_SKILLS.filter((skill) =>
    resumeText.includes(skill.toLowerCase())
  );

  // Get required skills from job description
  const requiredHardSkills = HARD_SKILLS.filter((skill) =>
    jobText.includes(skill.toLowerCase())
  );

  const requiredSoftSkills = SOFT_SKILLS.filter((skill) =>
    jobText.includes(skill.toLowerCase())
  );

  // Calculate missing skills
  const missingHardSkills = requiredHardSkills.filter(
    (skill) => !presentHardSkills.includes(skill)
  );

  const missingSoftSkills = requiredSoftSkills.filter(
    (skill) => !presentSoftSkills.includes(skill)
  );

  // Check for resume sections
  const presentSections = RESUME_SECTIONS.filter((section) =>
    resumeText.includes(section.toLowerCase())
  );

  const missingSections = RESUME_SECTIONS.filter(
    (section) => !presentSections.includes(section)
  );

  // Calculate percentages
  const hardSkillsPercent =
    requiredHardSkills.length > 0
      ? Math.round(
          (presentHardSkills.filter((skill) =>
            requiredHardSkills.includes(skill)
          ).length /
            requiredHardSkills.length) *
            100
        )
      : 100;

  const softSkillsPercent =
    requiredSoftSkills.length > 0
      ? Math.round(
          (presentSoftSkills.filter((skill) =>
            requiredSoftSkills.includes(skill)
          ).length /
            requiredSoftSkills.length) *
            100
        )
      : 100;

  // Calculate ATS score
  const skillsScore = (hardSkillsPercent + softSkillsPercent) / 2;
  const sectionsScore = (presentSections.length / RESUME_SECTIONS.length) * 100;
  const atsScore = Math.round((skillsScore + sectionsScore) / 2);

  // Generate analysis text
  const overview = generateOverview(
    atsScore,
    hardSkillsPercent,
    softSkillsPercent,
    missingHardSkills,
    missingSections
  );

  const recommendations = generateRecommendations(
    missingHardSkills,
    missingSections,
    hardSkillsPercent,
    softSkillsPercent
  );

  return {
    atsScore,
    overview,
    hardSkillsMatch: {
      present: presentHardSkills.filter((skill) =>
        requiredHardSkills.includes(skill)
      ).length,
      total: requiredHardSkills.length || HARD_SKILLS.length,
      percent: hardSkillsPercent,
      presentSkills: presentHardSkills.filter((skill) =>
        requiredHardSkills.includes(skill)
      ),
      missingSkills: missingHardSkills,
    },
    softSkillsMatch: {
      present: presentSoftSkills.filter((skill) =>
        requiredSoftSkills.includes(skill)
      ).length,
      total: requiredSoftSkills.length || SOFT_SKILLS.length,
      percent: softSkillsPercent,
      presentSkills: presentSoftSkills.filter((skill) =>
        requiredSoftSkills.includes(skill)
      ),
      missingSkills: missingSoftSkills,
    },
    missingSections,
    presentSections,
    recommendations,
  };
}

// Optional: Get enhanced insights from Groq (you can enable this if needed)
async function getGroqInsights(
  resume: string,
  jobDescription: string
): Promise<string> {
  const message = await groq.messages.create({
    model: "mixtral-8x7b-32768", // Fast, free Groq model
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Briefly analyze this resume against the job description in 2-3 sentences.

Resume excerpt:
${resume.substring(0, 500)}

Job Description excerpt:
${jobDescription.substring(0, 500)}

Focus on key strengths and gaps.`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type === "text") {
    return content.text;
  }

  return "";
}

function generateOverview(
  atsScore: number,
  hardSkills: number,
  softSkills: number,
  missingHardSkills: string[],
  missingSections: string[]
): string {
  let scoreLevel = "Excellent";
  if (atsScore < 40) scoreLevel = "Needs Improvement";
  else if (atsScore < 60) scoreLevel = "Good";
  else if (atsScore < 80) scoreLevel = "Very Good";

  let overview = `Your resume has an ATS compatibility score of ${atsScore}/100 (${scoreLevel}). `;

  overview += `You have ${hardSkills}% match on required technical skills and ${softSkills}% on soft skills. `;

  if (missingHardSkills.length > 0) {
    overview += `Key missing skills: ${missingHardSkills.slice(0, 3).join(", ")}. `;
  }

  if (missingSections.length > 0) {
    overview += `Consider adding the following sections: ${missingSections
      .slice(0, 2)
      .join(", ")}.`;
  } else {
    overview += "Your resume covers all important sections.";
  }

  return overview;
}

function generateRecommendations(
  missingHardSkills: string[],
  missingSections: string[],
  hardSkillsPercent: number,
  softSkillsPercent: number
): string[] {
  const recommendations: string[] = [];

  // Skills recommendations
  if (hardSkillsPercent < 60) {
    recommendations.push(
      `Add more technical skills. Missing: ${missingHardSkills.slice(0, 3).join(", ")}`
    );
  }

  if (softSkillsPercent < 60) {
    recommendations.push(
      "Highlight soft skills like leadership, communication, and problem-solving"
    );
  }

  // Section recommendations
  if (missingSections.includes("Professional Summary")) {
    recommendations.push(
      "Add a professional summary at the top of your resume"
    );
  }

  if (missingSections.includes("Certifications")) {
    recommendations.push("Include any relevant certifications or courses");
  }

  if (missingSections.includes("Projects")) {
    recommendations.push("Add a projects section showcasing your best work");
  }

  // General recommendations
  if (hardSkillsPercent >= 70) {
    recommendations.push(
      "Your technical skills are strong - focus on quantifying your achievements"
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Your resume looks good! Focus on highlighting key achievements with metrics."
    );
  }

  return recommendations.slice(0, 5);
}