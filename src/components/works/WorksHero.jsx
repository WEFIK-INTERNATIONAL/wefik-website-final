"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function WorksHero() {
  const { canPlayEntrance } = useLoader();
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      gsap.set(containerRef.current.querySelectorAll(".anim-el"), {
        opacity: 1,
        y: 0,
        yPercent: 0,
      });
    }, 400);
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
          headlineRef.current.querySelectorAll(".split-word"),
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
          sublineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.6"
        );
    },
    { scope: containerRef, dependencies: [canPlayEntrance] }
  );

  return (
    <header ref={containerRef} className="mb-16 md:mb-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div ref={tagRef} className="anim-el opacity-0">
            <span className="text-accent mb-4 block text-xs font-bold tracking-[0.3em] uppercase">
              Our Portfolio
            </span>
          </div>
          <h1
            ref={headlineRef}
            className="font-display text-text-primary text-5xl leading-[0.9] font-black tracking-tighter md:text-8xl lg:text-9xl"
          >
            <div className="mr-[0.2em] inline-block overflow-hidden">
              <span className="split-word anim-el inline-block">SELECTED</span>
            </div>
            <br />
            <div
              className="inline-block overflow-hidden"
              style={{ color: "var(--color-accent)" }}
            >
              <span className="split-word anim-el inline-block italic">
                WORKS.
              </span>
            </div>
          </h1>
        </div>
        <div ref={sublineRef} className="anim-el opacity-0">
          <p className="text-text-muted max-w-xs text-sm leading-relaxed md:text-base">
            Explore our latest projects across web development, design, and
            digital transformation.
          </p>
        </div>
      </div>
    </header>
  );
}
