"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

// TODO: replace placeholder figures (marked *) with real numbers.
const STATS = [
  { value: 30, suffix: "+", decimals: 0, label: "Happy clients" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average rating" },
  { value: 50, suffix: "+", decimals: 0, label: "Projects delivered" }, // *
  { value: 4, suffix: "+", decimals: 0, label: "Years building" }, // * since 2022
];

export default function StatsStrip() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const nums = gsap.utils.toArray(".stat-num");
      const lines = gsap.utils.toArray(".stat-line");

      if (reduce) {
        gsap.set(lines, { strokeDashoffset: 0 });
        return;
      }

      nums.forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const decimals = parseInt(el.dataset.decimals, 10);
        const counter = { v: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(counter, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
        });
      });

      gsap.fromTo(
        lines,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.15,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-label="Wefik in numbers"
      className="bg-bg-primary border-border/40 w-full border-y"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`border-border/40 flex flex-col items-center justify-center gap-2 px-4 py-10 text-center md:py-14 ${
              i % 2 === 0 ? "border-r" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
              i === 1 ? "lg:border-r" : ""
            }`}
          >
            <div className="font-big text-text-primary flex items-baseline text-5xl leading-none font-black md:text-7xl">
              <span
                className="stat-num tabular-nums"
                data-value={s.value}
                data-decimals={s.decimals}
              >
                {s.value.toFixed(s.decimals)}
              </span>
              <span className="text-accent">{s.suffix}</span>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 120 10"
              className="h-2.5 w-20 overflow-visible md:w-24"
            >
              <path
                className="stat-line stroke-accent"
                d="M2 6 C 22 1, 38 10, 60 5 S 100 2, 118 6"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="1"
              />
            </svg>
            <span className="text-text-muted text-[11px] font-bold tracking-[0.2em] uppercase md:text-xs">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
