"use client";

import React from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SphereAnimation from "@/components/home/SphereAnimation";
import GridBackground from "@/components/home/GridBackground";
import TrustedAvatar from "@/components/home/TrustedAvatar";
import TransitionLink from "@/components/ui/TransitionLink";

function StarIcon() {
  return (
    <svg
      className="h-3 w-3 text-amber-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-bg-primary"
      style={{ minHeight: "100svh" }}
    >
      <GridBackground />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, rgba(163,230,53,0.04) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "clamp(260px, 92vw, 680px)",
          opacity: 0.28,
        }}
      >
        <SphereAnimation />
      </div>
      <div
        className="relative z-10 flex w-full items-center justify-center"
        style={{
          minHeight: "100svh",
          padding: "100px 20px 72px",
        }}
      >
        <div
          className="flex w-full flex-col items-center text-center"
          style={{ maxWidth: "860px", gap: "24px" }}
        >
          <div
            className="inline-flex items-center self-center"
            style={{
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(163,230,53,0.15)",
              background: "rgba(163,230,53,0.04)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "flex",
                width: "7px",
                height: "7px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  opacity: 0.7,
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                }}
              />
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--color-text-muted)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              Available for work
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 11vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            Turning Your Ideas
            <br />
            into <span style={{ color: "var(--color-accent)" }}>
              Digital
            </span>{" "}
            Reality
          </h1>
          <p
            style={{
              fontSize: "clamp(0.9rem, 8vw, 1.15rem)",
              color: "var(--color-text-muted)",
              maxWidth: "520px",
              lineHeight: 1.72,
              margin: 0,
            }}
          >
            From websites and apps to design, branding, and digital campaigns —
            we turn your vision into experiences that perform.
          </p>
          <div
            className="flex flex-col-reverse items-center justify-center sm:flex-row"
            style={{ gap: "16px", width: "100%" }}
          >
            <TransitionLink href="/contact">
              <AnimatedButton>Book A Call</AnimatedButton>
            </TransitionLink>
            <div className="flex items-center" style={{ gap: "12px" }}>
              <TrustedAvatar />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    color: "#f59e0b",
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--color-text-subtle)",
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Rated 4.9/5 by 30+ clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
        style={{ gap: "6px" }}
      >
        <span
          style={{
            fontSize: "9px",
            color: "var(--color-text-subtle)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "18px",
            height: "28px",
            borderRadius: "999px",
            border: "1px solid rgba(163,230,53,0.15)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "5px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "5px",
              borderRadius: "999px",
              backgroundColor: "var(--color-text-subtle)",
            }}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-5 h-28"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg-primary))",
        }}
      />

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
