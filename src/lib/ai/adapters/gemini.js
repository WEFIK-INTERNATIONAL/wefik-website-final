/**
 * Google Gemini Provider Adapter (Streaming)
 * Location: src/lib/ai/adapters/gemini.js
 */

import { AI_MODELS, TOKEN_LIMITS, SYSTEM_PROMPT } from "../config.js";
import { gemini } from "../../gemini.js";

export async function* streamGemini(messages, signal) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  // Convert messages to Gemini format
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const responseStream = await gemini.models.generateContentStream({
    model: AI_MODELS.gemini,
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      maxOutputTokens: TOKEN_LIMITS.maxOutputTokens,
    },
  });

  for await (const chunk of responseStream) {
    if (signal?.aborted) break;
    const text = chunk.text;
    if (text) yield text;
  }
}
