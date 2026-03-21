"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Tag from "../ui/Tag";

export default function CareersHero() {
  const { canPlayEntrance } = useLoader();
  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const bgRef = useRef(null);
  const ghostRef = useRef(null);

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
        bgRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.4, duration: 2, ease: "power2.out" }
      )
        .fromTo(
          ghostRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 0.05, duration: 2, ease: "power3.out" },
          "<"
        )
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=1.2"
        )
        .fromTo(
          headlineRef.current.querySelectorAll(".char-reveal"),
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.8"
        )
        .fromTo(
          sublineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );
    },
    { scope: containerRef, dependencies: [canPlayEntrance] }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary relative min-h-[90vh] overflow-hidden pt-32 pb-24 md:pt-48 md:pb-40"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0"
      >
        <Image
          src="/images/agency/story_banner.png"
          alt="Careers Background"
          fill
          className="object-cover brightness-50 grayscale"
          priority
        />
        <div className="from-bg-primary to-bg-primary absolute inset-0 z-10 bg-gradient-to-b via-transparent" />
      </div>

      {/* Ghost Text */}
      <div
        ref={ghostRef}
        className="font-big text-text-primary pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 select-none"
        style={{ fontSize: "20vw", whiteSpace: "nowrap" }}
      >
        CAREERS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 text-center md:gap-16">
          <div className="flex flex-col items-center gap-6">
            <Tag>Careers at Wefik</Tag>
            <h1
              ref={headlineRef}
              className="font-big text-text-primary text-6xl leading-none font-black tracking-tighter uppercase md:text-8xl lg:text-[11rem]"
            >
              <div className="overflow-hidden">
                <span className="char-reveal anim-el inline-block">
                  Build the
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="char-reveal anim-el text-accent inline-block italic">
                  Future.
                </span>
              </div>
            </h1>
          </div>

          <div
            ref={sublineRef}
            className="anim-el flex max-w-xl flex-col items-center gap-8 opacity-0"
          >
            <p className="font-body text-text-muted text-base leading-relaxed md:text-xl">
              We&apos;re looking for bold thinkers and creative problem solvers
              to help us redefine the digital landscape. Join our elite team of
              innovators.
            </p>
            <div className="bg-accent/10 flex h-16 w-16 animate-bounce items-center justify-center rounded-full">
              <ArrowDown size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
