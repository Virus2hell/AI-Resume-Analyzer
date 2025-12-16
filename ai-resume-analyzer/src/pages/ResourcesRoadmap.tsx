import Layout from "@/components/Layout";

const ResourcesRoadmap = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Career Roadmap
          </h1>
          <p className="mt-4 text-muted-foreground">
            A step-by-step roadmap from profile setup to getting consistent
            interviews.
          </p>

          <div className="mt-8 space-y-4">
            <div className="card-base">
              <h2 className="text-lg font-semibold">Step 1: Profile & Branding</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Optimize your resume, LinkedIn, and portfolio to match your target roles.
              </p>
            </div>
            <div className="card-base">
              <h2 className="text-lg font-semibold">Step 2: Applications</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Build a consistent application routine and track your pipeline.
              </p>
            </div>
            <div className="card-base">
              <h2 className="text-lg font-semibold">Step 3: Interviews & Offers</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prepare for interviews, negotiate offers, and plan your next move.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesRoadmap;
