/**
 * Strict Rate Limiter for Chatbot (with In-Memory Fallback)
 * Location: src/lib/ai/ratelimit.js
 *
 * NOTE: Fail-open is explicitly disallowed on this route.
 * If Redis is unavailable, an in-memory limiter enforces strict per-instance bounds.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../redis.js";

const inMemoryStore = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 req / min

function cleanupInMemory() {
  const now = Date.now();
  for (const [key, record] of inMemoryStore.entries()) {
    if (now - record.timestamp > WINDOW_MS) {
      inMemoryStore.delete(key);
    }
  }
}

function checkInMemoryLimit(identifier) {
  cleanupInMemory();
  const now = Date.now();
  const record = inMemoryStore.get(identifier);

  if (!record || now - record.timestamp > WINDOW_MS) {
    inMemoryStore.set(identifier, { count: 1, timestamp: now });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: MAX_REQUESTS - record.count };
}

let upstashLimiter = null;

function getUpstashLimiter() {
  if (!upstashLimiter) {
    try {
      upstashLimiter = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "60 s"),
        prefix: "wefik:chat:ratelimit",
      });
    } catch {
      upstashLimiter = null;
    }
  }
  return upstashLimiter;
}

export async function checkChatRateLimit(identifier) {
  const limiter = getUpstashLimiter();
  if (limiter) {
    try {
      const res = await limiter.limit(identifier);
      return res;
    } catch (err) {
      console.warn(
        "[ChatRateLimit] Redis unreachable, falling back to in-memory:",
        err.message
      );
      return checkInMemoryLimit(identifier);
    }
  }
  return checkInMemoryLimit(identifier);
}
