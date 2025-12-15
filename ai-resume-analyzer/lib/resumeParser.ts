// Resume Parser - Extracts structured data from resume text

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  summary: string;
  certifications: string[];
  projects: ProjectItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies?: string[];
}

/**
 * Parse resume text and extract structured information
 */
export function parseResume(resumeText: string): ResumeData {
  const text = resumeText;

  return {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    experience: extractExperience(text),
    education: extractEducation(text),
    skills: extractSkills(text),
    summary: extractSummary(text),
    certifications: extractCertifications(text),
    projects: extractProjects(text),
  };
}

/**
 * Extract name from resume
 */
function extractName(text: string): string {
  // Look for name patterns - usually at the beginning or in common formats
  const namePatterns = [
    /^([A-Z][a-z]+\s+[A-Z][a-z]+)/m, // First Last
    /Name\s*:\s*([A-Z][a-zA-Z\s]+)/i,
    /^([A-Z]{2,}[A-Z\s]{3,})/m, // All caps names
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return "Not Found";
}

/**
 * Extract email from resume
 */
function extractEmail(text: string): string {
  const emailPattern =
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const match = text.match(emailPattern);
  return match ? match[0] : "Not Found";
}

/**
 * Extract phone number from resume
 */
function extractPhone(text: string): string {
  const phonePatterns = [
    /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
    /(\+\d{1,3})[-.\s]?\d{1,14}/g,
  ];

  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return "Not Found";
}

/**
 * Extract work experience from resume
 */
function extractExperience(text: string): ExperienceItem[] {
  const experiences: ExperienceItem[] = [];

  // Look for experience section
  const experienceSection =
    text.match(/Experience[\s\S]*?(?=Education|Projects|Skills|$)/i)?.[0] ||
    text.match(/Work History[\s\S]*?(?=Education|Projects|Skills|$)/i)?.[0] ||
    "";

  if (!experienceSection) return experiences;

  // Split by common job entry patterns
  const jobEntries = experienceSection.split(
    /(?=^[A-Z][a-zA-Z\s]+\s*[-–•]|\d{4}|\w+\s*\|\s*\w+)/m
  );

  jobEntries.forEach((entry) => {
    if (entry.length < 10) return;

    const lines = entry.split("\n").filter((l) => l.trim());
    if (lines.length === 0) return;

    const experience: ExperienceItem = {
      title: "",
      company: "",
      duration: "",
      description: "",
    };

    // Try to extract job title and company
    const firstLine = lines[0];
    const titleCompanyMatch = firstLine.match(/(.+?)\s*(?:at|@|-|–|•)\s*(.+)/);

    if (titleCompanyMatch) {
      experience.title = titleCompanyMatch[1].trim();
      experience.company = titleCompanyMatch[2].trim();
    } else {
      experience.title = firstLine.trim();
    }

    // Extract duration
    const durationMatch = entry.match(/(\d{4})\s*[-–]\s*(\d{4}|present)/i);
    if (durationMatch) {
      experience.duration = `${durationMatch[1]} - ${durationMatch[2]}`;
    }

    // Get description (remaining text)
    experience.description = lines.slice(1).join(" ").substring(0, 200);

    if (experience.title) {
      experiences.push(experience);
    }
  });

  return experiences.slice(0, 5); // Return top 5 experiences
}

/**
 * Extract education from resume
 */
function extractEducation(text: string): EducationItem[] {
  const educations: EducationItem[] = [];

  // Look for education section
  const educationSection =
    text.match(/Education[\s\S]*?(?=Experience|Projects|Skills|$)/i)?.[0] ||
    text.match(/Academic[\s\S]*?(?=Experience|Projects|Skills|$)/i)?.[0] ||
    "";

  if (!educationSection) return educations;

  // Common degree patterns
  const degreePatterns = [
    /(B\.?S\.?|B\.?A\.?|M\.?S\.?|M\.?A\.?|Ph\.?D\.?|B\.?Tech|M\.?Tech|MBA)\s*(?:in|of)?\s*([A-Za-z\s]+)/gi,
    /(?:Bachelor|Master|Doctor|Associate|Diploma)\s*(?:of|in)?\s*([A-Za-z\s]+)/gi,
  ];

  degreePatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(educationSection)) !== null) {
      const degree = match[0];
      const field = match[1] || "General";

      // Find institution
      const lines = educationSection.split("\n");
      let institution = "Not Found";

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(degree)) {
          if (i + 1 < lines.length) {
            institution = lines[i + 1].trim();
          }
          break;
        }
      }

      // Extract year
      const yearMatch = educationSection.match(/\b(20\d{2})\b/);
      const year = yearMatch ? yearMatch[1] : "Not Found";

      educations.push({
        degree: degree,
        institution: institution,
        year: year,
        details: field,
      });
    }
  });

  return educations.slice(0, 5); // Return top 5
}

/**
 * Extract skills from resume
 */
function extractSkills(text: string): string[] {
  const skills = new Set<string>();

  // Look for skills section
  const skillsSection =
    text.match(/Skills[\s\S]*?(?=Experience|Education|Projects|$)/i)?.[0] ||
    text.match(/Technical Skills[\s\S]*?(?=Experience|Education|Projects|$)/i)
      ?.[0] ||
    text;

  // Common skill lists
  const hardSkills = [
    "React",
    "Angular",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "CI/CD",
    "REST API",
    "GraphQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Next.js",
    "Django",
    "FastAPI",
    "Laravel",
    ".NET",
    "Go",
    "Rust",
    "Redis",
    "Firebase",
    "GCP",
    "Postman",
    "Jira",
    "Linux",
    "Windows",
  ];

  const softSkills = [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Collaboration",
    "Adaptability",
    "Critical Thinking",
    "Project Management",
  ];

  // Extract skills from text
  [...hardSkills, ...softSkills].forEach((skill) => {
    if (text.toLowerCase().includes(skill.toLowerCase())) {
      skills.add(skill);
    }
  });

  return Array.from(skills);
}

/**
 * Extract summary/objective from resume
 */
function extractSummary(text: string): string {
  // Look for summary or objective section
  const summaryMatch =
    text.match(
      /(?:Professional\s+)?Summary[\s\S]*?(?=\n\n|\w+:|\nExperience)/i
    )?.[0] ||
    text.match(/Objective[\s\S]*?(?=\n\n|\w+:|\nExperience)/i)?.[0] ||
    "";

  if (!summaryMatch) {
    // If no dedicated summary section, get first paragraph
    const firstParagraph = text.split("\n\n")[0];
    return firstParagraph.substring(0, 200);
  }

  return summaryMatch.replace(/^(Summary|Objective)[\s:]*/, "").substring(0, 300);
}

/**
 * Extract certifications from resume
 */
function extractCertifications(text: string): string[] {
  const certifications: string[] = [];

  // Look for certifications section
  const certsSection =
    text.match(/Certifications?[\s\S]*?(?=Experience|Education|Skills|$)/i)
      ?.[0] || "";

  if (!certsSection) return certifications;

  // Common certification patterns
  const certPatterns = [
    /AWS\s+(?:Certified\s+)?([A-Za-z\s]+)/gi,
    /Google\s+(?:Cloud\s+)?Certified\s+([A-Za-z\s]+)/gi,
    /(?:Certified\s+)?([A-Z][a-zA-Z\s]+)\s+Certification/gi,
    /([A-Z]{2,})\s+\(Certified\)/gi,
  ];

  certPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(certsSection)) !== null) {
      certifications.push(match[0]);
    }
  });

  return [...new Set(certifications)].slice(0, 5); // Return unique, top 5
}

/**
 * Extract projects from resume
 */
function extractProjects(text: string): ProjectItem[] {
  const projects: ProjectItem[] = [];

  // Look for projects section
  const projectsSection =
    text.match(/Projects?[\s\S]*?(?=Experience|Education|Skills|$)/i)?.[0] ||
    "";

  if (!projectsSection) return projects;

  // Split by project entries
  const projectEntries = projectsSection.split(
    /\n(?=[A-Z][a-zA-Z\s]+:|\d+\.|•|-)/
  );

  projectEntries.forEach((entry) => {
    if (entry.length < 10) return;

    const lines = entry.split("\n").filter((l) => l.trim());
    if (lines.length === 0) return;

    const project: ProjectItem = {
      name: lines[0].replace(/[:\d•\-\.]/, "").trim(),
      description: lines.slice(1).join(" ").substring(0, 150),
      technologies: [],
    };

    // Extract technologies mentioned
    const techMatch = entry.match(
      /(?:Technology|Tech|Stack|Built with)[\s:]*(.*?)(?:\n|$)/i
    );
    if (techMatch) {
      project.technologies = techMatch[1]
        .split(/[,•]/)
        .map((t) => t.trim())
        .filter((t) => t);
    }

    if (project.name && project.name !== "Projects") {
      projects.push(project);
    }
  });

  return projects.slice(0, 5); // Return top 5
}

/**
 * Get a summary of parsed resume
 */
export function getResumeSummary(parsed: ResumeData): string {
  return `
Resume Summary:
- Name: ${parsed.name}
- Email: ${parsed.email}
- Phone: ${parsed.phone}
- Work Experience: ${parsed.experience.length} entries
- Education: ${parsed.education.length} entries
- Skills: ${parsed.skills.length} skills identified
- Certifications: ${parsed.certifications.length}
- Projects: ${parsed.projects.length}
  `;
}