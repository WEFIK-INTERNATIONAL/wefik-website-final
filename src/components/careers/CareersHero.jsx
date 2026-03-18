"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CareersHero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".char-reveal",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" }
      ).fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <span className="text-accent hero-sub mb-4 block text-xs font-black tracking-[0.3em] uppercase">
              Careers at Wefik
            </span>
            <h1 className="font-display text-text-primary text-6xl leading-[0.8] font-black tracking-tighter md:text-[8rem] lg:text-[10rem]">
              <div className="overflow-hidden">
                <span className="char-reveal inline-block">JOIN THE</span>
              </div>
              <div className="overflow-hidden">
                <span className="char-reveal text-accent inline-block italic">
                  FUTURE.
                </span>
              </div>
            </h1>
          </div>
          <div className="hero-sub max-w-xs">
            <p className="text-text-muted text-sm leading-relaxed md:text-base">
              We&apos;re looking for bold thinkers and creative problem solvers
              to help us redefine the digital landscape.
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
        <div className="bg-accent/5 absolute top-0 right-0 h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[5%] h-[50%] w-[50%] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>
    </section>
  );
}
