import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "ATS Score Checker", path: "/ats-checker" },
  { name: "Resume Analysis", path: "/resume-analysis" },
  // Resources handled separately as dropdown
  { name: "Jobs", path: "/jobs" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const resourceItems = [
  { name: "Resume Writing", path: "/resources/resume-writing" },
  { name: "Interview Prep", path: "/resources/interview-prep" },
  { name: "Cover Letter", path: "/resources/cover-letter" },
  { name: "Roadmap", path: "/resources/roadmap" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

  const isResourcePath = location.pathname.startsWith("/resources");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="section-container">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-foreground transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span>KeyWorded</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                type="button"
                className={`nav-link flex items-center gap-1 ${
                  isResourcePath ? "active" : ""
                }`}
                onClick={() => setIsResourcesOpen((prev) => !prev)}
              >
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>

              {isResourcesOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card p-2 shadow-lg border border-border animate-fade-in">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link to="/resume-analysis" className="btn-primary">
              Analyze Resume
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-ghost lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="animate-fade-in border-t border-border py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Resources section in mobile menu */}
              <div className="mt-2 border-t border-border pt-2">
                <p className="px-4 pb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Resources
                </p>
                {resourceItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/resume-analysis"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                Analyze Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
