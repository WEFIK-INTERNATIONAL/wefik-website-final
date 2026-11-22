import "server-only";
import { Resend } from "resend";

let resendClient = null;

export function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export const resend = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getResend();
      const val = client[prop];
      return typeof val === "function" ? val.bind(client) : val;
    },
  }
);
