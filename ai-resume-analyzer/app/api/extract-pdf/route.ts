import { NextRequest, NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist";
import * as mammoth from "mammoth";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    let text = "";

    if (file.type === "application/pdf") {
      text = await extractPdfText(file);
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      text = await extractDocxText(file);
    } else if (file.name.endsWith(".doc")) {
      text = await extractDocText(file);
    } else {
      text = await file.text();
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from file" },
      { status: 500 }
    );
  }
}

async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument(buffer).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items
      .map((item: any) => item.str)
      .join(" ");
    text += "\n";
  }

  return text;
}

async function extractDocxText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

async function extractDocText(file: File): Promise<string> {
  // For .doc files, we'll just use basic text extraction
  // In production, consider using a library like mammoth with proper .doc support
  return await file.text();
}