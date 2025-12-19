// src/pages/RoadmapResult.tsx
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import html2pdf from "html2pdf.js";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  level: number;
  prerequisites: string[];
}

interface RoadmapResponse {
  roleTitle: string;
  companyName?: string | null;
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

const RoadmapResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roadmapData = (location.state as { roadmapData?: RoadmapResponse })
    ?.roadmapData;

  const pdfRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!roadmapData) {
      // if user directly opens this URL without state, send them back
      navigate("/resources-roadmap");
    }
  }, [roadmapData, navigate]);

  const groupedByLevel = useMemo(() => {
    const acc: Record<number, RoadmapNode[]> = {};
    (roadmapData?.roadmap || []).forEach((node) => {
      if (!acc[node.level]) acc[node.level] = [];
      acc[node.level].push(node);
    });
    return acc;
  }, [roadmapData]);

  const sortedLevels = useMemo(
    () =>
      Object.keys(groupedByLevel)
        .map((n) => Number(n))
        .sort((a, b) => a - b),
    [groupedByLevel]
  );

  const handleDownloadPdf = async () => {
    if (!pdfRef.current || !roadmapData) return;

    const opt: any = {
  margin: [10, 10, 10, 10],
  filename: "...",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
};

    await html2pdf().set(opt).from(pdfRef.current).save();
  };

  if (!roadmapData) return null;

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Roadmap for {roadmapData.roleTitle}
              </h1>
              {roadmapData.companyName && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Target company: {roadmapData.companyName}
                </p>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                Follow this flowchart from top to bottom and use the projects and resources to build a portfolio aligned with the job description.
              </p>
            </div>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Download as PDF
            </button>
          </div>

          {/* Everything inside pdfRef will be rendered into the PDF */}
          <div ref={pdfRef} className="mt-8 space-y-10">
            {/* Summary */}
            <section className="card-base">
              <h2 className="text-lg font-semibold">Overview</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {roadmapData.summary}
              </p>
            </section>

            {/* Flowchart */}
            <section>
              <h2 className="text-xl font-semibold">Skill Roadmap Flowchart</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Levels represent learning stages. Arrows show prerequisite knowledge that feeds into the next skills.
              </p>

              <div className="mt-6 space-y-6">
                {sortedLevels.map((level) => (
                  <div key={level} className="flex items-center gap-4">
                    <div className="flex h-full min-w-[80px] flex-col items-center justify-center rounded-md bg-muted px-2 py-3 text-xs font-semibold uppercase text-muted-foreground">
                      Level {level}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
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
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xl font-semibold">
                Recommended Projects
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ship at least 3–5 of these and showcase them in your resume and portfolio.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {roadmapData.projectIdeas.map((project) => (
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
            </section>

            {/* YouTube / learning resources */}
            <section>
            <h2 className="text-xl font-semibold">YouTube / Learning Resources</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Use these playlists and channels to cover the roadmap topics in depth.
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
                {roadmapData.youtubeResources.map((resource) => (
                <div key={resource.url} className="card-base">
                    <h3 className="text-sm font-semibold">{resource.title}</h3>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                    {resource.description}
                    </p>
                    <p className="mt-2 text-[11px]">
                    <span className="font-medium">Skills:</span>{" "}
                    {resource.skillsCovered.join(", ")}
                    </p>
                    {/* clickable link */}
                    <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[11px] text-primary underline break-all"
                    >
                    {resource.url}
                    </a>
                </div>
                ))}
            </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoadmapResult;
