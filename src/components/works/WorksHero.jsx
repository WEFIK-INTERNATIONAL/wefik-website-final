"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function WorksHero({ count = 0, categoryCount = 0 }) {
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
    <header ref={containerRef} className="mb-12 md:mb-16">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div ref={tagRef} className="anim-el opacity-0">
            <span className="text-accent mb-5 block text-xs font-bold tracking-[0.3em] uppercase">
              Our Portfolio
            </span>
          </div>
          <h1
            ref={headlineRef}
            className="text-text-primary text-6xl leading-[0.88] tracking-tighter md:text-8xl lg:text-9xl"
          >
            <div className="mr-[0.2em] inline-block overflow-hidden">
              <span className="split-word anim-el inline-block">Selected</span>
            </div>
            <br />
            <div className="text-accent inline-block overflow-hidden">
              <span className="split-word anim-el inline-block">Works.</span>
            </div>
          </h1>
        </div>
        <div
          ref={sublineRef}
          className="anim-el flex flex-col gap-6 opacity-0 md:max-w-sm md:items-end md:text-right"
        >
          <p className="text-text-muted text-base leading-relaxed">
            Websites, products and brands we&apos;ve designed and built for
            clients across India.
          </p>
          {count > 0 && (
            <div className="flex gap-8">
              <div>
                <div className="font-big text-text-primary text-4xl leading-none font-black">
                  {count}
                </div>
                <div className="text-text-subtle mt-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
                  Projects
                </div>
              </div>
              {categoryCount > 0 && (
                <div>
                  <div className="font-big text-text-primary text-4xl leading-none font-black">
                    {categoryCount}
                  </div>
                  <div className="text-text-subtle mt-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
                    Industries
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
