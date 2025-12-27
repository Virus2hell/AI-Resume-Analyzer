import InterviewMarkdownPage from "@/components/InterviewMarkdownPage";
import pythonConceptsGuide from "@/content/interview/python-qa.md?raw"

const PythonConceptsPage = () => (
  <InterviewMarkdownPage title="Python Concepts" markdown={pythonConceptsGuide} />
);

export default PythonConceptsPage;