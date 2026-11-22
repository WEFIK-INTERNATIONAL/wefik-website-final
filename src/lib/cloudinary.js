import "server-only";
import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

export function getCloudinary() {
  if (!isConfigured) {
    if (process.env.CLOUDINARY_URL) {
      cloudinary.config();
      isConfigured = true;
    } else {
      const cloud_name =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        process.env.CLOUDINARY_CLOUD_NAME;
      const api_key = process.env.CLOUDINARY_API_KEY;
      const api_secret = process.env.CLOUDINARY_API_SECRET;

      if (!cloud_name || !api_key || !api_secret) {
        throw new Error(
          "Missing CLOUDINARY_URL or CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET / NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"
        );
      }

      cloudinary.config({
        cloud_name,
        api_key,
        api_secret,
        secure: true,
      });
      isConfigured = true;
    }
  }
  return cloudinary;
}

const cloudinaryProxy = new Proxy(
  {},
  {
    get(_target, prop) {
      const instance = getCloudinary();
      const val = instance[prop];
      return typeof val === "function" ? val.bind(instance) : val;
    },
  }
);

export default cloudinaryProxy;
