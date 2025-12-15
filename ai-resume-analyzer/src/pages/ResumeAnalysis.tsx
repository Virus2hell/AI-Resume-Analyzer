// src/pages/ResumeAnalysis.tsx
import { useState } from "react";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import {
  Loader2,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface AnalysisResult {
  overallScore: number;
  matchPercentage: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  recommendations: string[];
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResumeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setError(null);
    setAnalysisResult(null);

    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err) {
      console.error("File extract error:", err);
      setError(
        "Could not read resume file. Please try another file or re-upload."
      );
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResumeText("");
    setAnalysisResult(null);
    setError(null);
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    // If you later add PDF/DOCX parsing, plug it here.
    if (file.type.startsWith("text/")) {
      return await file.text();
    }
    // Fallback so Groq still has something to analyze
    return `File name: ${file.name}, type: ${file.type}`;
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim()) {
      setError("Please upload a resume and enter a job description.");
      return;
    }
    if (!resumeText.trim()) {
      setError("Resume text could not be extracted.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze-resume`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysisResult(data as AnalysisResult);
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during analysis. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-accent";
    return "text-destructive";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-primary/10";
    if (score >= 60) return "bg-accent/10";
    return "bg-destructive/10";
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Resume Analysis
            </h1>
            <p className="mt-4 text-muted-foreground">
              Upload your resume and paste the job description to get
              Groq-powered insights
            </p>
          </div>

          {!analysisResult ? (
            <div className="space-y-8">
              {/* Resume Upload */}
              <div className="card-base">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  1. Upload Your Resume
                </h2>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemoveFile={handleRemoveFile}
                />
              </div>

              {/* Job Description */}
              <div className="card-base">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  2. Paste Job Description
                </h2>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="input-base min-h-[200px] resize-y"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={
                  isAnalyzing ||
                  !selectedFile ||
                  !jobDescription.trim() ||
                  !resumeText.trim()
                }
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze Resume
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Score Cards */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div
                  className={`card-base text-center ${getScoreBgColor(
                    analysisResult.overallScore
                  )}`}
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    Overall Score
                  </p>
                  <p
                    className={`mt-2 text-5xl font-bold ${getScoreColor(
                      analysisResult.overallScore
                    )}`}
                  >
                    {analysisResult.overallScore}
                  </p>
                  <p className="text-sm text-muted-foreground">out of 100</p>
                </div>

                <div
                  className={`card-base text-center ${getScoreBgColor(
                    analysisResult.matchPercentage
                  )}`}
                >
                  <p className="text-sm font-medium text-muted-foreground">
                    Job Match
                  </p>
                  <p
                    className={`mt-2 text-5xl font-bold ${getScoreColor(
                      analysisResult.matchPercentage
                    )}`}
                  >
                    {analysisResult.matchPercentage}%
                  </p>
                  <p className="text-sm text-muted-foreground">match rate</p>
                </div>
              </div>

              {/* Strengths */}
              <div className="card-base">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {analysisResult.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="card-base">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {analysisResult.improvements.map((improvement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords */}
              <div className="card-base">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="card-base">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {analysisResult.recommendations.map(
                    (recommendation, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        {recommendation}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Try Again Button */}
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setSelectedFile(null);
                  setResumeText("");
                  setJobDescription("");
                }}
                className="btn-secondary w-full"
              >
                Analyze Another Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAnalysis;
