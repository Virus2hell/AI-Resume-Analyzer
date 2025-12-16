import Layout from "@/components/Layout";

const ResourcesCoverLetter = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Cover Letter Resources
          </h1>
          <p className="mt-4 text-muted-foreground">
            Templates and examples to write tailored cover letters that match each job.
          </p>

          <div className="mt-8 space-y-4">
            <div className="card-base">
              <h2 className="text-lg font-semibold">Cover Letter Structure</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Introduction, body, and closing that clearly show your fit for the role.
              </p>
            </div>
            <div className="card-base">
              <h2 className="text-lg font-semibold">Customizing for the JD</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mirror the job description and highlight the most relevant achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesCoverLetter;
