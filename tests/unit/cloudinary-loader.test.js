import { describe, it, expect } from "vitest";
import cloudinaryLoader from "@/lib/cloudinary-loader";

describe("cloudinary-loader fallback behavior", () => {
  it("returns original src when cloud name is not set or empty", () => {
    const originalSrc = "/images/agency/banner.jpg";
    const result = cloudinaryLoader({
      src: originalSrc,
      width: 800,
      quality: 75,
    });
    // In dev / unconfigured mode without CLOUDINARY_CLOUD_NAME, it falls back to original src
    expect(result).toBe(originalSrc);
  });

  it("handles remote URLs gracefully", () => {
    const remoteUrl = "https://cdn.sanity.io/images/demo/test.png";
    const result = cloudinaryLoader({
      src: remoteUrl,
      width: 1200,
    });
    expect(result).toBe(remoteUrl);
  });
});
