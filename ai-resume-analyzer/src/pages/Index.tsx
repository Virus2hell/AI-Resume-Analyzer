import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { FileSearch, Target, Zap, Shield, ArrowRight, BookOpenCheck, FileText, Route, MousePointer2 } from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    title: 'AI Resume Analysis',
    description: 'Get detailed insights on how your resume matches job descriptions using advanced AI.',
  },
  {
    icon: Target,
    title: 'ATS Score Checker',
    description: 'Check if your resume is optimized to pass through Applicant Tracking Systems.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Receive actionable suggestions to improve your resume within seconds.',
  },
  {
    icon: BookOpenCheck,
    title: 'Interview Prep Material',
    description:
      'Access curated core concepts, cheat sheets, and example questions tailored to your target roles and tech stack.',
  },
  {
    icon: FileText,
    title: 'AI Cover Letter Generator',
    description:
      'Generate personalized cover letters using AI that align your experience with each specific job description.',
  },
  {
    icon: Route,
    title: 'Custom Learning Roadmap',
    description:
      'Get a step-by-step, AI-generated roadmap based on the job description to close your skill gaps efficiently.',
  },
  {
    icon: MousePointer2,
    title: 'User-Friendly Experience',
    description:
      'Navigate a clean, responsive interface designed for fast uploads, clear insights, and distraction-free job prep.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your documents are processed securely and never stored on our servers.',
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-slide-up text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Land Your Dream Job with{' '}
              <span className="gradient-text">AI-Powered</span> Resume Analysis
            </h1>
            <p className="animate-slide-up mt-6 text-lg text-muted-foreground" style={{ animationDelay: '0.1s' }}>
              Upload your resume and job description to get instant, actionable feedback. 
              Our AI analyzes your qualifications against job requirements to maximize your chances.
            </p>
            <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ animationDelay: '0.2s' }}>
              <Link to="/resume-analysis" className="btn-primary flex items-center gap-2">
                Analyze My Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ats-checker" className="btn-secondary">
                Check ATS Score
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Beat the ATS. Impress the Recruiter
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our comprehensive tools help you optimize your resume and stand out from the competition.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center sm:p-12 lg:p-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Match Your Resume to the Job Before the Recruiter Does
            </h2>
            <div className="mt-8">
              <Link to="/resume-analysis" className="btn-primary inline-flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
