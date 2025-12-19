import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  FileText,
  MessageCircle,
  PenSquare,
  Map,
  Gauge,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  // Tools dropdown will be inserted here
  // Resources dropdown will also be inserted here
  { name: "Jobs", path: "/jobs" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const toolItems = [
  { name: "Resume Analysis", path: "/resume-analysis", icon: FileText },
  { name: "ATS Score Checker", path: "/ats-checker", icon: Gauge },
];

const resourceItems = [
  { name: "Resume Writing", path: "/resources/resume-writing", icon: FileText },
  {
    name: "Interview Prep Material",
    path: "/resources/interview-prep",
    icon: MessageCircle,
  },
  { name: "Cover Letter", path: "/resources/cover-letter", icon: PenSquare },
  { name: "Roadmap", path: "/resources/roadmap", icon: Map },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const toolsTimeoutRef = useRef<number | null>(null);
  const resourcesTimeoutRef = useRef<number | null>(null);

  const location = useLocation();

  const isToolPath =
    location.pathname === "/resume-analysis" ||
    location.pathname === "/ats-checker";
  const isResourcePath = location.pathname.startsWith("/resources");

  const openWithDelay = (
    setter: (v: boolean) => void,
    timeoutRef: React.MutableRefObject<number | null>,
    delay = 100
  ) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setter(true), delay);
  };

  const closeWithDelay = (
    setter: (v: boolean) => void,
    timeoutRef: React.MutableRefObject<number | null>,
    delay = 150
  ) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setter(false), delay);
  };

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
            {/* Home */}
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Home
            </Link>

            {/* Tools dropdown with delay */}
            <div
              className="relative"
              onMouseEnter={() =>
                openWithDelay(setIsToolsOpen, toolsTimeoutRef, 80)
              }
              onMouseLeave={() =>
                closeWithDelay(setIsToolsOpen, toolsTimeoutRef, 200)
              }
            >
              <button
                type="button"
                className={`nav-link flex items-center gap-1 ${
                  isToolPath ? "active" : ""
                }`}
                onClick={() => setIsToolsOpen((prev) => !prev)}
              >
                Tools
                <ChevronDown className="h-4 w-4" />
              </button>

              {isToolsOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl bg-card p-2 shadow-lg border border-border animate-fade-in">
                  {toolItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                      onClick={() => setIsToolsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources dropdown with delay */}
            <div
              className="relative"
              onMouseEnter={() =>
                openWithDelay(setIsResourcesOpen, resourcesTimeoutRef, 80)
              }
              onMouseLeave={() =>
                closeWithDelay(setIsResourcesOpen, resourcesTimeoutRef, 200)
              }
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
                <div className="absolute left-0 mt-2 w-64 rounded-xl bg-card p-2 shadow-lg border border-border animate-fade-in">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        location.pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                      onClick={() => setIsResourcesOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining nav items: Jobs, About, Contact */}
            {navItems.slice(1).map((item) => (
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

        {/* Mobile Navigation (unchanged) */}
        {isMobileMenuOpen && (
          <div className="animate-fade-in border-t border-border py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                Home
              </Link>

              {/* Tools */}
              <div className="mt-2 border-t border-border pt-2">
                <p className="px-4 pb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Tools
                </p>
                {toolItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Resources */}
              <div className="mt-2 border-t border-border pt-2">
                <p className="px-4 pb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Resources
                </p>
                {resourceItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Jobs, About, Contact */}
              {navItems.slice(1).map((item) => (
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
