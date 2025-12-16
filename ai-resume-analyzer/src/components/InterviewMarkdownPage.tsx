import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface InterviewMarkdownPageProps {
  title: string;
  markdown: string;
}

const InterviewMarkdownPage = ({ title, markdown }: InterviewMarkdownPageProps) => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Curated interview notes and concepts for {title}.
            </p>
          </div>

          <div className="card-base">
            <div className="prose max-w-none prose-sm sm:prose-base prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-code:text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewMarkdownPage;
