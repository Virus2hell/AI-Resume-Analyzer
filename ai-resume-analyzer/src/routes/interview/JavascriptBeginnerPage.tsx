import InterviewMarkdownPage from "@/components/InterviewMarkdownPage";
import javascriptBeginnerGuide from "@/content/interview/Javascript-Beginner-Guide.md?raw"

const JavascriptBeginnerPage = () => (
  <InterviewMarkdownPage title="Javascript Beginner Concepts" markdown={javascriptBeginnerGuide} />
);

export default JavascriptBeginnerPage;