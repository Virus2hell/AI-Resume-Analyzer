import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import ATSChecker from "./pages/ATSChecker";
import ResourcesResumeWriting from "./pages/ResourcesResumeWriting";
import ResourcesInterviewPrep from "./pages/ResourcesInterviewPrep";
import ReactConceptsPage from "./routes/interview/ReactConceptsPage";
import ResourcesCoverLetter from "./pages/ResourcesCoverLetter";
import ResourcesRoadmap from "./pages/ResourcesRoadmap";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/resources/resume-writing" element={<ResourcesResumeWriting />} />
        {/* interview Prep & routes for each concepts */}
        <Route path="/resources/interview-prep" element={<ResourcesInterviewPrep />} />
        <Route path="/resources/interview-prep/react-concepts" element={<ReactConceptsPage/>}></Route>

        <Route path="/resources/cover-letter" element={<ResourcesCoverLetter />} />
        <Route path="/resources/roadmap" element={<ResourcesRoadmap />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
