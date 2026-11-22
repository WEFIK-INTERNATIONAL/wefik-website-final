/**
 * Cloudinary Custom Image Loader & Delivery Helper
 * Location: src/lib/cloudinary-loader.js
 *
 * Constructs optimized Cloudinary URLs with auto-format (f_auto),
 * auto-quality (q_auto), and responsive width downscaling.
 * Automatically fails open to local source paths if cloud name is unset.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function cloudinaryLoader({ src, width, quality }) {
  // If no cloud name is configured, or image is already an external URL (Sanity/remote), return src
  if (!CLOUD_NAME || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Normalize path removing leading slash
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
  const q = quality || "auto";

  // Build Cloudinary optimized URL
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_${q},w_${width}/${cleanSrc}`;
}

export function getOptimizedImageUrl(src, { width, quality = "auto" } = {}) {
  if (
    !CLOUD_NAME ||
    !src ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    return src;
  }
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
  const transforms = ["f_auto", `q_${quality}`];
  if (width) transforms.push(`w_${width}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(",")}/${cleanSrc}`;
}
