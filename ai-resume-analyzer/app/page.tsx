"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ReportDisplay from "@/components/ReportDisplay";
import StepIndicator from "@/components/StepIndicator";

export default function Home() {
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractTextFromFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to extract text");
      const data = await response.json();
      return data.text || "";
    } catch (error) {
      console.error("Error extracting text:", error);
      return file.name;
    }
  };

  const handleResumeUpload = async (file: File) => {
    setResumeFile(file);
    setError("");
    const text = await extractTextFromFile(file);
    setResumeText(text);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both resume and job description");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription,
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      setReport(data);
      setStep(3);
    } catch (error) {
      console.error("Analysis failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setResumeFile(null);
    setResumeText("");
    setJobDescription("");
    setReport(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RA</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">
                  ResumeAnalyzer
                </h1>
                <p className="text-xs text-gray-500">AI-Powered Resume Checker</p>
              </div>
            </div>
            <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
              BETA
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Step Indicator */}
        <StepIndicator currentStep={step} />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-in">
            <p className="text-red-800 font-semibold">❌ {error}</p>
          </div>
        )}

        {/* Step 1: Upload Resume */}
        {step === 1 && (
          <FileUpload
            onUpload={handleResumeUpload}
            onNext={() => {
              setError("");
              setStep(2);
            }}
            fileName={resumeFile?.name}
            disabled={!resumeText}
          />
        )}

        {/* Step 2: Job Description */}
        {step === 2 && (
          <JobDescriptionInput
            value={jobDescription}
            onChange={(value) => {
              setJobDescription(value);
              setError("");
            }}
            onAnalyze={handleAnalyze}
            onBack={() => {
              setStep(1);
              setError("");
            }}
            loading={loading}
            disabled={!jobDescription.trim()}
          />
        )}

        {/* Step 3: Report */}
        {step === 3 && report && (
          <ReportDisplay report={report} onRestart={handleRestart} />
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-gray-200 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-600">
          <p>
            🚀 Powered by Groq AI | Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </main>
  );
}