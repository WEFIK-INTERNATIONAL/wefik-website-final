"use client";

import React, { useRef, useEffect, useState } from "react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SphereAnimation from "@/components/home/SphereAnimation";
import GridBackground from "@/components/home/GridBackground";
import TrustedAvatar from "@/components/home/TrustedAvatar";
import Tag from "@/components/ui/Tag";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

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

function useCountUp(target, duration = 1.5, startOnMount = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startOnMount) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = (now - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.round(eased * target);
      setCount(countRef.current);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startOnMount]);

  return count;
}

export default function HeroSection() {
  const { canPlayEntrance } = useLoader();
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const scrollDotRef = useRef(null);
  const [countStarted, setCountStarted] = useState(false);
  const clientCount = useCountUp(30, 1.5, countStarted);

  // Safety net: force content visible after 3s so the page is never blank
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      gsap.set(containerRef.current.querySelectorAll(".anim-el"), {
        opacity: 1,
        y: 0,
        yPercent: 0,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (!canPlayEntrance) return;

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      tl.fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          headlineRef.current.querySelectorAll(".headline-word"),
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2"
        )
        .add(() => setCountStarted(true), "-=0.3");

      gsap.to(scrollDotRef.current, {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    },
    { scope: containerRef, dependencies: [canPlayEntrance] }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <GridBackground />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(163,230,53,0.1) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "clamp(260px, 92vw, 680px)",
          opacity: 0.9,
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
          <div ref={tagRef} className="anim-el opacity-0">
            <Tag>Available for work</Tag>
          </div>

          <div
            ref={headlineRef}
            style={{
              fontSize: "clamp(2.2rem, 11vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-text-primary)",
              margin: 0,
            }}
          >
            <div className="mr-[0.2em] inline-block overflow-hidden">
              <span className="headline-word anim-el inline-block">
                Turning
              </span>
            </div>
            <div className="mr-[0.2em] inline-block overflow-hidden">
              <span className="headline-word anim-el inline-block">Your</span>
            </div>
            <div className="inline-block overflow-hidden">
              <span className="headline-word anim-el inline-block">Ideas</span>
            </div>
            <br />
            <div className="mr-[0.2em] inline-block overflow-hidden">
              <span className="headline-word anim-el inline-block">into</span>
            </div>
            <div
              className="mr-[0.2em] inline-block overflow-hidden"
              style={{ color: "var(--color-accent)" }}
            >
              <span className="headline-word anim-el inline-block">
                Digital
              </span>
            </div>
            <div className="inline-block overflow-hidden">
              <span className="headline-word anim-el inline-block">
                Reality
              </span>
            </div>
          </div>

          <p
            ref={subtitleRef}
            className="anim-el opacity-0"
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
            ref={ctaRef}
            className="anim-el flex flex-col-reverse items-center justify-center opacity-0 sm:flex-row"
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
                  Rated 4.9/5 by {clientCount}+ clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="anim-el absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center opacity-0"
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
            ref={scrollDotRef}
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
