import Layout from "@/components/Layout";
import { AlertTriangle, Home } from 'lucide-react';

const ResourcesResumeWriting = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-2xl text-center">
          {/* Work In Progress Banner */}
          <div className="rounded-xl border-2 border-dashed border-border bg-secondary/30 p-12">
            <AlertTriangle className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Work in Progress</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Resume writing resources coming soon 🚀
            </p>
            <a href="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home Page
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesResumeWriting;
