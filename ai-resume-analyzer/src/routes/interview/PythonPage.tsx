import InterviewMarkdownPage from "@/components/InterviewMarkdownPage";
import pythonConceptsGuide from "@/content/interview/python-qa.md?raw"

const PythonPage = () => (
  <InterviewMarkdownPage title="Python Concepts" markdown={pythonConceptsGuide} />
);

export default PythonPage;