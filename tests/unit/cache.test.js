import { describe, it, expect, vi } from "vitest";
import { getOrSet } from "@/lib/cache";

describe("cache.js fail-open behavior", () => {
  it("computes and returns fallback value when Redis throws or is unavailable", async () => {
    let computationExecuted = false;
    const fallbackFn = async () => {
      computationExecuted = true;
      return { status: "fresh_data", count: 42 };
    };

    const result = await getOrSet("test:failopen:key", 60, fallbackFn);
    expect(computationExecuted).toBe(true);
    expect(result).toEqual({ status: "fresh_data", count: 42 });
  });

  it("handles empty key or invalid TTL gracefully without throwing", async () => {
    const fallbackFn = async () => "fallback_value";
    const result = await getOrSet("", 0, fallbackFn);
    expect(result).toBe("fallback_value");
  });
});
