/**
 * DeepSeek AI Provider Adapter (Streaming)
 * Location: src/lib/ai/adapters/deepseek.js
 */

import { AI_MODELS, TOKEN_LIMITS, SYSTEM_PROMPT } from "../config.js";

export async function* streamDeepSeek(messages, signal) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY missing");
  }

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: AI_MODELS.deepseek,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: TOKEN_LIMITS.maxOutputTokens,
      stream: true,
    }),
    signal,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`DeepSeek API Error (${res.status}): ${errorText}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === "data: [DONE]") continue;
      if (trimmed.startsWith("data: ")) {
        try {
          const json = JSON.parse(trimmed.slice(6));
          const chunk = json.choices?.[0]?.delta?.content || "";
          if (chunk) yield chunk;
        } catch {
          // ignore malformed JSON chunk
        }
      }
    }
  }
}
