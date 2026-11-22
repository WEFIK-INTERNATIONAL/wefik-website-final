/**
 * Human Support Handoff Route Handler
 * Location: src/app/api/support/route.js
 */

import { z } from "zod";
import { resend } from "@/lib/resend";

const supportSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(5).max(2000),
  hp_website: z.string().optional(), // Honeypot field
});

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parseResult = supportSchema.safeParse(body);
  if (!parseResult.success) {
    return new Response(
      JSON.stringify({
        error: "Validation failed",
        details: parseResult.error.format(),
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { name, email, message, hp_website } = parseResult.data;

  // Honeypot trap: if filled by a bot, silently return success without sending
  if (hp_website && hp_website.trim().length > 0) {
    return new Response(
      JSON.stringify({ success: true, message: "Inquiry received." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const notificationEmail =
      process.env.SUPPORT_NOTIFICATION_EMAIL || "info@wefik.in";

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Wefik Support Bot <onboarding@resend.dev>",
        to: notificationEmail,
        reply_to: email,
        subject: `New Support Lead from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Thank you! Your message has been sent to the Wefik team. We will email you shortly.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[Support] Error sending email:", err.message);
    return new Response(
      JSON.stringify({
        error:
          "Failed to dispatch email right now. Please reach us directly at info@wefik.in.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
