// src/lib/groqClient.ts
import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.warn("VITE_GROQ_API_KEY is not set");
}

export const groq = new Groq({
  apiKey,
});
