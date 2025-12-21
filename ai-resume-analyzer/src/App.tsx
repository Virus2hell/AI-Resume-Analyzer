// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import ResumeAnalysisReport from "@/pages/ResumeAnalysisReport";
import ATSChecker from "./pages/ATSChecker";
import ResourcesResumeWriting from "./pages/ResourcesResumeWriting";
import ResourcesInterviewPrep from "./pages/ResourcesInterviewPrep";
import ReactConceptsPage from "./routes/interview/ReactConceptsPage";
import Nextjs15ConceptsPage from "./routes/interview/Nextjs15ConceptsPage";
import ResourcesCoverLetter from "./pages/ResourcesCoverLetter";
import ResourcesRoadmap from "./pages/ResourcesRoadmap";
import RoadmapResult from "./pages/RoadmapResult";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Auth pages (public) */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Resume analysis according to JD (protected) */}
        <Route
          path="/resume-analysis"
          element={
            <ProtectedRoute>
              <ResumeAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-analysis/report"
          element={
            <ProtectedRoute>
              <ResumeAnalysisReport />
            </ProtectedRoute>
          }
        />

        {/* ATS score checker without resume (public) */}
        <Route path="/ats-checker" element={<ATSChecker />} />

        <Route
          path="/resources/resume-writing"
          element={<ResourcesResumeWriting />}
        />
        <Route
          path="/resources/interview-prep"
          element={<ResourcesInterviewPrep />}
        />
        <Route
          path="/resources/interview-prep/react-concepts"
          element={<ReactConceptsPage />}
        />
        <Route
          path="/resources/interview-prep/nextjs-15-concepts"
          element={<Nextjs15ConceptsPage />}
        />

        <Route
          path="/resources/cover-letter"
          element={<ResourcesCoverLetter />}
        />
        <Route path="/resources/roadmap" element={<ResourcesRoadmap />} />
        <Route
          path="/resources/roadmap/roadmap-result"
          element={<RoadmapResult />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
