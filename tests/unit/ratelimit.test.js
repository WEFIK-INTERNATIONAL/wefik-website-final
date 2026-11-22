import { describe, it, expect } from "vitest";
import { checkChatRateLimit } from "@/lib/ai/ratelimit";

describe("ratelimit.js blocking behavior", () => {
  it("permits allowed requests and blocks after reaching threshold", async () => {
    const testIp = `vitest-ratelimit-${Date.now()}`;
    let passedCount = 0;
    let blocked = false;

    // Default chat rate limit is 10 requests per minute
    for (let i = 0; i < 15; i++) {
      const res = await checkChatRateLimit(testIp);
      if (res.success) {
        passedCount++;
      } else {
        blocked = true;
        break;
      }
    }

    expect(passedCount).toBe(10);
    expect(blocked).toBe(true);
  });
});
