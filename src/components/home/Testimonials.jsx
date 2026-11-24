"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import Tag from "../ui/Tag";
import usePauseWhenHidden from "@/hooks/usePauseWhenHidden";

const testimonials = [
  {
    name: "SOUVIK DEB",
    role: "Founder, Niva Homeo",
    content:
      "Wefik gave Niva Homeo a website that actually feels like us — clean, warm, trustworthy. Orders picked up within weeks. Genuinely happy with the outcome!",
    avatar: "/testimonials/SouvikDev.jpg",
    rating: 5,
  },
  {
    name: "R. JAYABALAN",
    role: "R. Jayabalan, Founder",
    content:
      "Professional team. They understood the gravity a law firm's website must carry. The result is dignified, precise, and client-ready. Highly recommend Wefik.",
    avatar: "/testimonials/jayabalan.jpg",
    rating: 5,
  },
  {
    name: "Sourish Mitra",
    role: "ADSOC 6.0",
    content:
      "Honestly wasn't sure what to expect, but Wefik delivered way beyond our brief. Site looks sharp, loads fast, and our members love it. Great work overall!",
    avatar: "/testimonials/sourish.png",
    rating: 5,
  },
  {
    name: "ALUN RAFIQUE",
    role: "CEO MARKETDOJO",
    content:
      "Solid execution, responsive team, no drama. Wefik handled the complexity of our platform well. Would confidently work with them again on future builds.",
    avatar: "/testimonials/alan.jpg",
    rating: 5,
  },
  {
    name: "Supratik Sahis",
    role: "Photographer",
    content:
      "Building StoryFinder needed someone who got the vision. Wefik did. Clean UI, smooth UX — it feels alive. Proud of what we shipped together. Respect!",
    avatar: "/testimonials/Supratik.jpg",
    rating: 5,
  },
];

const TestimonialCard = ({ item, hidden }) => (
  <div
    aria-hidden={hidden || undefined}
    className="bg-bg-card border-border/50 hover:border-accent/30 group hover:shadow-accent/5 mx-4 w-[350px] shrink-0 rounded-4xl border p-8 shadow-sm transition-all duration-500 md:w-[450px]"
  >
    <div className="mb-6 flex items-center gap-4">
      <div className="border-accent/20 bg-accent/5 relative h-12 w-12 overflow-hidden rounded-full border">
        <Image
          src={item.avatar}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="text-text-primary mb-1 text-base leading-none font-bold tracking-tight uppercase">
          {item.name}
        </h4>
        <p className="text-text-muted text-[10px] tracking-[0.2em] uppercase">
          {item.role}
        </p>
      </div>
    </div>
    <div className="mb-4 flex gap-1">
      {[...Array(item.rating)].map((_, i) => (
        <Star key={i} size={14} className="fill-accent text-accent" />
      ))}
    </div>
    <p className="text-text-muted text-sm leading-relaxed italic md:text-lg">
      &ldquo;{item.content}&rdquo;
    </p>
  </div>
);

export default function Testimonials() {
  const containerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const tween1Ref = useRef(null);

  useGSAP(
    () => {
      const m1 = marquee1Ref.current;
      const m1Width = m1.scrollWidth / 2;
      tween1Ref.current = gsap.to(m1, {
        x: `-=${m1Width}`,
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tween1Ref.current.pause();
      }
    },
    { scope: containerRef }
  );

  usePauseWhenHidden(containerRef, () => [tween1Ref.current]);

  const handleMouseEnter = () => {
    tween1Ref.current?.timeScale(0);
  };

  const handleMouseLeave = () => {
    tween1Ref.current?.timeScale(1);
  };

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary border-border/20 overflow-hidden border-t py-24 md:py-32"
    >
      <div className="mx-auto mb-16 flex max-w-7xl flex-col gap-10 px-6 md:mb-24 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-10">
            <Tag>Testimonials</Tag>
          </div>
          <h2 className="text-text-primary text-4xl leading-tight font-black tracking-tighter wrap-break-word hyphens-auto whitespace-normal uppercase md:text-6xl lg:text-7xl">
            Client <br />
            <span className="text-accent">Stories.</span>
          </h2>
        </div>

        <div className="border-border/50 bg-bg-card flex items-center gap-5 rounded-3xl border p-5 md:gap-6 md:p-6">
          <div className="flex -space-x-3">
            {testimonials.slice(0, 4).map((t) => (
              <Image
                key={t.name}
                src={t.avatar}
                alt=""
                width={44}
                height={44}
                className="border-bg-card h-11 w-11 rounded-full border-2 object-cover"
              />
            ))}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-big text-text-primary text-4xl leading-none font-black md:text-5xl">
                4.9
              </span>
              <span className="text-text-muted text-sm font-bold">/ 5</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={13}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-text-muted ml-2 text-xs font-medium">
                from 30+ clients
              </span>
            </div>
          </div>
        </div>
      </div>

      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex overflow-hidden">
          {/* List is rendered twice so the loop is seamless; only one row is shown. */}
          <div ref={marquee1Ref} className="flex flex-nowrap">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <TestimonialCard
                key={`m1-${idx}`}
                item={item}
                hidden={idx >= testimonials.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
