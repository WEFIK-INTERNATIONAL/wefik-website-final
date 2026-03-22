"use client";

import React, { useRef } from "react";
import { Globe, BookOpen, Zap } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "../ui/Tag";

const CULTURE_DATA = [
  {
    index: "01",
    title: "Remote First",
    icon: Globe,
    body: "Work from anywhere in the world. We believe in talent, not time zones. Our team spans four continents, united by a shared vision.",
  },
  {
    index: "02",
    title: "Growth Mindset",
    icon: BookOpen,
    body: "Continuous learning with dedicated budget for courses and workshops. We grow together, investing in the person, not just the professional.",
  },
  {
    index: "03",
    title: "Bold Ideas",
    icon: Zap,
    body: "Zero hierarchy when it comes to creativity. Your ideas matter here. We value the best answer, regardless of where it comes from.",
  },
];

export default function CultureSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const pinInstanceRef = useRef(null);

  useGSAP(
    () => {
      function applyPin() {
        if (pinInstanceRef.current) {
          pinInstanceRef.current.kill();
          pinInstanceRef.current = null;
        }

        if (window.innerWidth < 1024) return;

        pinInstanceRef.current = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 120px",
          end: "bottom bottom",
          pin: stickyRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      applyPin();

      ScrollTrigger.addEventListener("refresh", applyPin);

      return () => {
        ScrollTrigger.removeEventListener("refresh", applyPin);
        if (pinInstanceRef.current) {
          pinInstanceRef.current.kill();
          pinInstanceRef.current = null;
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="mx-auto max-w-7xl px-6 py-24 lg:py-40"
    >
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
        <div ref={stickyRef} className="lg:max-w-md">
          <Tag>How We Work</Tag>
          <h2 className="font-big text-text-primary mt-4 text-4xl leading-none font-black tracking-tight uppercase md:text-6xl">
            Culture at <span className="text-accent italic">Wefik.</span>
          </h2>
          <p className="font-body text-text-muted mt-8 text-base leading-relaxed lg:text-lg">
            We&apos;re building a environment where creativity thrives,
            boundaries are pushed, and every individual is empowered to do their
            life&apos;s best work.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:max-w-xl">
          {CULTURE_DATA.map((item, i) => (
            <div
              key={i}
              className="group border-border bg-bg-secondary hover:border-accent flex flex-col gap-6 rounded-[2.5rem] border p-8 transition-all duration-500 md:p-12"
            >
              <div className="flex items-center justify-between">
                <div className="bg-accent/10 text-accent flex h-14 w-14 items-center justify-center rounded-2xl">
                  <item.icon size={24} />
                </div>
                <span className="font-big text-text-muted text-5xl font-black opacity-10">
                  {item.index}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-big text-text-primary text-2xl font-black tracking-tight uppercase md:text-3xl">
                  {item.title}
                </h3>
                <p className="font-body text-text-muted text-base leading-relaxed md:text-lg">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
