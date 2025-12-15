import Layout from '@/components/Layout';
import { Target, Users, Zap, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We believe everyone deserves the opportunity to find meaningful work that matches their skills.',
  },
  {
    icon: Users,
    title: 'User-Focused',
    description: 'Every feature we build is designed with job seekers in mind, making the process simpler and more effective.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We leverage cutting-edge AI technology to provide insights that were previously only available to career coaches.',
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'Job searching is stressful. We aim to reduce that stress with clear, actionable feedback.',
  },
];

const stats = [
  { value: '100K+', label: 'Resumes Analyzed' },
  { value: '85%', label: 'Success Rate' },
  { value: '50+', label: 'Industries Covered' },
  { value: '4.9/5', label: 'User Rating' },
];

const About = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="mb-16 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              About ResumeAI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We're on a mission to democratize career success by giving everyone access to 
              AI-powered resume optimization tools.
            </p>
          </div>

          {/* Story */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Our Story</h2>
            <div className="prose prose-gray max-w-none text-muted-foreground">
              <p className="mb-4">
                ResumeAI was born from a simple observation: talented people were getting 
                overlooked because their resumes didn't speak the language of Applicant 
                Tracking Systems.
              </p>
              <p className="mb-4">
                Our founders, experienced hiring managers and AI engineers, saw firsthand 
                how qualified candidates were being filtered out before a human ever saw 
                their application. They knew there had to be a better way.
              </p>
              <p>
                Today, ResumeAI helps thousands of job seekers optimize their resumes, 
                understand job requirements, and present themselves in the best possible 
                light to both AI systems and human recruiters.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="card-base text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">Our Values</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={index} className="card-base flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team CTA */}
          <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">Join Our Team</h2>
            <p className="mt-2 text-muted-foreground">
              We're always looking for talented people who share our mission
            </p>
            <a href="/jobs" className="btn-primary mt-6 inline-block">
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
