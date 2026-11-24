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
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

import MagneticButton from "@/components/ui/MagneticButton";
import Tag from "../ui/Tag";
import BookACall from "../ui/BookACall";

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description:
      "We dive into your brand, goals, and audience to align creativity with strategy from the start.",
    icon: Search,
  },
  {
    step: "02",
    title: "Concept & Strategy",
    subtitle: "Crafting the Blueprint",
    description:
      "Brainstorming and planning a roadmap that blends bold ideas with data-driven strategy.",
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Design & Build",
    subtitle: "Turning Ideas Into Experiences",
    description:
      "Bringing concepts to life through sleek design, smooth development, and innovative solutions.",
    icon: Palette,
  },
  {
    step: "04",
    title: "Launch & Amplify",
    subtitle: "Making It Seen, Making It Heard",
    description:
      "Ensuring your brand shines through campaigns, storytelling, and strategic exposure.",
    icon: Rocket,
  },
  {
    step: "05",
    title: "Evolve & Grow",
    subtitle: "Continuous Optimization",
    description:
      "Tracking, refining, and adapting to trends to keep your brand growing.",
    icon: TrendingUp,
  },
];

// Distance from the row edge to the centre of the first/last column (grid gap is 20px).
const EDGE = "calc((100% - 80px) / 10)";

function StepCard({ item, index, compact = false, showIcon = true }) {
  return (
    <div className="process-card border-border/50 bg-bg-card group-data-[active=true]/step:border-accent/50 group-data-[active=true]/step:shadow-accent/10 relative h-full overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-500 group-data-[active=true]/step:shadow-xl hover:-translate-y-1">
      <div className="mb-5 flex items-center justify-between">
        {showIcon && (
          <div className="bg-accent/10 text-accent group-data-[active=true]/step:bg-accent group-data-[active=true]/step:text-bg-primary rounded-2xl p-3 transition-colors duration-500">
            <item.icon size={22} />
          </div>
        )}
        <span className="text-text-subtle font-big group-data-[active=true]/step:text-accent text-3xl font-black transition-colors duration-500">
          {item.step}
        </span>
      </div>
      <span className="text-accent text-[10px] font-black tracking-[0.2em] uppercase">
        {item.title}
      </span>
      <h3
        className={`text-text-primary mt-1 mb-3 leading-[0.95] tracking-tight ${
          compact ? "text-2xl" : "text-2xl xl:text-[1.7rem]"
        }`}
      >
        {item.subtitle}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {item.description}
      </p>
      <span className="sr-only">Step {index + 1} of 5</span>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  const rowRef = useRef(null);
  const fillRef = useRef(null);
  const listRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const setActive = (selector, progress) => {
        const steps = containerRef.current?.querySelectorAll(selector);
        steps?.forEach((el, i) => {
          const at = i / (steps.length - 1);
          el.dataset.active = progress >= at - 0.02 ? "true" : "false";
        });
      };

      if (reduce) {
        gsap.set(fillRef.current, { width: "100%" });
        gsap.set(lineRef.current, { scaleY: 1 });
        setActive(".step-desktop", 1);
        setActive(".step-desktop-node", 1);
        setActive(".step-mobile", 1);
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.from(".step-desktop", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
        });
        gsap.fromTo(
          fillRef.current,
          { width: "0%" },
          {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
              onUpdate: (self) => {
                setActive(".step-desktop", self.progress);
                setActive(".step-desktop-node", self.progress);
              },
            },
          }
        );
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.6,
              onUpdate: (self) => setActive(".step-mobile", self.progress),
            },
          }
        );
        gsap.utils.toArray(".step-mobile").forEach((el) => {
          gsap.from(el, {
            x: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary border-border/20 overflow-hidden border-t py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-8">
              <Tag>Our Process</Tag>
            </div>
            <h2 className="text-text-primary text-4xl leading-[0.95] tracking-tighter md:text-6xl lg:text-7xl">
              Creative. Strategic. <br />
              <span className="text-accent">Always Unique.</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-md text-base leading-relaxed md:text-lg">
            From initial idea to final post, we handle every step to ensure your
            content not only looks great but also delivers results.
          </p>
        </div>

        {/* Desktop: five steps in a row with a timeline that fills on scroll */}
        <div ref={rowRef} className="relative hidden lg:block">
          <div className="relative mb-8" aria-hidden="true">
            <div
              className="bg-border/60 absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full"
              style={{ left: EDGE, right: EDGE }}
            />
            <div
              className="absolute top-1/2 h-[2px] -translate-y-1/2"
              style={{ left: EDGE, right: EDGE }}
            >
              <div
                ref={fillRef}
                className="bg-accent relative h-full w-0 rounded-full shadow-[0_0_12px_var(--color-accent)]"
              >
                <span className="bg-accent absolute top-1/2 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_18px_4px_var(--color-accent)]" />
              </div>
            </div>
            <div className="relative grid grid-cols-5 gap-5">
              {processSteps.map((item) => (
                <div key={item.step} className="flex justify-center">
                  <div
                    data-active="false"
                    className="step-desktop-node bg-bg-primary border-border text-text-muted data-[active=true]:bg-accent data-[active=true]:border-accent data-[active=true]:text-bg-primary flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 data-[active=true]:scale-110 data-[active=true]:shadow-[0_0_24px_var(--color-accent)]"
                  >
                    <item.icon size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-5">
            {processSteps.map((item, index) => (
              <div
                key={item.step}
                data-active="false"
                className="step-desktop group/step"
              >
                <StepCard item={item} index={index} showIcon={false} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: compact vertical list */}
        <div ref={listRef} className="relative lg:hidden">
          <div className="bg-border/40 absolute top-2 bottom-2 left-[11px] w-[2px]" />
          <div
            ref={lineRef}
            className="bg-accent absolute top-2 bottom-2 left-[11px] w-[2px] origin-top scale-y-0"
          />
          <div className="space-y-6">
            {processSteps.map((item, index) => (
              <div
                key={item.step}
                data-active="false"
                className="step-mobile group/step relative pl-10"
              >
                <div className="bg-bg-primary border-border group-data-[active=true]/step:border-accent absolute top-7 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-500">
                  <span className="bg-accent h-2 w-2 scale-0 rounded-full transition-transform duration-500 group-data-[active=true]/step:scale-100" />
                </div>
                <StepCard item={item} index={index} compact />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <BookACall>
            <MagneticButton>
              <div className="group bg-accent text-bg-primary inline-flex items-center gap-4 rounded-full px-5 py-2.5 font-black tracking-widest uppercase shadow-xl transition-all duration-300 hover:bg-white hover:text-black hover:shadow-white/10">
                <span>Book a Call</span>
                <div className="group-hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors">
                  <ArrowRight size={18} />
                </div>
              </div>
            </MagneticButton>
          </BookACall>
        </div>
      </div>
    </section>
  );
}
