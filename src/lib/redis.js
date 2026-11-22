import "server-only";
import { Redis } from "@upstash/redis";

let redisInstance = null;

export function getRedis() {
  if (!redisInstance) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url || !token) {
      throw new Error(
        "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN"
      );
    }
    redisInstance = new Redis({ url, token });
  }
  return redisInstance;
}

export const redis = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getRedis();
      const val = client[prop];
      return typeof val === "function" ? val.bind(client) : val;
    },
  }
);
