import "server-only";
import { redis } from "./redis.js";

const PREFIX = "wefik:";
const TIMEOUT_MS = 500;

export async function getOrSet(key, ttlSeconds, fn) {
  const fullKey = `${PREFIX}${key}`;

  // Fail-open cache read with short timeout
  try {
    const getPromise = redis.get(fullKey);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Redis get timeout")), TIMEOUT_MS);
    });
    const cached = await Promise.race([getPromise, timeoutPromise]);
    if (cached !== null && cached !== undefined) {
      return typeof cached === "string" ? JSON.parse(cached) : cached;
    }
  } catch {
    // Fail-open: proceed to compute fresh value
  }

  // Compute fresh value
  const result = await fn();

  // Fail-safe cache write with short timeout
  if (result !== undefined && result !== null) {
    try {
      const serialized = JSON.stringify(result);
      const setPromise = redis.set(fullKey, serialized, { ex: ttlSeconds });
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Redis set timeout")), TIMEOUT_MS);
      });
      await Promise.race([setPromise, timeoutPromise]);
    } catch {
      // Fail-open: ignore cache write failure
    }
  }

  return result;
}
