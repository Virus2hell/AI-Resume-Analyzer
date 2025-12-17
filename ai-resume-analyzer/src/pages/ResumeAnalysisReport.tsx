// src/pages/ResumeAnalysisReport.tsx
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Download, ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";

type Overview = {
  matchScore: number;
  summary: string;
  highlights: string[];
  improvements: string[];
};

type Radar = {
  content: number;
  skills: number;
  format: number;
  sections: number;
  style: number;
};

type ContentBlock = {
  description: string;
  measurableResultScore: number;
  spellingGrammarScore: number;
  measurableSuggestions: string[];
  grammarIssues: {
    original: string;
    corrected: string;
    issueType: "spelling" | "grammar" | "punctuation" | "word_choice" | string;
    explanation: string;
  }[];
};

type SkillItem = {
  name: string;
  source:
    | "explicit_skill_section"
    | "responsibilities"
    | "tools_section"
    | "summary"
    | "other_jd_text"
    | string;
  requiredLevel: number;
  resumeLevel: number;
  status: "missing" | "present";
};

type SkillsBlock = {
  description: string;
  hardSkillsSummary: { missingCount: number; presentCount: number };
  softSkillsSummary: { missingCount: number; presentCount: number };
  hardSkills: SkillItem[];
  softSkills: SkillItem[];
};

type FormatBlock = {
  description: string;
  dateFormattingStatus: "PASS" | "WARN" | "FAIL" | string;
  resumeLengthScore: number;
  bulletPointScore: number;
  dateFormattingTip: string;
  resumeLengthSummary: string;
  resumeLengthProTip: string;
  bulletPointSummary: string;
  bulletPointSuggestions: string[];
};

type SectionItem = {
  label: string;
  present: boolean;
  detail: string;
};

type SectionsBlock = {
  description: string;
  totalRequired: number;
  presentCount: number;
  items: SectionItem[];
};

type StyleBlock = {
  description: string;
  voiceScore: number;
  buzzwordScore: number;
  voiceSuggestions: string[];
  buzzwordSuggestions: string[];
};

type DetailedReport = {
  overview: Overview;
  radar: Radar;
  content: ContentBlock;
  skills: SkillsBlock;
  format?: FormatBlock; // guarded in UI
  sections: SectionsBlock;
  style: StyleBlock;
};

const ResumeAnalysisReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const report = (location.state as { report?: DetailedReport })?.report;

  if (!report) {
    navigate("/resume-analysis");
    return null;
  }

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const addTitle = (text: string) => {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(text, margin, y);
      y += 26;
    };

    const addSectionTitle = (text: string) => {
      if (y > doc.internal.pageSize.getHeight() - margin - 40) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(text, margin, y);
      y += 18;
    };

    const addParagraph = (text: string) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 16;
      });
      y += 8;
    };

    const addList = (items: string[]) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      items.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
        lines.forEach((line: string) => {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += 16;
        });
      });
      y += 8;
    };

    addTitle("Resume Analysis Report");

    // Overview
    addSectionTitle(`Overview – Match Score: ${report.overview.matchScore}`);
    addParagraph(report.overview.summary);
    addSectionTitle("Highlights");
    addList(report.overview.highlights || []);
    addSectionTitle("Improvements");
    addList(report.overview.improvements || []);

    // Content
    addSectionTitle("Content");
    addParagraph(report.content.description);
    addParagraph(
      `Measurable Result Score: ${report.content.measurableResultScore}  |  Spelling & Grammar Score: ${report.content.spellingGrammarScore}`
    );
    addSectionTitle("Measurable Result Suggestions");
    addList(report.content.measurableSuggestions || []);
    if (report.content.grammarIssues?.length) {
      addSectionTitle("Spelling & Grammar Issues");
      const issues = report.content.grammarIssues.map((g) => {
        const corrected =
          g.corrected && g.corrected.trim().length > 0
            ? g.corrected
            : "No change suggested.";
        const explanation =
          g.explanation && g.explanation.trim().length > 0
            ? g.explanation
            : "Minor stylistic improvement; not a strict error.";
        return `${g.original}  →  ${corrected}  [${g.issueType || "info"}]  ${explanation}`;
      });
      addList(issues);
    }

    // Skills
    addSectionTitle("Skills Overview");
    addParagraph(report.skills.description);
    addParagraph(
      `Hard skills – missing: ${report.skills.hardSkillsSummary.missingCount}, present: ${report.skills.hardSkillsSummary.presentCount}`
    );
    addParagraph(
      `Soft skills – missing: ${report.skills.softSkillsSummary.missingCount}, present: ${report.skills.softSkillsSummary.presentCount}`
    );
    addSectionTitle("Hard Skills Detail");
    addList(
      report.skills.hardSkills.map(
        (s) =>
          `${s.name} (from ${s.source}): required ${s.requiredLevel}, resume ${s.resumeLevel}, status ${s.status}`
      )
    );
    addSectionTitle("Soft Skills Detail");
    addList(
      report.skills.softSkills.map(
        (s) =>
          `${s.name} (from ${s.source}): required ${s.requiredLevel}, resume ${s.resumeLevel}, status ${s.status}`
      )
    );

    // Format (PDF)
    if (report.format) {
      addSectionTitle("Format");
      addParagraph(report.format.description);
      addParagraph(
        `Date formatting: ${report.format.dateFormattingStatus}, Resume length score: ${report.format.resumeLengthScore}, Bullet point score: ${report.format.bulletPointScore}`
      );
      addParagraph(`Date formatting: ${report.format.dateFormattingTip}`);
      addParagraph(
        `Resume length: ${report.format.resumeLengthSummary} (${report.format.resumeLengthProTip})`
      );
      addSectionTitle("Bullet Point Suggestions");
      addList(report.format.bulletPointSuggestions || []);
    }

    // Sections
    addSectionTitle("Sections");
    addParagraph(report.sections.description);
    addParagraph(
      `Required sections present: ${report.sections.presentCount}/${report.sections.totalRequired}`
    );
    addList(
      report.sections.items.map(
        (s) =>
          `${s.label}: ${s.present ? "Present" : "Missing"} – ${s.detail}`
      )
    );

    // Style
    addSectionTitle("Style");
    addParagraph(report.style.description);
    addParagraph(
      `Voice score: ${report.style.voiceScore} | Buzzwords & Cliches score: ${report.style.buzzwordScore}`
    );
    addSectionTitle("Voice Suggestions");
    addList(report.style.voiceSuggestions || []);
    addSectionTitle("Buzzwords & Cliches");
    addList(report.style.buzzwordSuggestions || []);

    doc.save("resume-analysis-report.pdf");
  };

  const scoreBadgeClass = (score: number) =>
    score >= 80
      ? "text-emerald-600 bg-emerald-50"
      : score >= 60
      ? "text-amber-600 bg-amber-50"
      : "text-red-600 bg-red-50";

  return (
    <Layout>
      <div className="section-container py-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate("/resume-analysis")}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>
          </div>

          {/* Overview */}
            <section className="card-base">
            <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold">Overview</h2>
                <p className="text-base text-muted-foreground">
                    Match Score:{" "}
                    <span
                    className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${scoreBadgeClass(
                        report.overview.matchScore
                    )}`}
                    >
                    {report.overview.matchScore}
                    </span>
                </p>
                <p className="mt-3 text-base text-foreground">
                    {report.overview.summary}
                </p>
                </div>

                {/* Radar-like chips – show as percentages, no "/5" */}
                <div className="flex flex-col gap-2 text-sm">
                {([
                    ["Content", report.radar.content],
                    ["Skills", report.radar.skills],
                    ["Format", report.radar.format],
                    ["Sections", report.radar.sections],
                    ["Style", report.radar.style],
                ] as const).map(([label, value]) => (
                    <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-lg bg-muted px-3 py-2"
                    >
                    <span className="font-medium">{label}</span>
                    <span className="rounded-full bg-background px-2.5 py-0.5 text-xs font-semibold">
                        {value}%
                    </span>
                    </div>
                ))}
                </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-emerald-50 p-4 text-base">
                <h3 className="mb-2 font-semibold text-emerald-900">Highlights</h3>
                <ul className="space-y-1 text-emerald-900">
                    {report.overview.highlights.map((h, i) => (
                    <li key={i}>• {h}</li>
                    ))}
                </ul>
                </div>
                <div className="rounded-xl bg-amber-50 p-4 text-base">
                <h3 className="mb-2 font-semibold text-amber-900">Improvements</h3>
                <ul className="space-y-1 text-amber-900">
                    {report.overview.improvements.map((h, i) => (
                    <li key={i}>• {h}</li>
                    ))}
                </ul>
                </div>
            </div>
            </section>


          {/* Content */}
          <section className="card-base">
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Content</h2>
            </header>
            <p className="text-base text-muted-foreground">
              {report.content.description}
            </p>

            <div className="mt-6 rounded-xl bg-sky-50 p-4 text-base">
              <p className="mb-4 text-center font-medium text-sky-900">
                Almost there! Let&apos;s refine your content to make it more
                impactful and error-free.
              </p>
              <div className="mx-auto flex max-w-xs items-center justify-between rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-sky-900 shadow-sm">
                <div>
                  <p>Measurable Result</p>
                  <p className="mt-1 text-xl">
                    {report.content.measurableResultScore}
                  </p>
                </div>
                <div className="h-8 w-px bg-sky-100" />
                <div>
                  <p>Spelling & Grammar</p>
                  <p className="mt-1 text-xl">
                    {report.content.spellingGrammarScore}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-5 text-base">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Measurable Result
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {report.content.measurableSuggestions.map((s, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-muted px-3 py-2 text-base"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-foreground">
                  Spelling & Grammar
                </h3>
                {(!report.content.grammarIssues ||
                  report.content.grammarIssues.length === 0) && (
                  <p className="text-base text-muted-foreground">
                    No critical spelling or grammar issues were detected.
                  </p>
                )}

                {report.content.grammarIssues.length > 0 && (
                  <ul className="space-y-2 text-base">
                    {report.content.grammarIssues.map((g, i) => {
                      const hasCorrection =
                        g.corrected && g.corrected.trim().length > 0;
                      const hasExplanation =
                        g.explanation && g.explanation.trim().length > 0;

                      return (
                        <li
                          key={i}
                          className="rounded-lg bg-muted px-3 py-2"
                        >
                          <p className="text-foreground">{g.original}</p>
                          <p className="mt-1 text-emerald-800">
                            <span className="font-semibold">Corrected:</span>{" "}
                            {hasCorrection
                              ? g.corrected
                              : "No change suggested."}
                          </p>
                          <p className="mt-1 text-sm font-medium text-red-600">
                            [{g.issueType || "info"}]{" "}
                            {hasExplanation
                              ? g.explanation
                              : "Minor stylistic improvement; not a strict error."}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="card-base">
            <h2 className="mb-2 text-xl font-semibold">Skills</h2>
            <p className="text-base text-muted-foreground">
              {report.skills.description}
            </p>

            <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-base">
              <p className="mb-3 text-center font-medium text-emerald-900">
                Add these key skills for a stronger match!
              </p>
              <div className="mx-auto flex max-w-xs items-center justify-between rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-emerald-900 shadow-sm">
                <div>
                  <p>Hard Skills</p>
                  <p className="mt-1 text-xl">
                    {report.skills.hardSkillsSummary.missingCount}
                  </p>
                </div>
                <div className="h-8 w-px bg-emerald-100" />
                <div>
                  <p>Soft Skills</p>
                  <p className="mt-1 text-xl">
                    {report.skills.softSkillsSummary.missingCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-base">
              <h3 className="mb-2 font-semibold">Hard Skills</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-muted text-sm font-semibold">
                    <tr>
                      <th className="px-3 py-2">Skill</th>
                      <th className="px-3 py-2">Source in JD</th>
                      <th className="px-3 py-2">Job Description</th>
                      <th className="px-3 py-2">Your Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.skills.hardSkills.map((s, i) => (
                      <tr
                        key={i}
                        className={
                          s.status === "missing"
                            ? "bg-amber-50"
                            : "bg-background"
                        }
                      >
                        <td className="px-3 py-2 text-sm">
                          {s.name}{" "}
                          {s.status === "missing" && (
                            <span className="text-xs text-muted-foreground">
                              (required)
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-sm">{s.source}</td>
                        <td className="px-3 py-2 text-sm">
                          {s.requiredLevel}
                        </td>
                        <td className="px-3 py-2 text-sm">
                          {s.resumeLevel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-6 mb-2 font-semibold">Soft Skills</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-muted text-sm font-semibold">
                    <tr>
                      <th className="px-3 py-2">Skill</th>
                      <th className="px-3 py-2">Source in JD</th>
                      <th className="px-3 py-2">Job Description</th>
                      <th className="px-3 py-2">Your Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.skills.softSkills.map((s, i) => (
                      <tr
                        key={i}
                        className={
                          s.status === "missing"
                            ? "bg-amber-50"
                            : "bg-background"
                        }
                      >
                        <td className="px-3 py-2 text-sm">
                          {s.name}{" "}
                          {s.status === "missing" && (
                            <span className="text-xs text-muted-foreground">
                              (required)
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-sm">{s.source}</td>
                        <td className="px-3 py-2 text-sm">
                          {s.requiredLevel}
                        </td>
                        <td className="px-3 py-2 text-sm">
                          {s.resumeLevel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Format */}
          {report.format && (
            <section className="card-base">
              <h2 className="mb-2 text-xl font-semibold">Format</h2>
              <p className="text-base text-muted-foreground">
                {report.format.description}
              </p>

              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-base">
                <p className="mb-3 text-center font-medium text-amber-900">
                  You&apos;re so close! Refine your formatting to enhance
                  readability and improve ATS compatibility.
                </p>
                <div className="mx-auto flex max-w-xl items-center justify-between rounded-xl bg-white px-8 py-4 text-center text-sm font-semibold text-amber-900 shadow-sm">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Date Formatting
                    </p>
                    <p className="mt-1 text-lg text-emerald-600">
                      {report.format.dateFormattingStatus}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-amber-100" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Resume Length
                    </p>
                    <p className="mt-1 text-lg">
                      {report.format.resumeLengthScore}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-amber-100" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Bullet Points
                    </p>
                    <p className="mt-1 text-lg">
                      {report.format.bulletPointScore}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-base">
                <h3 className="mb-1 font-semibold text-emerald-900">
                  Date Formatting
                </h3>
                <p className="text-sm text-emerald-900">
                  {report.format.dateFormattingTip}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base">
                <h3 className="mb-1 font-semibold text-amber-900">
                  Resume Length
                </h3>
                <p className="text-sm text-amber-900">
                  {report.format.resumeLengthSummary}
                </p>
                <p className="mt-1 text-xs text-amber-800">
                  {report.format.resumeLengthProTip}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-base">
                <h3 className="mb-1 font-semibold text-amber-900">
                  Bullet Points
                </h3>
                <p className="text-sm text-amber-900">
                  {report.format.bulletPointSummary}
                </p>
                {report.format.bulletPointSuggestions?.length > 0 && (
                  <div className="mt-3 rounded-lg bg-white px-4 py-3 text-sm text-foreground">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      Suggestions
                    </p>
                    <ul className="list-disc space-y-1 pl-5">
                      {report.format.bulletPointSuggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Sections */}
          <section className="card-base">
            <h2 className="mb-2 text-xl font-semibold">Sections</h2>
            <p className="text-base text-muted-foreground">
              {report.sections.description}
            </p>

            <div className="mt-5 rounded-xl bg-rose-50 p-4 text-base">
              <p className="mb-3 text-center font-medium text-rose-900">
                Almost there! Just a couple of sections left to include.
              </p>
              <div className="mx-auto flex max-w-xs items-center justify-center rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-rose-900 shadow-sm">
                Sections: {report.sections.presentCount}/
                {report.sections.totalRequired}
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-base">
              {report.sections.items.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-muted px-3 py-2"
                >
                  <span className="font-medium">
                    {s.label}
                    {!s.present && (
                      <span className="ml-1 text-sm text-red-500">
                        (missing)
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {s.detail}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Style */}
          <section className="card-base">
            <h2 className="mb-2 text-xl font-semibold">Style</h2>
            <p className="text-base text-muted-foreground">
              {report.style.description}
            </p>

            <div className="mt-5 rounded-xl bg-violet-50 p-4 text-base">
              <p className="mb-3 text-center font-medium text-violet-900">
                You&apos;re nearly there! A few small adjustments to sharpen
                your style and make your resume stand out.
              </p>
              <div className="mx-auto flex max-w-xs items-center justify-between rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-violet-900 shadow-sm">
                <div>
                  <p>Voice</p>
                  <p className="mt-1 text-xl">{report.style.voiceScore}</p>
                </div>
                <div className="h-8 w-px bg-violet-100" />
                <div>
                  <p>Buzzwords &amp; Cliches</p>
                  <p className="mt-1 text-xl">
                    {report.style.buzzwordScore}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 text-base">
              <div>
                <h3 className="mb-2 font-semibold">Voice</h3>
                <ul className="space-y-2">
                  {report.style.voiceSuggestions.map((s, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-muted px-3 py-2 text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Buzzwords & Cliches</h3>
                <ul className="space-y-2">
                  {report.style.buzzwordSuggestions.map((s, i) => (
                    <li
                      key={i}
                      className="rounded-lg bg-muted px-3 py-2 text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAnalysisReport;
