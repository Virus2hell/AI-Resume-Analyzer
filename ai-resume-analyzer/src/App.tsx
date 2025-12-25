// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import ResumeAnalysisReport from "./pages/ResumeAnalysisReport";
import ATSChecker from "./pages/ATSChecker";
import ResourcesResumeWriting from "./pages/ResourcesResumeWriting";
import ResourcesInterviewPrep from "./pages/ResourcesInterviewPrep";
//adding concepts
import ReactConceptsPage from "./routes/interview/ReactConceptsPage";
import Nextjs15ConceptsPage from "./routes/interview/Nextjs15ConceptsPage";
import CSharpConceptsPage from "./routes/interview/CSharpConceptsPage";
import JavascriptBeginnerPage from "./routes/interview/JavascriptBeginnerPage";
import JavascriptIntermediatePage from "./routes/interview/JavascriptIntermediatePage";
import JavascriptAdvancePage from "./routes/interview/JavascriptAdvancePage";

import ResourcesCoverLetter from "./pages/ResourcesCoverLetter";
import ResourcesRoadmap from "./pages/ResourcesRoadmap";
import RoadmapResult from "./pages/RoadmapResult";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Supabase auth page (login + signup in one UI) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Resume analysis page is PUBLIC; button handles auth check */}
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />

        {/* Protected routes that must require login */}
        <Route
          path="/resume-analysis/report"
          element={
            <ProtectedRoute>
              <ResumeAnalysisReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route
          path="/resources/resume-writing"
          element={<ResourcesResumeWriting />}
        />

        {/* Interview Prep: list page is public */}
        <Route
          path="/resources/interview-prep"
          element={<ResourcesInterviewPrep />}
        />

        {/* Concept detail pages are protected */}
        <Route
          path="/resources/interview-prep/react-concepts"
          element={
            <ProtectedRoute>
              <ReactConceptsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/interview-prep/nextjs-15-concepts"
          element={
            <ProtectedRoute>
              <Nextjs15ConceptsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/interview-prep/c-sharp-concepts"
          element={
            <ProtectedRoute>
              <CSharpConceptsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/interview-prep/javascript-beginner-concepts"
          element={
            <ProtectedRoute>
              < JavascriptBeginnerPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/interview-prep/javascript-intermediate-concepts"
          element={
            <ProtectedRoute>
              < JavascriptIntermediatePage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources/interview-prep/javascript-advance-concepts"
          element={
            <ProtectedRoute>
              < JavascriptAdvancePage/>
            </ProtectedRoute>
          }
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
