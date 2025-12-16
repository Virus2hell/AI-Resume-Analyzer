import Layout from "@/components/Layout";

const ResourcesInterviewPrep = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Interview Prep Resources
          </h1>
          <p className="mt-4 text-muted-foreground">
            Practice questions, frameworks, and tips to help you perform
            confidently in interviews.
          </p>

          <div className="mt-8 space-y-4">
            <div className="card-base">
              <h2 className="text-lg font-semibold">Common Interview Questions</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prepare concise, structured answers to the most frequently asked questions.
              </p>
            </div>
            <div className="card-base">
              <h2 className="text-lg font-semibold">STAR Method</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Learn how to use Situation–Task–Action–Result to tell strong stories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesInterviewPrep;
