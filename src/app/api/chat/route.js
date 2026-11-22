/**
 * AI Mascot Chat Route Handler (Streaming)
 * Location: src/app/api/chat/route.js
 */

import { z } from "zod";
import { checkChatRateLimit } from "@/lib/ai/ratelimit";
import { isBudgetExceeded } from "@/lib/ai/budget";
import { redactPii } from "@/lib/ai/redact";
import { routeAndStreamChat } from "@/lib/ai/router";
import { TOKEN_LIMITS } from "@/lib/ai/config";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(TOKEN_LIMITS.maxInputChars),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(TOKEN_LIMITS.maxHistoryMessages),
  sessionId: z.string().optional(),
});

export async function POST(req) {
  // 1. Origin Check
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && !origin.includes("localhost") && !origin.includes("wefik.in")) {
    return new Response(JSON.stringify({ error: "Invalid origin" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. IP & Session Rate Limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const rateLimitResult = await checkChatRateLimit(ip);
  if (!rateLimitResult.success) {
    return new Response(
      JSON.stringify({
        error:
          "You are asking questions a bit too quickly. Please pause for 60 seconds or click 'Talk to a Human'.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // 3. Daily Budget & Kill Switch Check
  if (isBudgetExceeded()) {
    return new Response(
      JSON.stringify({
        error:
          "Our AI assistant has reached its daily response budget. Please use the 'Talk to a Human' tab to reach our team directly!",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Input Body Schema Validation
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parseResult = chatRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid message payload",
        details: parseResult.error.format(),
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 5. Redact PII from user inputs
  const sanitizedMessages = parseResult.data.messages.map((m) => ({
    role: m.role,
    content: redactPii(m.content),
  }));

  // 6. Streaming Response via ReadableStream
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of routeAndStreamChat(
          sanitizedMessages,
          req.signal
        )) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error("[ChatAPI] Stream error:", err.message);
        controller.enqueue(
          encoder.encode("\n\n[Connection interrupted. Please try again.]")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
