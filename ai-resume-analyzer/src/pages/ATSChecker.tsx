import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { FileSearch, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const atsFactors = [
  {
    title: 'Keyword Optimization',
    description: 'Ensure your resume contains relevant keywords from the job description.',
    icon: CheckCircle,
  },
  {
    title: 'Clean Formatting',
    description: 'Use simple, ATS-friendly formatting without tables or complex layouts.',
    icon: CheckCircle,
  },
  {
    title: 'Standard Sections',
    description: 'Include clearly labeled sections like Experience, Education, and Skills.',
    icon: CheckCircle,
  },
  {
    title: 'File Format',
    description: 'Submit in PDF or DOCX format for best compatibility.',
    icon: CheckCircle,
  },
];

const ATSChecker = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FileSearch className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              ATS Score Checker
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Applicant Tracking Systems (ATS) filter resumes before human recruiters see them. 
              Optimize your resume to pass these automated screenings.
            </p>
          </div>

          {/* Info Card */}
          <div className="card-base mb-8 flex items-start gap-4 bg-primary/5 border-primary/20">
            <Info className="h-6 w-6 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">What is an ATS?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                An Applicant Tracking System is software used by employers to collect, sort, and filter job applications. 
                Over 90% of Fortune 500 companies use ATS to streamline their hiring process.
              </p>
            </div>
          </div>

          {/* ATS Factors */}
          <div className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-foreground">Key ATS Optimization Factors</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {atsFactors.map((factor, index) => (
                <div key={index} className="card-base flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <factor.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{factor.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="card-base mb-12 flex items-start gap-4 bg-accent/5 border-accent/20">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">Common ATS Pitfalls</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Using graphics, images, or logos in your resume</li>
                <li>• Complex tables or multi-column layouts</li>
                <li>• Headers and footers with important information</li>
                <li>• Uncommon fonts or special characters</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">Check Your Resume Now</h2>
            <p className="mt-2 text-muted-foreground">
              Get a comprehensive analysis of your resume's ATS compatibility
            </p>
            <Link to="/resume-analysis" className="btn-primary mt-6 inline-flex items-center gap-2">
              Analyze My Resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ATSChecker;
