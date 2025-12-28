import Layout from "@/components/Layout";
import { Target, Users, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Student Built, Career Focused",
    description:
      "KeyWorded is built by a small team of students who have been through the placement grind and understand how confusing job descriptions and resumes can be.",
  },
  {
    icon: Users,
    title: "Personalized For Every JD",
    description:
      "We know the same ‘software developer’ role can ask for JavaScript in one company and Python in another, so our tools adapt your resume to each specific job description.",
  },
  {
    icon: Zap,
    title: "Practical Learning, Not Just Theory",
    description:
      "From tech stack resources with code and examples to clear roadmaps for different domains, everything is designed to help you actually build skills, not just read about them.",
  },
  {
    icon: Heart,
    title: "Support For Job Seekers",
    description:
      "Job hunting is stressful, especially as a student. KeyWorded aims to reduce that stress with clear feedback,and resume writing help.",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="mb-16 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              About KeyWorded
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              KeyWorded is a student-built platform that helps job seekers
              tailor their resume to each job description, learn new tech
              stacks with real examples, and plan their career with clear,
              practical roadmaps.
            </p>
          </div>

          {/* Story */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Our Story
            </h2>
            <div className="prose prose-gray max-w-none text-muted-foreground">
              <p className="mb-4">
                KeyWorded started as a project by a group of students who were
                preparing for internships and placements. We noticed that even
                for the same role title, like “Software Developer”, different
                companies asked for completely different skills like one wanted
                JavaScript, another focused on Python, and another cared more
                about frameworks or cloud tools.
              </p>
              <p className="mb-4">
                Updating a resume for every single job quickly became tiring and
                confusing. It was easy to miss an important keyword from the job
                description or forget to highlight the right project. We built
                KeyWorded to solve that problem by analyzing a resume against a
                specific JD and clearly showing which skills and sections need
                improvement.
              </p>
              <p className="mb-4">
                Over time, the project grew into a complete platform: a resume
                analyzer, a resume-writing tool to create your own resume,
                detailed resources for different tech stacks with code and
                examples, and a job section to discover relevant roles. We also
                added roadmaps for various domains so students know what to
                learn next instead of guessing.
              </p>
              <p>
                Our goal is simple: help students and early-career developers
                understand what each job really expects, tailor their resumes
                with confidence, and learn the right skills to move closer to
                their dream role.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
              Our Values
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={index} className="card-base flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
