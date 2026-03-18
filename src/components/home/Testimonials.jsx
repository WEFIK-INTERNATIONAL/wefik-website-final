"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO of LuxStyle",
    content:
      "Wefik transformed our brand identity into something truly remarkable. Their attention to detail and strategic approach is unmatched.",
    avatar: "/testimonials/avatar-1.png",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder of TechFlow",
    content:
      "The process was seamless and the results exceeded our expectations. Our new website has already seen a 40% increase in conversions.",
    avatar: "/testimonials/avatar-2.png",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director at Bloom",
    content:
      "Strategic, creative, and always unique. Wefik is more than a design agency; they are a growth partner.",
    avatar: "/testimonials/avatar-3.png",
    rating: 5,
  },
  {
    name: "David Smith",
    role: "CTO of InnovateX",
    content:
      "They don't just design; they craft experiences that resonate. Highly recommended for any brand looking to level up.",
    avatar: "/testimonials/avatar-4.png",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Product Manager at CloudScale",
    content:
      "Professionalism and creativity at its finest. The team at Wefik handled our SaaS product design with incredible expertise.",
    avatar: "/testimonials/avatar-5.png",
    rating: 5,
  },
];

const TestimonialCard = ({ item }) => (
  <div className="bg-bg-card border-border/50 hover:border-accent/30 group hover:shadow-accent/5 mx-4 w-[350px] shrink-0 rounded-4xl border p-8 shadow-sm transition-all duration-500 md:w-[450px]">
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
  const marquee2Ref = useRef(null);
  const tween1Ref = useRef(null);
  const tween2Ref = useRef(null);

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

      const m2 = marquee2Ref.current;
      const m2Width = m2.scrollWidth / 2;
      gsap.set(m2, { x: -m2Width });
      tween2Ref.current = gsap.to(m2, {
        x: 0,
        ease: "none",
        duration: 45,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => {
    tween1Ref.current?.timeScale(0);
    tween2Ref.current?.timeScale(0);
  };

  const handleMouseLeave = () => {
    tween1Ref.current?.timeScale(1);
    tween2Ref.current?.timeScale(1);
  };

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary border-border/20 overflow-hidden border-t py-24 md:py-32"
    >
      <div className="mx-auto mb-16 max-w-7xl px-6 md:mb-24">
        <div className="mb-6 flex items-center gap-4">
          <div className="bg-accent/20 h-px w-16" />
          <span className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">
            Trusted by Visionaries
          </span>
        </div>
        <h2 className="text-text-primary text-4xl leading-tight font-black tracking-tighter wrap-break-word hyphens-auto whitespace-normal uppercase md:text-6xl lg:text-7xl">
          Client <br />
          <span className="text-accent decoration-accent/20 underline underline-offset-8">
            Stories.
          </span>
        </h2>
      </div>

      <div
        className="flex flex-col gap-6 md:gap-12"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex overflow-hidden">
          <div ref={marquee1Ref} className="flex flex-nowrap">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <TestimonialCard key={`m1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden">
          <div ref={marquee2Ref} className="flex flex-nowrap">
            {[...testimonials, ...testimonials].reverse().map((item, idx) => (
              <TestimonialCard key={`m2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
