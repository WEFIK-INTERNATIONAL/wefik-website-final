"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function BlogHero() {
  const { canPlayEntrance } = useLoader();
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const els = containerRef.current.querySelectorAll(".anim-el");
      gsap.set(els, { opacity: 1, y: 0, yPercent: 0 });
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
    <section
      ref={containerRef}
      className="bg-bg-primary font-body relative w-full overflow-hidden pt-32 pb-16 md:pt-48 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="border-border/30 absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-dashed" />
        <div className="border-border/10 absolute top-[40%] left-0 h-px w-full border-t" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <div
            ref={tagRef}
            className="anim-el flex items-center gap-4 opacity-0"
          >
            <div className="bg-accent/20 h-px w-16" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Insights & Stories
            </span>
          </div>
          <h1
            ref={headlineRef}
            className="font-display mt-8 text-5xl leading-[0.9] font-black tracking-tighter md:text-8xl lg:text-9xl"
          >
            <div className="mr-[0.2em] inline-block overflow-hidden">
              <span className="split-word anim-el inline-block">Thought</span>
            </div>
            <div
              className="mr-[0.2em] inline-block overflow-hidden"
              style={{ color: "var(--color-accent)" }}
            >
              <span className="split-word anim-el inline-block italic">
                Leadership
              </span>
            </div>
            <div className="inline-block overflow-hidden">
              <span className="split-word anim-el inline-block">& Updates</span>
            </div>
          </h1>
          <p
            ref={sublineRef}
            className="border-accent/10 text-text-muted anim-el mt-8 max-w-xl border-l-2 pl-6 text-lg opacity-0 md:text-xl"
          >
            Explore our latest thoughts on digital innovation, design trends,
            and the future of web experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
