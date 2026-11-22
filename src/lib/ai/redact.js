/**
 * PII Redactor for AI Chatbot
 * Location: src/lib/ai/redact.js
 */

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX =
  /(\+?\d{1,4}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}/g;

export function redactPii(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(EMAIL_REGEX, "[EMAIL REDACTED]")
    .replace(PHONE_REGEX, (match) => {
      const digits = match.replace(/\D/g, "");
      if (digits.length >= 7) {
        return "[PHONE REDACTED]";
      }
      return match;
    });
}

export function hasPii(text) {
  if (!text || typeof text !== "string") return false;
  return EMAIL_REGEX.test(text) || PHONE_REGEX.test(text);
}

// Aliases for convenience
export const redactPII = redactPii;
export const hasPII = hasPii;
