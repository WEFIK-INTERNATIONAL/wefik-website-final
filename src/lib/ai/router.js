/**
 * Deterministic AI Intent Router & Circuit Breaker
 * Location: src/lib/ai/router.js
 */

import { redis } from "../redis.js";
import { streamGroq } from "./adapters/groq.js";
import { streamGemini } from "./adapters/gemini.js";
import { streamDeepSeek } from "./adapters/deepseek.js";
import { streamOpenRouter } from "./adapters/openrouter.js";
import { recordTokenUsage } from "./budget.js";

const circuitBreakers = new Map();
const CIRCUIT_TIMEOUT_MS = 60 * 1000; // 60 seconds

function isCircuitOpen(provider) {
  const failureTime = circuitBreakers.get(provider);
  if (!failureTime) return false;
  if (Date.now() - failureTime > CIRCUIT_TIMEOUT_MS) {
    circuitBreakers.delete(provider);
    return false;
  }
  return true;
}

function tripCircuit(provider) {
  circuitBreakers.set(provider, Date.now());
}

export function classifyIntent(lastMessageText) {
  const text = (lastMessageText || "").toLowerCase();

  // Technical / Code queries -> DeepSeek
  const technicalKeywords = [
    "code",
    "next.js",
    "react",
    "sanity",
    "tailwind",
    "api",
    "database",
    "postgres",
    "supabase",
    "architecture",
    "server action",
    "ssr",
    "isr",
  ];
  if (technicalKeywords.some((k) => text.includes(k))) {
    return "technical";
  }

  // Short, FAQ, or Navigation queries -> Groq
  const faqKeywords = [
    "price",
    "cost",
    "quote",
    "rate",
    "estimate",
    "turnaround",
    "timeline",
    "time",
    "location",
    "address",
    "kolkata",
    "office",
    "contact",
    "services",
    "what do you build",
    "hi",
    "hello",
    "hey",
  ];
  if (text.length < 80 || faqKeywords.some((k) => text.includes(k))) {
    return "faq";
  }

  // General / creative inquiries -> Gemini
  return "general";
}

export async function* routeAndStreamChat(messages, signal) {
  const lastUserMsg = messages[messages.length - 1]?.content || "";
  const normalizedQuery = lastUserMsg.toLowerCase().trim();

  // 1. Exact-match Redis Cache Check
  let cachedAnswer = null;
  try {
    const cacheKey = `wefik:chat:cache:${Buffer.from(normalizedQuery).toString("base64").slice(0, 40)}`;
    cachedAnswer = await redis.get(cacheKey);
  } catch {
    // Fail-open on cache check
  }

  if (cachedAnswer) {
    // Yield cached string instantly without spending tokens
    yield cachedAnswer;
    return;
  }

  // 2. Classify intent
  const intent = classifyIntent(normalizedQuery);
  let primaryStreamFn = null;
  let primaryName = "";

  if (intent === "technical" && !isCircuitOpen("deepseek")) {
    primaryStreamFn = streamDeepSeek;
    primaryName = "deepseek";
  } else if (intent === "faq" && !isCircuitOpen("groq")) {
    primaryStreamFn = streamGroq;
    primaryName = "groq";
  } else if (!isCircuitOpen("gemini")) {
    primaryStreamFn = streamGemini;
    primaryName = "gemini";
  }

  let fullResponse = "";
  let successfullyStreamed = false;

  // Try Primary Provider
  if (primaryStreamFn) {
    try {
      for await (const chunk of primaryStreamFn(messages, signal)) {
        fullResponse += chunk;
        yield chunk;
        successfullyStreamed = true;
      }
    } catch (err) {
      console.warn(
        `[Router] Primary provider (${primaryName}) failed:`,
        err.message
      );
      tripCircuit(primaryName);
    }
  }

  // If primary failed before outputting, or no primary, fall back to OpenRouter
  if (!successfullyStreamed) {
    console.log("[Router] Activating OpenRouter universal fallback chain...");
    try {
      const fallbackModel =
        intent === "technical"
          ? "deepseek/deepseek-chat"
          : "openai/gpt-4o-mini";
      for await (const chunk of streamOpenRouter(
        messages,
        signal,
        fallbackModel
      )) {
        fullResponse += chunk;
        yield chunk;
        successfullyStreamed = true;
      }
    } catch (fallbackErr) {
      console.error(
        "[Router] OpenRouter fallback failed:",
        fallbackErr.message
      );
      tripCircuit("openrouter");
    }
  }

  // Final fallback: Friendly human handoff message if all providers fail
  if (!successfullyStreamed) {
    const errorMsg =
      "I am currently receiving heavy inquiry traffic and cannot generate a direct reply right now. " +
      "Please click **Talk to a Human** above or email us directly at **info@wefik.in** and our team will get right back to you!";
    yield errorMsg;
    return;
  }

  // Track estimated token consumption
  const approxTokens = Math.ceil(
    (lastUserMsg.length + fullResponse.length) / 4
  );
  recordTokenUsage(approxTokens);

  // Cache successful short/FAQ responses in Redis (TTL: 1 hour)
  if (intent === "faq" && fullResponse.length > 20) {
    try {
      const cacheKey = `wefik:chat:cache:${Buffer.from(normalizedQuery).toString("base64").slice(0, 40)}`;
      await redis.set(cacheKey, fullResponse, { ex: 3600 });
    } catch {
      // Ignore cache write error
    }
  }
}
