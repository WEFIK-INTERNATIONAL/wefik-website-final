import "server-only";
import { GoogleGenAI } from "@google/genai";

let geminiClient = null;

export function getGemini() {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY");
    }
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

export const gemini = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getGemini();
      const val = client[prop];
      return typeof val === "function" ? val.bind(client) : val;
    },
  }
);
