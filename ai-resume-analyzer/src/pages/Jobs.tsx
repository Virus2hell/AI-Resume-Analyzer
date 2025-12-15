import Layout from '@/components/Layout';
import { Briefcase, MapPin, Clock, DollarSign, ExternalLink } from 'lucide-react';

const jobs = [
  {
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$150k - $200k',
    posted: '2 days ago',
    tags: ['React', 'Node.js', 'AWS'],
  },
  {
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
    posted: '3 days ago',
    tags: ['Product Strategy', 'Agile', 'SaaS'],
  },
  {
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80 - $100/hr',
    posted: '1 week ago',
    tags: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    title: 'Data Scientist',
    company: 'AI Labs',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130k - $180k',
    posted: '4 days ago',
    tags: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    title: 'Marketing Manager',
    company: 'Growth Co.',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90k - $120k',
    posted: '5 days ago',
    tags: ['Digital Marketing', 'SEO', 'Analytics'],
  },
];

const Jobs = () => {
  return (
    <Layout>
      <div className="section-container py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Job Opportunities
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Discover curated job opportunities that match your skills and experience
            </p>
          </div>

          {/* Search/Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Search jobs..."
              className="input-base flex-1"
            />
            <select className="input-base sm:w-48">
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="card-hover group cursor-pointer">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{job.posted}</span>
                    <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="btn-secondary">
              Load More Jobs
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
