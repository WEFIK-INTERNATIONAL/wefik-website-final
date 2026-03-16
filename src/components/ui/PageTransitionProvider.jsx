"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ─── Context ──────────────────────────────────────────────────────────────────
const TransitionContext = createContext(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error(
      "usePageTransition must be used inside PageTransitionProvider"
    );
  return ctx;
}

// ─── Route labels ─────────────────────────────────────────────────────────────
const ROUTE_LABELS = {
  "/": "Home",
  "/agency": "Agency",
  "/expertise": "Expertise",
  "/works": "Works",
  "/blogs": "Blog",
  "/career": "Career",
  "/contact": "Contact",
};
function getLabel(href) {
  return (
    ROUTE_LABELS[href] ?? href.replace("/", "").replace(/-/g, " ")
  ).toUpperCase();
}

// ─── Overlay ──────────────────────────────────────────────────────────────────
function TransitionOverlay({ curtainRef, lineRef, labelRef, subRef }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Single dark curtain */}
      <div
        ref={curtainRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          transform: "translateY(100%)",
          willChange: "transform",
        }}
      >
        {/* Lime razor line — leading edge of curtain */}
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "#a3e635",
            transform: "scaleX(0)",
            transformOrigin: "left center",
            willChange: "transform",
          }}
        />

        {/* Page label */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: "clamp(32px, 6vw, 72px)",
          }}
        >
          {/* Subtle eyebrow */}
          <div
            ref={subRef}
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              color: "rgba(163,230,53,0.5)",
              textTransform: "uppercase",
              marginBottom: "12px",
              opacity: 0,
              transform: "translateY(10px)",
            }}
          >
            Navigating to
          </div>

          {/* Big page name */}
          <div
            ref={labelRef}
            style={{
              fontSize: "clamp(3rem, 10vw, 8.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
              color: "#ffffff",
              textTransform: "uppercase",
              opacity: 0,
              transform: "translateY(60px)",
              overflow: "hidden",
            }}
          />

          {/* Bottom lime accent bar */}
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "#a3e635",
              borderRadius: "2px",
              marginTop: "28px",
              opacity: 0,
              transform: "scaleX(0)",
              transformOrigin: "left",
            }}
            ref={(el) => {
              if (el) el.dataset.bar = "true";
            }}
            id="transition-bar"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function PageTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const curtainRef = useRef(null);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  const subRef = useRef(null);
  const isAnimating = useRef(false);
  const pendingHref = useRef(null);

  function getBar() {
    return document.getElementById("transition-bar");
  }

  // ── IN: curtain rises from bottom ────────────────────────────────────────
  const playIn = useCallback((href) => {
    return new Promise((resolve) => {
      if (labelRef.current) labelRef.current.textContent = getLabel(href);

      const curtain = curtainRef.current;
      const line = lineRef.current;
      const label = labelRef.current;
      const sub = subRef.current;
      const bar = getBar();

      // Reset
      gsap.set(curtain, { translateY: "100%", opacity: 1 });
      gsap.set(line, { scaleX: 0 });
      gsap.set(label, { opacity: 0, translateY: "60px" });
      gsap.set(sub, { opacity: 0, translateY: "10px" });
      if (bar) gsap.set(bar, { opacity: 0, scaleX: 0 });

      const tl = gsap.timeline({ onComplete: resolve });

      // 1. Curtain rises — fast, confident
      tl.to(
        curtain,
        {
          translateY: "0%",
          duration: 0.65,
          ease: "power4.inOut",
        },
        0
      )

        // 2. Lime line sweeps across the leading edge as curtain rises
        .to(
          line,
          {
            scaleX: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          0.1
        )

        // 3. Eyebrow fades in
        .to(
          sub,
          {
            opacity: 1,
            translateY: "0px",
            duration: 0.3,
            ease: "power2.out",
          },
          0.42
        )

        // 4. Page name rises into view
        .to(
          label,
          {
            opacity: 1,
            translateY: "0px",
            duration: 0.45,
            ease: "power3.out",
          },
          0.48
        )

        // 5. Bottom accent bar expands
        .to(
          bar,
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.4,
            ease: "expo.out",
          },
          0.6
        );
    });
  }, []);

  // ── OUT: curtain exits upward ─────────────────────────────────────────────
  const playOut = useCallback(() => {
    return new Promise((resolve) => {
      const curtain = curtainRef.current;
      const label = labelRef.current;
      const sub = subRef.current;
      const bar = getBar();

      const tl = gsap.timeline({ onComplete: resolve });

      // 1. Content exits fast
      tl.to(
        [label, sub, bar].filter(Boolean),
        {
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
          stagger: 0.04,
        },
        0
      )

        // 2. Curtain slides off to the left — not back down
        //    This feels like turning a page rather than reversing
        .to(
          curtain,
          {
            translateX: "-100%",
            duration: 0.7,
            ease: "power4.inOut",
          },
          0.12
        )

        // 3. Reset for next use
        .set(curtain, { translateX: "0%", translateY: "100%" });
    });
  }, []);

  // ── Navigate with transition ──────────────────────────────────────────────
  const navigateTo = useCallback(
    async (href) => {
      if (isAnimating.current || href === pathname) return;
      isAnimating.current = true;
      pendingHref.current = href;

      document.body.style.overflow = "hidden";

      await playIn(href);
      router.push(href);
      await new Promise((r) => setTimeout(r, 80));
      await playOut();

      document.body.style.overflow = "";
      isAnimating.current = false;
      pendingHref.current = null;
    },
    [pathname, router, playIn, playOut]
  );

  // ── Browser back/forward ──────────────────────────────────────────────────
  useEffect(() => {
    if (pendingHref.current === pathname) return;
    if (isAnimating.current) return;
    playOut();
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <TransitionOverlay
        curtainRef={curtainRef}
        lineRef={lineRef}
        labelRef={labelRef}
        subRef={subRef}
      />
    </TransitionContext.Provider>
  );
}
