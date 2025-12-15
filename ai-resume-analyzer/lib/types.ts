export interface AnalysisResult {
  atsScore: number;
  overview: string;
  hardSkillsMatch: SkillMatch;
  softSkillsMatch: SkillMatch;
  missingSections: string[];
  presentSections: string[];
  recommendations: string[];
}

export interface SkillMatch {
  present: number;
  total: number;
  percent: number;
  presentSkills: string[];
  missingSkills: string[];
}

export interface ReportData {
  atsScore: number;
  overview: string;
  hardSkillsMatch: SkillMatch;
  softSkillsMatch: SkillMatch;
  missingSections: string[];
  recommendations: string[];
}