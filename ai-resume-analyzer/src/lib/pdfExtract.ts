// src/lib/pdfExtract.ts
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url"; // Vite compatible [web:159]

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type.startsWith("text/")) return await file.text();

  if (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  ) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await (pdfjsLib as any).getDocument({ data: arrayBuffer })
      .promise;

    let fullText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items
        .map((item: any) => ("str" in item ? item.str : ""))
        .join(" ");
      fullText += strings + "\n\n";
    }
    return fullText.trim();
  }

  return `File name: ${file.name}, type: ${file.type}

(Text extraction for this format is not implemented yet. Please paste your resume text below.)`;
}
