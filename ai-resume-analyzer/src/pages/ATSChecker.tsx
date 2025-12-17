// src/pages/ATSChecker.tsx
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Loader2, FileText, AlertCircle, Download } from "lucide-react";
import jsPDF from "jspdf";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url"; // important for Vite [web:159]

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

type AtsReport = {
  ats_score: number;
  ats_score_explanation: string;
  suggestions: string[];
  formatting_feedback: string[];
  ats_friendly_format_tips: string[];
  resume_structure_analysis: string[];
};

const ATSChecker = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AtsReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configure PDF.js worker once
  useEffect(() => {
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfWorker;
  }, []);

  const extractTextFromFile = async (file: File): Promise<string> => {
    // Plain text files are easy
    if (file.type.startsWith("text/")) {
      return await file.text();
    }

    // Basic PDF text extraction
    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      const arrayBuffer = await file.arrayBuffer();
      // TS types for getDocument's params sometimes complain about ArrayBuffer,
      // but runtime supports it. [web:160][web:166]
      const pdf = await (pdfjsLib as any).getDocument({
        data: arrayBuffer,
      }).promise;

      let fullText = "";
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const strings = content.items
          .map((item: any) => ("str" in item ? item.str : ""))
          .join(" ");
        fullText += strings + "\n\n";
      }
      return fullText.trim();
    }

    // Fallback for DOC/DOCX etc. (still need manual paste or a server parser)
    return `File name: ${file.name}, type: ${file.type}

(Text extraction for this format is not implemented yet. Please paste your resume text below.)`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setReport(null);

    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err) {
      console.error("Resume file read error:", err);
      setError(
        "Could not read resume file. Please try another file or paste text manually."
      );
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please upload a resume or paste its text before analyzing.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setReport(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ats-analyze-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      setReport({
        ats_score: data.ats_score ?? 0,
        ats_score_explanation: data.ats_score_explanation ?? "",
        suggestions: data.suggestions ?? [],
        formatting_feedback: data.formatting_feedback ?? [],
        ats_friendly_format_tips: data.ats_friendly_format_tips ?? [],
        resume_structure_analysis: data.resume_structure_analysis ?? [],
      });
    } catch (err) {
      console.error("ATS analysis error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the resume."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!report) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const addSectionTitle = (title: string) => {
      if (y > doc.internal.pageSize.getHeight() - margin - 40) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += 18;
    };

    const addParagraph = (text: string) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 14;
      });
      y += 6;
    };

    const addList = (items: string[]) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      items.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
        lines.forEach((line: string) => {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += 14;
        });
      });
      y += 8;
    };

    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("ATS Resume Analysis Report", margin, y);
    y += 26;

    // Score
    addSectionTitle("Overall ATS Score");
    addParagraph(
      `Score: ${report.ats_score}/100 - ${report.ats_score_explanation}`
    );

    // Suggestions
    if (report.suggestions?.length) {
      addSectionTitle("Suggestions to Improve");
      addList(report.suggestions);
    }

    // Formatting
    if (report.formatting_feedback?.length) {
      addSectionTitle("Formatting Feedback");
      addList(report.formatting_feedback);
    }

    // ATS-friendly tips
    if (report.ats_friendly_format_tips?.length) {
      addSectionTitle("ATS-Friendly Format Tips");
      addList(report.ats_friendly_format_tips);
    }

    // Structure analysis
    if (report.resume_structure_analysis?.length) {
      addSectionTitle("Resume Structure Analysis");
      addList(report.resume_structure_analysis);
    }

    doc.save("ats-resume-analysis.pdf");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              ATS Resume Score Checker
            </h1>
            <p className="mt-4 text-muted-foreground">
              Upload your resume and get an ATS-style evaluation with score,
              structure analysis, formatting feedback, and actionable
              suggestions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left – upload + controls */}
            <div className="space-y-6">
              <div className="card-base">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Upload Resume
                </h2>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary-hover"
                />
                {selectedFile && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  For the most accurate analysis, upload a clean, text-based
                  resume (no scanned images). If text is not extracted, paste it
                  below.
                </p>
                <textarea
                  className="mt-3 input-base min-h-[140px]"
                  placeholder="(Optional) Paste your resume text here or edit the extracted text..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !resumeText.trim()}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing with ATS Engine...
                  </>
                ) : (
                  "Run ATS Analysis"
                )}
              </button>
            </div>

            {/* Right – report */}
            <div className="space-y-4">
              <div className="card-base h-full space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    ATS Analysis Report
                  </h2>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={!report}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    Download Full Report
                  </button>
                </div>

                {!report && !isAnalyzing && (
                  <p className="text-sm text-muted-foreground">
                    Upload your resume and click “Run ATS Analysis” to view a
                    detailed ATS-style evaluation here.
                  </p>
                )}

                {isAnalyzing && (
                  <p className="text-sm text-muted-foreground">
                    Evaluating your resume like an ATS and HR reviewer...
                  </p>
                )}

                {report && (
                  <div className="space-y-5">
                    {/* Score */}
                    <div
                      className={`rounded-xl border px-4 py-3 ${getScoreColor(
                        report.ats_score
                      )}`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        ATS Score
                      </p>
                      <p className="mt-1 text-2xl font-bold">
                        {report.ats_score}/100
                      </p>
                      <p className="mt-1 text-xs">
                        {report.ats_score_explanation}
                      </p>
                    </div>

                    {/* Suggestions */}
                    {report.suggestions?.length > 0 && (
                      <section>
                        <h3 className="mb-1 text-sm font-semibold text-foreground">
                          Suggestions to Improve
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {report.suggestions.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Formatting feedback */}
                    {report.formatting_feedback?.length > 0 && (
                      <section>
                        <h3 className="mb-1 text-sm font-semibold text-foreground">
                          Formatting Feedback
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {report.formatting_feedback.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* ATS-friendly tips */}
                    {report.ats_friendly_format_tips?.length > 0 && (
                      <section>
                        <h3 className="mb-1 text-sm font-semibold text-foreground">
                          ATS-Friendly Format Tips
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {report.ats_friendly_format_tips.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Structure analysis */}
                    {report.resume_structure_analysis?.length > 0 && (
                      <section>
                        <h3 className="mb-1 text-sm font-semibold text-foreground">
                          Resume Structure Analysis
                        </h3>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {report.resume_structure_analysis.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ATSChecker;
