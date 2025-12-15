import Layout from '@/components/Layout';
import { BookOpen, FileText, Video, Lightbulb, ExternalLink } from 'lucide-react';

const resources = [
  {
    category: 'Resume Writing',
    icon: FileText,
    items: [
      { title: 'How to Write a Winning Resume', type: 'Article' },
      { title: 'Resume Action Verbs List', type: 'Guide' },
      { title: 'Quantifying Your Achievements', type: 'Article' },
    ],
  },
  {
    category: 'Interview Prep',
    icon: Video,
    items: [
      { title: 'Common Interview Questions', type: 'Guide' },
      { title: 'STAR Method Explained', type: 'Video' },
      { title: 'Salary Negotiation Tips', type: 'Article' },
    ],
  },
  {
    category: 'Career Advice',
    icon: Lightbulb,
    items: [
      { title: 'Building Your Personal Brand', type: 'Article' },
      { title: 'Networking Strategies', type: 'Guide' },
      { title: 'Career Change Roadmap', type: 'Guide' },
    ],
  },
  {
    category: 'Industry Guides',
    icon: BookOpen,
    items: [
      { title: 'Tech Industry Resume Tips', type: 'Guide' },
      { title: 'Healthcare Resume Best Practices', type: 'Article' },
      { title: 'Finance Resume Templates', type: 'Template' },
    ],
  },
];

const Resources = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive guides, templates, and tips to help you succeed in your job search
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {resources.map((category, index) => (
              <div key={index} className="card-base">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{category.category}</h2>
                </div>
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a
                        href="#"
                        className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-secondary"
                      >
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary">
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{item.type}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-12 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">Stay Updated</h2>
            <p className="mt-2 text-muted-foreground">
              Get the latest career tips and resources delivered to your inbox
            </p>
            <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-base flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
