import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="section-container py-12">
        {/* Top row: brand + 3 columns + contact, all in one line on desktop */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="space-y-4 md:max-w-xs">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  K
                </span>
              </div>
              <span>KeyWorded</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered resume analysis to help you land your dream job.
            </p>
          </div>

          {/* Tools */}
          <div className="min-w-[140px]">
            <h4 className="mb-4 text-sm font-semibold text-foreground">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/resume-analysis"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resume Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/ats-checker"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  ATS Score Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="min-w-[160px]">
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/resources/resume-writing"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resume Writing
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/interview-prep"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/cover-letter"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cover Letter
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/roadmap"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="min-w-[140px]">
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-[180px]">
            <h4 className="mb-4 text-sm font-semibold text-foreground">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>atharvanarvekar269@gmai.com</li>
              <li>+987654321</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KeyWorded. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
