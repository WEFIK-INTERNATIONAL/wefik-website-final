"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function CareersHero() {
  const { canPlayEntrance } = useLoader();
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);

  useGSAP(
    () => {
      const elements = [
        tagRef.current,
        headlineRef.current?.querySelectorAll(".char-reveal"),
        sublineRef.current,
      ].filter(Boolean);

      if (!canPlayEntrance) {
        gsap.set(elements, { opacity: 0 });
        return;
      }

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
          headlineRef.current.querySelectorAll(".char-reveal"),
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
      className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <span
              ref={tagRef}
              className="text-accent mb-4 block text-xs font-black tracking-[0.3em] uppercase opacity-0"
            >
              Careers at Wefik
            </span>
            <h1
              ref={headlineRef}
              className="font-display text-text-primary text-6xl leading-[0.8] font-black tracking-tighter md:text-[8rem] lg:text-[10rem]"
            >
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
          <div ref={sublineRef} className="max-w-xs opacity-0">
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
