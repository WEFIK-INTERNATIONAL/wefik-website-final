"use client";

import React, { useRef } from "react";
import {
  Search,
  Lightbulb,
  Palette,
  Rocket,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

import MagneticButton from "@/components/ui/MagneticButton";
import Tag from "../ui/Tag";

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description:
      "We dive into your brand, goals, and audience to align creativity with strategy from the start.",
    icon: Search,
    color: "accent",
  },
  {
    step: "02",
    title: "Concept & Strategy",
    subtitle: "Crafting the Blueprint",
    description:
      "Brainstorming and planning a roadmap that blends bold ideas with data-driven strategy.",
    icon: Lightbulb,
    color: "accent-bright",
  },
  {
    step: "03",
    title: "Design & Build",
    subtitle: "Turning Ideas Into Experiences",
    description:
      "Bringing concepts to life through sleek design, smooth development, and innovative solutions.",
    icon: Palette,
    color: "accent",
  },
  {
    step: "04",
    title: "Launch & Amplify",
    subtitle: "Making It Seen, Making It Heard",
    description:
      "Ensuring your brand shines through campaigns, storytelling, and strategic exposure.",
    icon: Rocket,
    color: "accent-bright",
  },
  {
    step: "05",
    title: "Evolve & Grow",
    subtitle: "Continuous Optimization",
    description:
      "Tracking, refining, and adapting to trends to keep your brand growing.",
    icon: TrendingUp,
    color: "accent",
  },
];

export default function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useGSAP(
    () => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      processSteps.forEach((_, index) => {
        const isRight = index % 2 !== 0;
        gsap.from(stepsRef.current[index], {
          opacity: 0,
          x: isRight ? 40 : -40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current[index],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      processSteps.forEach((_, index) => {
        const card = stepsRef.current[index]?.querySelector(".process-card");
        if (!card) return;
        gsap.to(card, {
          borderColor: "rgba(163,230,53,0.4)",
          boxShadow: "0 0 40px rgba(163,230,53,0.08)",
          scrollTrigger: {
            trigger: stepsRef.current[index],
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary border-border/20 overflow-hidden border-t py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 text-center">
          <div className="mb-10">
            <Tag>Our Process</Tag>
          </div>
          <h2 className="text-text-primary mb-8 text-4xl leading-tight font-black tracking-tighter uppercase md:text-7xl">
            Creative. Strategic. <br />
            <span className="text-accent">Always Unique.</span>
          </h2>
          <p className="text-text-muted mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            From initial idea to final post, we handle every step to ensure your
            content not only looks great but also delivers results.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="bg-border/20 absolute top-4 bottom-4 left-[23px] w-[2px] -translate-x-1/2 md:left-1/2" />

          <div
            ref={lineRef}
            className="bg-accent absolute top-4 bottom-4 left-[23px] w-[2px] origin-top -translate-x-1/2 scale-y-0 md:left-1/2"
          />

          <div className="space-y-16 md:space-y-32">
            {processSteps.map((item, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`relative flex flex-col items-center gap-8 md:flex-row md:gap-16 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute top-4 left-[23px] z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <div className="bg-bg-primary border-accent h-4 w-4 rounded-full border-4" />
                </div>

                <div
                  className={`w-full pl-14 md:w-[45%] md:pl-0 ${index % 2 !== 0 ? "md:text-left" : "md:text-right"}`}
                >
                  <div
                    className={`process-card bg-bg-card border-border/50 group relative overflow-hidden rounded-4xl border p-6 shadow-sm transition-all duration-500 md:p-8`}
                  >
                    <div
                      className={`mb-6 flex items-center gap-4 ${index % 2 !== 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    >
                      <div className="bg-accent/10 text-accent rounded-2xl p-3">
                        <item.icon size={24} />
                      </div>
                      <span className="text-accent text-xs font-bold tracking-widest uppercase">
                        Step {item.step}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-accent/60 text-[10px] font-black tracking-[0.2em] uppercase">
                        {item.title}
                      </span>
                      <div className="text-text-primary mt-1 text-2xl leading-none font-black tracking-tight uppercase md:text-4xl">
                        {item.subtitle}
                      </div>
                    </div>

                    <p className="text-text-muted text-sm leading-relaxed md:text-base">
                      {item.description}
                    </p>

                    <div
                      className={`absolute -top-4 ${index % 2 !== 0 ? "right-2 md:-left-4" : "-right-2 md:-right-4"} text-text-primary/5 pointer-events-none text-6xl font-black select-none md:text-9xl`}
                    >
                      {item.step}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <MagneticButton>
            <Link
              href="/contact"
              className="group bg-accent inline-flex items-center gap-4 rounded-full px-10 py-5 font-black tracking-widest text-black uppercase shadow-xl transition-all duration-300 hover:bg-white hover:text-black hover:shadow-white/10"
            >
              <span>Book a 30-Min Call</span>
              <div className="group-hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors">
                <ArrowRight size={18} />
              </div>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
