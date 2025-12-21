// src/pages/ResumeAnalysis.tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { extractTextFromFile } from "@/lib/pdfExtract";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResumeAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // null when not logged in

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setError(null);

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
    setError(null);
  };

  const handleAnalyze = async () => {
    // 1. If not logged in, send to auth page (or show modal)
    if (!user) {
      navigate("/auth", { state: { from: location.pathname } });
      return;
    }

    // 2. Normal validation
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
      const response = await fetch(
        `${API_BASE_URL}/api/detailed-resume-analysis`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText,
            jobDescription,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      // Navigate to report page with data in location.state
      navigate("/resume-analysis/report", {
        state: { report: data },
      });
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

  const buttonDisabled =
    isAnalyzing ||
    !selectedFile ||
    !jobDescription.trim() ||
    !resumeText.trim();

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Resume Analysis
            </h1>
            <p className="mt-4 text-muted-foreground">
              Upload your resume and paste the job description to get a
              full, ATS-style analysis report.
            </p>
          </div>

          <div className="space-y-8">
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

            {error && (
              <div className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={buttonDisabled}
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

            {!user && (
              <p className="text-xs text-center text-muted-foreground">
                You need to be logged in to run the analysis. You can still
                upload your resume and job description before logging in.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAnalysis;
