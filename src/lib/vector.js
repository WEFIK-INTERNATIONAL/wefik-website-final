import "server-only";
import { Index } from "@upstash/vector";

let vectorIndex = null;

export function getVectorIndex() {
  if (!vectorIndex) {
    const url = process.env.UPSTASH_VECTOR_REST_URL;
    const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
    if (!url || !token) {
      throw new Error(
        "Missing UPSTASH_VECTOR_REST_URL or UPSTASH_VECTOR_REST_TOKEN"
      );
    }
    vectorIndex = new Index({ url, token });
  }
  return vectorIndex;
}

export const vector = new Proxy(
  {},
  {
    get(_target, prop) {
      const index = getVectorIndex();
      const val = index[prop];
      return typeof val === "function" ? val.bind(index) : val;
    },
  }
);
