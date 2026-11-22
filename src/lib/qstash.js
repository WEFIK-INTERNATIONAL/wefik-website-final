import "server-only";
import { Client, Receiver } from "@upstash/qstash";

let qstashClient = null;
let qstashReceiver = null;

export function getQStashClient() {
  if (!qstashClient) {
    const token = process.env.QSTASH_TOKEN;
    if (!token) {
      throw new Error("Missing QSTASH_TOKEN");
    }
    qstashClient = new Client({ token });
  }
  return qstashClient;
}

export function getQStashReceiver() {
  if (!qstashReceiver) {
    const currentSigningKey = process.env.QSTASH_CURRENT_SIGNING_KEY;
    const nextSigningKey = process.env.QSTASH_NEXT_SIGNING_KEY;
    if (!currentSigningKey || !nextSigningKey) {
      throw new Error(
        "Missing QSTASH_CURRENT_SIGNING_KEY or QSTASH_NEXT_SIGNING_KEY"
      );
    }
    qstashReceiver = new Receiver({ currentSigningKey, nextSigningKey });
  }
  return qstashReceiver;
}

export const qstash = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getQStashClient();
      const val = client[prop];
      return typeof val === "function" ? val.bind(client) : val;
    },
  }
);
