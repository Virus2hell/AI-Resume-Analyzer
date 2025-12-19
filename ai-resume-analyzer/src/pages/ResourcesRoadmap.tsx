// src/pages/ResourcesRoadmap.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const ResourcesRoadmap = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setError(null);

    if (!jobDescription.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"}/api/generate-roadmap`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription }),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to generate roadmap");
      }

      const json = await res.json();

      // navigate to result page with data in router state
      navigate("/resources/roadmap/roadmap-result", {
        state: {
          roadmapData: json,
        },
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating roadmap.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Career Roadmap
          </h1>
          <p className="mt-4 text-muted-foreground">
            Paste a company job description and get an AI-generated skill roadmap, projects and learning resources tailored to that role.
          </p>

          <div className="mt-8 card-base">
            <h2 className="text-lg font-semibold">Job Description</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Include the full posting: responsibilities, required skills, qualifications, and about the role sections.
            </p>
            <textarea
              className="mt-4 h-72 w-full resize-none rounded-md border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste the complete job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Generating roadmap..." : "Generate Roadmap"}
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-500">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesRoadmap;
