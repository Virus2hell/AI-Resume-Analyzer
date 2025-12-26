// src/pages/ResourcesInterviewPrep.tsx
import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ConceptCard = {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  tags: string[];
};

const concepts: ConceptCard[] = [
  {
    id: "react-concepts",
    title: "React Concepts",
    subtitle: "Core concepts & interview questions",
    path: "/resources/interview-prep/react-concepts",
    tags: ["react", "frontend", "javascript"],
  },
  {
    id: "nextjs-15-concepts",
    title: "Next.js 15 Concepts",
    subtitle: "Routing, data fetching, app router",
    path: "/resources/interview-prep/nextjs-15-concepts",
    tags: ["nextjs", "react", "fullstack"],
  },
  {
    id: "c-sharp-concepts",
    title: "C# Concepts",
    subtitle: "Core Concepts & interview questions",
    path: "/resources/interview-prep/c-sharp-concepts",
    tags: ["C", "C#", "Game", "Unity"],
  },
  {
    id: "javascript-beginner-concepts",
    title: "Javascript Beginner Concepts",
    subtitle: "Core Concepts & interview questions",
    path: "/resources/interview-prep/javascript-beginner-concepts",
    tags: ["frontend", "beginner", "web development", "javascript"],
  },
  {
    id: "javascript-intermediate-concepts",
    title: "Javascript Intermediate Concepts",
    subtitle: "Core Concepts & interview questions",
    path: "/resources/interview-prep/javascript-intermediate-concepts",
    tags: ["frontend", "intermediate", "javascript"],
  },
  {
    id: "javascript-advance-concepts",
    title: "Javascript Advance Concepts",
    subtitle: "Core Concepts & interview questions",
    path: "/resources/interview-prep/javascript-advance-concepts",
    tags: ["frontend", "advance", "web development", "javascript"],
  },
  {
    id: "python-concepts",
    title: "Python Concepts",
    subtitle: "Core Concepts , numpy , pandas",
    path: "/resources/interview-prep/python-concepts",
    tags: ["python", "numpy", "pandas"],
  },
  {
    id: "sql-beginner-concepts",
    title: "SQL Beginner Concepts",
    subtitle: "Basics, Data Retrieval, Advanced Querying,  Data Manipulation",
    path: "/resources/interview-prep/sql-beginner-concepts",
    tags: ["sql", "relational", "dbms"],
  },
  {
    id: "sql-intermediate-concepts",
    title: "SQL Intermediate Concepts",
    subtitle: "Indexes and Performance, Views and Stored Procedures, Data Integrity and Constraints",
    path: "/resources/interview-prep/sql-intermediate-concepts",
    tags: ["sql", "relational", "dbms"],
  },
  {
    id: "sql-advance-concepts",
    title: "SQL Advance Concepts",
    subtitle: "Advanced Concepts, Data Types & Function",
    path: "/resources/interview-prep/sql-advance-concepts",
    tags: ["sql", "relational", "dbms"],
  },
  // add more later
];

const ResourcesInterviewPrep = () => {
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredConcepts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return concepts;
    return concepts.filter((c) => {
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const handleCardClick = (path: string) => {
    if (!user) {
      // send user to auth, then back to this concept page after login
      navigate("/auth", { state: { from: path || location.pathname } });
      return;
    }
    navigate(path);
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Interview Prep
            </h1>
            <p className="mt-3 text-muted-foreground">
              Deep-dive notes, concepts, and curated Q&amp;A for popular tech
              stacks and languages.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search concepts, stacks, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-base h-11 pl-9 text-sm"
              />
            </div>
          </div>

          {/* Cards grid – 3 per row on desktop */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredConcepts.length === 0 && (
              <p className="col-span-full text-center text-sm text-muted-foreground">
                No concepts found for “{query}”. Try a different keyword.
              </p>
            )}

            {filteredConcepts.map((concept) => (
              <button
                key={concept.id}
                type="button"
                onClick={() => handleCardClick(concept.path)}
                className="card-base flex h-40 flex-col justify-between text-left transition-transform hover:-translate-y-1 hover:shadow-hover"
              >
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {concept.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {concept.subtitle}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {concept.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {!user && (
            <p className="mt-6 text-xs text-center text-muted-foreground">
              You can browse the interview prep topics, but you need to create
              a free account to open any detailed concept page.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesInterviewPrep;
