"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";
import { ArrowDown, ArrowRight, Globe, MapPin, Briefcase } from "lucide-react";
import Tag from "../ui/Tag";

// Role chips placed around the orbit (positions are % of the visual box).
const ROLES = [
  { label: "Designer", x: 50, y: 6, delay: "0s" },
  { label: "Developer", x: 90, y: 34, delay: "0.8s" },
  { label: "Strategist", x: 82, y: 80, delay: "1.6s" },
  { label: "Motion Artist", x: 18, y: 82, delay: "0.4s" },
  { label: "Marketer", x: 8, y: 36, delay: "1.2s" },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function TeamOrbit() {
  return (
    <div className="careers-orbit relative mx-auto aspect-square w-full max-w-[520px]">
      {/* rings */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="careers-glow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#careers-glow)" />
        <g className="origin-center animate-[spin_60s_linear_infinite] [transform-box:view-box] motion-reduce:animate-none">
          <circle
            cx="200"
            cy="200"
            r="180"
            className="stroke-text-primary/15"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
          <circle cx="200" cy="20" r="4" className="fill-accent" />
          <circle cx="20" cy="200" r="2.5" className="fill-text-primary/40" />
        </g>
        <g className="origin-center animate-[spin_40s_linear_infinite_reverse] [transform-box:view-box] motion-reduce:animate-none">
          <circle
            cx="200"
            cy="200"
            r="126"
            className="stroke-text-primary/12"
            strokeWidth="1"
          />
          <circle cx="326" cy="200" r="3.5" className="fill-accent" />
          <circle cx="111" cy="111" r="2.5" className="fill-text-primary/40" />
        </g>
        <g className="origin-center animate-[spin_24s_linear_infinite] [transform-box:view-box] motion-reduce:animate-none">
          <circle
            cx="200"
            cy="200"
            r="76"
            className="stroke-accent/40"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </g>
      </svg>

      {/* centre badge */}
      <div className="absolute top-1/2 left-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[var(--color-accent)] shadow-[0_0_60px_-10px_var(--color-accent)]">
        <span className="font-big text-bg-primary text-2xl leading-none font-black tracking-tight md:text-3xl">
          WEFIK
        </span>
        <span className="text-bg-primary/70 mt-1 text-[9px] font-bold tracking-[0.25em] uppercase">
          Team
        </span>
      </div>

      {/* role chips */}
      {ROLES.map((r) => (
        <div
          key={r.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
        >
          <span
            className="careers-bob border-text-primary/10 bg-bg-card text-text-primary flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold whitespace-nowrap shadow-lg md:text-sm"
            style={{ animationDelay: r.delay }}
          >
            <span className="bg-accent h-1.5 w-1.5 rounded-full" />
            {r.label}
          </span>
        </div>
      ))}

      {/* the open seat */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "78%", top: "58%" }}
      >
        <span
          className="careers-bob bg-accent text-bg-primary relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap shadow-[0_10px_40px_-10px_var(--color-accent)] md:text-sm"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="bg-bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
            <span className="bg-bg-primary relative inline-flex h-2 w-2 rounded-full" />
          </span>
          Your seat?
        </span>
      </div>
    </div>
  );
}

export default function CareersHero({ openRoles = 0 }) {
  const { canPlayEntrance } = useLoader();
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      gsap.set(containerRef.current.querySelectorAll(".anim-el"), {
        opacity: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (!canPlayEntrance) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.2 })
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        .fromTo(
          headlineRef.current.querySelectorAll(".char-reveal"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          sublineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          visualRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" },
          "-=1.2"
        );
    },
    { scope: containerRef, dependencies: [canPlayEntrance] }
  );

  const hasRoles = openRoles > 0;

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* subtle dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--color-text-primary) 9%, transparent) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 70% 45%, #000 30%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <div ref={tagRef} className="anim-el mb-7 opacity-0">
            <Tag>Careers at Wefik</Tag>
          </div>

          <h1
            ref={headlineRef}
            className="text-text-primary text-6xl leading-[0.88] tracking-tighter md:text-8xl xl:text-9xl"
          >
            <div className="overflow-hidden">
              <span className="char-reveal anim-el inline-block">
                Build the
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="char-reveal anim-el text-accent inline-block">
                future
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="char-reveal anim-el inline-block">with us.</span>
            </div>
          </h1>

          <div ref={sublineRef} className="anim-el mt-8 opacity-0">
            <p className="text-text-muted max-w-lg text-base leading-relaxed md:text-lg">
              We&apos;re looking for bold thinkers and creative problem solvers
              to help shape what&apos;s next on the web, for brands and for each
              other.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToId("open-roles")}
                className="group bg-accent text-bg-primary inline-flex h-14 cursor-pointer items-center justify-between gap-5 rounded-full pr-2 pl-7 text-[15px] font-bold shadow-[0_12px_40px_-14px_var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2.5">
                  See open roles
                  {hasRoles && (
                    <span className="bg-bg-primary/15 rounded-full px-2 py-0.5 text-xs tabular-nums">
                      {openRoles}
                    </span>
                  )}
                </span>
                <span className="bg-bg-primary text-accent flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-y-0.5">
                  <ArrowDown size={18} />
                </span>
              </button>
              <button
                type="button"
                onClick={() => scrollToId("culture")}
                className="group border-text-primary/20 text-text-primary hover:border-accent hover:text-accent inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full border px-7 text-[15px] font-semibold transition-colors duration-300"
              >
                Life at Wefik
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>
            </div>

            <ul className="text-text-muted mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Globe size={15} className="text-accent" />
                Remote-first
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-accent" />
                Rooted in Kolkata
              </li>
              <li className="flex items-center gap-2">
                <Briefcase size={15} className="text-accent" />
                {hasRoles
                  ? `${openRoles} open ${openRoles === 1 ? "role" : "roles"}`
                  : "No openings right now"}
              </li>
            </ul>
          </div>
        </div>

        <div
          ref={visualRef}
          className="anim-el mx-auto w-full max-w-[420px] opacity-0 lg:max-w-none"
        >
          <TeamOrbit />
        </div>
      </div>
    </section>
  );
}
