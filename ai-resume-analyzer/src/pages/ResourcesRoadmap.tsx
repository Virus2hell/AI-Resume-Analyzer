// src/pages/ResourcesRoadmap.tsx
import { useState } from "react";
import Layout from "@/components/Layout";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  level: number;
  prerequisites: string[];
}

interface RoadmapResponse {
  roleTitle: string;
  companyName?: string;
  summary: string;
  roadmap: RoadmapNode[];
  projectIdeas: {
    title: string;
    description: string;
    techStack: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
  }[];
  youtubeResources: {
    title: string;
    url: string;
    description: string;
    skillsCovered: string[];
  }[];
}

const ResourcesRoadmap = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<RoadmapResponse | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setData(null);

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

      const json = (await res.json()) as RoadmapResponse;
      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!data) return;
    const flowTextLines: string[] = [];

    flowTextLines.push(`Role: ${data.roleTitle}`);
    if (data.companyName) flowTextLines.push(`Company: ${data.companyName}`);
    flowTextLines.push("");
    flowTextLines.push("Roadmap Flowchart (top to bottom):");

    data.roadmap
      .sort((a, b) => a.level - b.level)
      .forEach((node) => {
        flowTextLines.push(
          `\n[Level ${node.level}] ${node.title.toUpperCase()}`
        );
        if (node.prerequisites.length > 0) {
          flowTextLines.push(
            `   Prerequisites: ${node.prerequisites.join(" -> ")}`
          );
        }
        if (node.description) {
          flowTextLines.push(`   Notes: ${node.description}`);
        }
      });

    flowTextLines.push("\nProject Ideas:");
    data.projectIdeas.forEach((p, idx) => {
      flowTextLines.push(
        `\n${idx + 1}. ${p.title} (${p.difficulty})\n   Stack: ${p.techStack.join(
          ", "
        )}\n   ${p.description}`
      );
    });

    flowTextLines.push("\nYouTube / Learning Resources:");
    data.youtubeResources.forEach((r, idx) => {
      flowTextLines.push(
        `\n${idx + 1}. ${r.title}\n   URL: ${r.url}\n   Skills: ${r.skillsCovered.join(
          ", "
        )}\n   ${r.description}`
      );
    });

    const blob = new Blob([flowTextLines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.roleTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-roadmap.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const groupedByLevel = (data?.roadmap || []).reduce<
    Record<number, RoadmapNode[]>
  >((acc, node) => {
    if (!acc[node.level]) acc[node.level] = [];
    acc[node.level].push(node);
    return acc;
  }, {});

  const sortedLevels = Object.keys(groupedByLevel)
    .map((n) => Number(n))
    .sort((a, b) => a - b);

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Career Roadmap
          </h1>
          <p className="mt-4 text-muted-foreground">
            Paste a company job description and get an AI-generated skill roadmap, flowchart, projects and learning resources tailored to that role.
          </p>

          {/* Input card */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="card-base">
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

            {/* Summary / download */}
            <div className="card-base space-y-3">
              <h2 className="text-lg font-semibold">Summary</h2>
              {data ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    {data.summary}
                  </p>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Role:</span> {data.roleTitle}
                    </p>
                    {data.companyName && (
                      <p>
                        <span className="font-medium">Company:</span>{" "}
                        {data.companyName}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleDownload}
                    className="mt-2 inline-flex items-center justify-center rounded-md border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5"
                  >
                    Download Flowchart & Projects (.txt)
                  </button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Generate a roadmap to see a summary, projects and YouTube links here.
                </p>
              )}
            </div>
          </div>

          {/* Flowchart */}
          {data && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold">Skill Roadmap Flowchart</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Read the boxes from top to bottom. Each row represents a level; arrows show how prerequisite topics lead into advanced ones.
              </p>

              <div className="mt-6 space-y-6 overflow-x-auto">
                {sortedLevels.map((level) => (
                  <div key={level} className="flex items-center gap-4">
                    <div className="flex h-full min-w-[80px] flex-col items-center justify-center rounded-md bg-muted px-2 py-3 text-xs font-semibold uppercase text-muted-foreground">
                      Level {level}
                    </div>

                    <div className="flex items-center gap-4">
                      {groupedByLevel[level].map((node) => (
                        <div
                          key={node.id}
                          className="relative flex min-w-[220px] max-w-xs flex-col rounded-lg border bg-card px-4 py-3 text-xs shadow-sm"
                        >
                          <div className="rounded bg-yellow-200 px-2 py-0.5 text-[11px] font-semibold text-yellow-900">
                            {node.title}
                          </div>
                          {node.description && (
                            <p className="mt-2 text-[11px] text-muted-foreground">
                              {node.description}
                            </p>
                          )}
                          {node.prerequisites.length > 0 && (
                            <p className="mt-2 text-[11px] text-muted-foreground">
                              Prereq:{" "}
                              <span className="font-medium">
                                {node.prerequisites.join("  →  ")}
                              </span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="mt-10">
                <h2 className="text-xl font-semibold">
                  Recommended Projects (Add to Resume)
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Build 3–5 of these projects using the tech stack mentioned in the JD to signal strong alignment.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {data.projectIdeas.map((project) => (
                    <div key={project.title} className="card-base">
                      <h3 className="text-sm font-semibold">
                        {project.title}{" "}
                        <span className="ml-1 text-xs uppercase tracking-wide text-muted-foreground">
                          ({project.difficulty})
                        </span>
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {project.description}
                      </p>
                      <p className="mt-2 text-xs">
                        <span className="font-medium">Stack:</span>{" "}
                        {project.techStack.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube resources */}
              <div className="mt-10">
                <h2 className="text-xl font-semibold">YouTube / Learning Paths</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use these curated playlists and channels to learn the skills highlighted in the roadmap.
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {data.youtubeResources.map((resource) => (
                    <a
                      key={resource.url}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-base block hover:border-primary/60 hover:shadow-md"
                    >
                      <h3 className="text-sm font-semibold">{resource.title}</h3>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {resource.description}
                      </p>
                      <p className="mt-2 text-[11px]">
                        <span className="font-medium">Skills:</span>{" "}
                        {resource.skillsCovered.join(", ")}
                      </p>
                      <p className="mt-1 text-[11px] text-primary">
                        {resource.url}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesRoadmap;
