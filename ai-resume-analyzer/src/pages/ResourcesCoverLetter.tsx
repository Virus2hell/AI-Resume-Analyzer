import { useState } from "react";
import Layout from "@/components/Layout";
import { Loader2, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResourcesCoverLetter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState<string | null>(null);

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type.startsWith("text/")) {
      return await file.text();
    }
    // basic fallback if not txt; you can plug real PDF/DOCX parsing later
    return `File name: ${file.name}, type: ${file.type}\n\n(Full parsing not implemented; please also paste your resume text if needed.)`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setCoverLetter("");

    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err) {
      console.error("Resume file read error:", err);
      setError("Could not read resume file. Please try another file or paste text manually.");
    }
  };

  const handleGenerate = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please upload a resume (or paste its text) and enter a job description.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCoverLetter("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/generate-cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate cover letter");
      }

      setCoverLetter(data.coverLetter || "");
    } catch (err) {
      console.error("Cover letter error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the cover letter."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!coverLetter.trim()) return;

    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const lines = doc.splitTextToSize(coverLetter, maxWidth);

    let y = margin;
    const lineHeight = 16;

    lines.forEach((line: string) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("cover-letter.pdf");
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              AI Cover Letter Generator
            </h1>
            <p className="mt-4 text-muted-foreground">
              Upload your resume, paste the job description, and get a tailored,
              ATS-friendly cover letter you can download as PDF.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Resume + JD inputs */}
            <div className="space-y-6">
              {/* Resume upload */}
              <div className="card-base">
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Upload Resume
                </h2>
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary-hover"
                />
                {selectedFile && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  For best results, upload a .txt export of your resume or paste
                  its content below.
                </p>
                <textarea
                  className="mt-3 input-base min-h-[120px]"
                  placeholder="(Optional) Paste your resume text here or edit the extracted text..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>

              {/* Job description */}
              <div className="card-base">
                <h2 className="mb-3 text-lg font-semibold text-foreground">
                  Job Description
                </h2>
                <textarea
                  className="input-base min-h-[180px]"
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                onClick={handleGenerate}
                disabled={
                  isGenerating ||
                  !resumeText.trim() ||
                  !jobDescription.trim()
                }
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Cover Letter...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </button>
            </div>

            {/* Right: Output + download */}
            <div className="space-y-4">
              <div className="card-base h-full">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    Generated Cover Letter
                  </h2>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={!coverLetter.trim()}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                </div>

                <div className="min-h-[260px] rounded-lg border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground whitespace-pre-line">
                  {coverLetter
                    ? coverLetter
                    : "Your AI-generated cover letter will appear here after you click “Generate Cover Letter”."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesCoverLetter;
