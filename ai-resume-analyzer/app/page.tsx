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
    const text = await extractTextFromFile(file);
    setResumeText(text);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Please provide both resume and job description");
      return;
    }

    setLoading(true);
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
      alert("Failed to analyze resume. Please try again.");
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
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-gray-800">
              ResumeAnalyzer
            </h1>
          </div>
          <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
            BETA
          </span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <StepIndicator currentStep={step} />

        {step === 1 && (
          <FileUpload
            onUpload={handleResumeUpload}
            onNext={() => setStep(2)}
            fileName={resumeFile?.name}
            disabled={!resumeText}
          />
        )}

        {step === 2 && (
          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
            onAnalyze={handleAnalyze}
            onBack={() => setStep(1)}
            loading={loading}
            disabled={!jobDescription.trim()}
          />
        )}

        {step === 3 && report && (
          <ReportDisplay report={report} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}