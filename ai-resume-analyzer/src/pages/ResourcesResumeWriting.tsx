import Layout from "@/components/Layout";

const ResourcesResumeWriting = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Resume Writing Resources
          </h1>
          <p className="mt-4 text-muted-foreground">
            Learn how to structure, write, and optimize your resume for ATS and
            recruiters.
          </p>

          {/* You can later replace with detailed content */}
          <div className="mt-8 space-y-4">
            <div className="card-base">
              <h2 className="text-lg font-semibold">How to Write a Winning Resume</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Step-by-step guidance on crafting a clear, impactful resume that stands out.
              </p>
            </div>
            <div className="card-base">
              <h2 className="text-lg font-semibold">Action Verbs & Bullet Points</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Use powerful verbs and measurable results to describe your experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesResumeWriting;
