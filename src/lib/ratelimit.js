import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "./redis";

let ratelimitInstance = null;

export function getRatelimit(options = {}) {
  if (!ratelimitInstance) {
    const client = getRedis();
    ratelimitInstance = new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(
        options.requests || 10,
        options.window || "10 s"
      ),
      analytics: options.analytics ?? true,
      prefix: options.prefix || "@upstash/ratelimit",
    });
  }
  return ratelimitInstance;
}

export const ratelimit = new Proxy(
  {},
  {
    get(_target, prop) {
      const limiter = getRatelimit();
      const val = limiter[prop];
      return typeof val === "function" ? val.bind(limiter) : val;
    },
  }
);
