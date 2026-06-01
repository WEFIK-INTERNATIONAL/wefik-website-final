"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";
import Tag from "../ui/Tag";

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
        <div className="mb-10">
          <Tag>Testimonials</Tag>
        </div>
        <h2 className="text-text-primary text-4xl leading-tight font-black tracking-tighter wrap-break-word hyphens-auto whitespace-normal uppercase md:text-6xl lg:text-7xl">
          Client <br />
          <span className="text-accent">Stories.</span>
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
