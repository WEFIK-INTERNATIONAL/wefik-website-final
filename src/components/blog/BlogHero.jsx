"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function BlogHero({ postCount = 0, topicCount = 0 }) {
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
      className="bg-bg-primary relative w-full overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div ref={tagRef} className="anim-el opacity-0">
              <span className="text-accent mb-5 block text-xs font-bold tracking-[0.3em] uppercase">
                Insights &amp; Stories
              </span>
            </div>
            <h1
              ref={headlineRef}
              className="text-text-primary text-6xl leading-[0.88] tracking-tighter md:text-8xl lg:text-9xl"
            >
              <div className="mr-[0.2em] inline-block overflow-hidden">
                <span className="split-word anim-el inline-block">The</span>
              </div>
              <div className="inline-block overflow-hidden">
                <span className="split-word anim-el inline-block">Wefik</span>
              </div>
              <br />
              <div className="text-accent inline-block overflow-hidden">
                <span className="split-word anim-el inline-block">
                  Journal.
                </span>
              </div>
            </h1>
          </div>
          <div
            ref={sublineRef}
            className="anim-el flex flex-col gap-6 opacity-0 md:max-w-sm md:items-end md:text-right"
          >
            <p className="text-text-muted text-base leading-relaxed">
              Our latest thoughts on digital innovation, design trends and the
              future of web experiences.
            </p>
            {postCount > 0 && (
              <div className="flex gap-8">
                <div>
                  <div className="font-big text-text-primary text-4xl leading-none font-black">
                    {postCount}
                  </div>
                  <div className="text-text-subtle mt-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
                    {postCount === 1 ? "Article" : "Articles"}
                  </div>
                </div>
                {topicCount > 0 && (
                  <div>
                    <div className="font-big text-text-primary text-4xl leading-none font-black">
                      {topicCount}
                    </div>
                    <div className="text-text-subtle mt-1 text-[11px] font-semibold tracking-[0.15em] uppercase">
                      {topicCount === 1 ? "Topic" : "Topics"}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
