import { ReactNode, useState } from "react";
import Layout from "@/components/Layout";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

interface InterviewMarkdownPageProps {
  title: string;
  markdown: string;
}

const InterviewMarkdownPage = ({ title, markdown }: InterviewMarkdownPageProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1
        className="mt-8 mb-4 text-3xl font-bold text-foreground border-b border-border pb-3"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="mt-7 mb-3 text-2xl font-semibold text-foreground border-b border-border pb-2"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="mt-5 mb-2 text-xl font-semibold text-foreground"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        className="mb-3 leading-relaxed text-base text-muted-foreground"
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li
        className="mb-1 leading-relaxed text-base text-muted-foreground"
        {...props}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="mb-3 ml-5 list-disc space-y-1" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="mb-3 ml-5 list-decimal space-y-1" {...props} />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-6 border-border" {...props} />
    ),

    code({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: ReactNode;
    }) {
      const isBlock = !inline;
      const codeText = String(children ?? "").replace(/\n$/, "");

      if (isBlock) {
        return (
          <div className="group mb-5 overflow-hidden rounded-lg border border-border bg-muted/70">
            <div className="flex items-center justify-between border-b border-border bg-muted px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
              <span>Code</span>
              <button
                type="button"
                onClick={() => handleCopy(codeText)}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-secondary"
              >
                {copiedCode === codeText ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto bg-muted px-4 py-3 text-sm text-foreground">
              <code className={className} {...props}>
                {codeText}
              </code>
            </pre>
          </div>
        );
      }

      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-5xl">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Curated interview notes and concepts for {title}.
            </p>
          </div>

          {/* Content card */}
          <div className="card-base">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewMarkdownPage;

