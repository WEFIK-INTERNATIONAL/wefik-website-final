"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Monitor,
  Smartphone,
  Code2,
  Layers,
  Zap,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const expertiseData = [
  {
    title: "Web Design",
    description:
      "From pixel-perfect layouts to intuitive navigation, our websites don't just look good — they work hard for your brand",
    points: [
      "Fully responsive across devices",
      "Optimized for speed and SEO",
      "Custom Tailored Design",
    ],
    icon: Monitor,
    variant: "neutral",
    link: "/expertise#web-design",
  },
  {
    title: "Digital Product Design",
    description:
      "From SaaS platforms to mobile apps, we design digital products that are beautiful, functional, and future-ready",
    points: [
      "Mobile & web app design",
      "Dashboard & data visualization",
      "Cross-platform consistency",
    ],
    icon: Smartphone,
    variant: "vibrant",
    link: "/expertise#digital-product-design",
  },
  {
    title: "Development",
    description:
      "We turn creative visions into functional, scalable platforms — built to perform and grow with your business",
    points: [
      "Shopify, WordPress, & custom builds",
      "Seamless Integrations",
      "Fast, secure, and maintainable code",
    ],
    icon: Code2,
    variant: "neutral",
    link: "/expertise#development",
  },
];

const ExpertiseCard = ({ item, setCardRef, index }) => {
  const isVibrant = item.variant === "vibrant";

  return (
    <div
      ref={setCardRef}
      className={`absolute inset-0 flex origin-top flex-col justify-center overflow-hidden rounded-4xl border p-6 transition-colors duration-500 md:p-12 ${
        isVibrant
          ? "bg-accent border-accent/20 text-black shadow-2xl"
          : "bg-bg-card text-text-primary border-border/80 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none"
      }`}
      style={{ zIndex: index }}
    >
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-12">
        <div className="flex h-full flex-col justify-between md:col-span-5">
          <div>
            <div
              className={`mb-6 inline-flex rounded-2xl p-3 md:p-4 ${isVibrant ? "bg-black/5" : "bg-accent/10"}`}
            >
              <item.icon
                size={36}
                className={isVibrant ? "text-black" : "text-accent"}
                strokeWidth={1.5}
              />
            </div>
            <h3
              className={`text-2xl leading-[1.05] font-black tracking-tighter uppercase sm:text-3xl md:text-4xl lg:text-5xl ${
                isVibrant ? "text-black" : "text-text-primary"
              }`}
            >
              {item.title}
            </h3>
          </div>

          <div className="mt-8 hidden md:block">
            <Link
              href={item.link}
              className={`inline-flex items-center gap-4 rounded-full px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                isVibrant
                  ? "bg-black text-white hover:bg-black/80"
                  : "bg-accent hover:bg-accent-hover text-black hover:text-white"
              }`}
            >
              <span>Explore Service</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t border-black/10 pt-6 md:col-span-7 md:border-t-0 md:border-l md:pt-0 md:pl-10 dark:border-white/10">
          <p
            className={`mb-6 text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl ${
              isVibrant ? "font-medium text-black/80" : "text-text-muted"
            }`}
          >
            {item.description}
          </p>

          <ul className="space-y-3 sm:space-y-4">
            {item.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 sm:items-center">
                <div
                  className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:mt-0 sm:h-8 sm:w-8 ${isVibrant ? "bg-black/10" : "bg-accent/10"}`}
                >
                  <CheckCircle2
                    size={14}
                    className={isVibrant ? "text-black" : "text-accent"}
                    strokeWidth={2.5}
                  />
                </div>
                <span
                  className={`text-sm font-bold tracking-wider uppercase sm:text-base ${
                    isVibrant ? "text-black/90" : "text-text-primary"
                  }`}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 block md:hidden">
            <Link
              href={item.link}
              className={`inline-flex w-full items-center justify-between rounded-full px-6 py-4 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                isVibrant ? "bg-black text-white" : "bg-accent text-black"
              }`}
            >
              <span>Explore Service</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Expertise() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean);

      // Create a master timeline that scrubs through our cards
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Pin when section reaches top of screen
          end: `+=${window.innerHeight * 1.5}`, // Shorter scroll distance for all cards
          pin: true,
          scrub: true, // Remove lag smoothing for instant snappy feeling
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        // Set initial state for cards sliding in
        if (i > 0) {
          gsap.set(card, { y: window.innerHeight, zIndex: i });
        }

        if (i === 0) return;

        const startTime = i - 1; // Transitions occur sequentially

        // Animate the current card sliding up over it
        tl.to(
          card,
          {
            y: 0,
            duration: 1,
            ease: "none",
          },
          startTime // Starts exactly as user scrolls into this card's segment
        );

        // Animate the previous card shrinking and fading into the background
        // but ONLY in the second half of the slide when the new card is covering it
        tl.to(
          cards[i - 1],
          {
            scale: 0.9,
            opacity: 0.4,
            y: -40,
            duration: 0.5,
            ease: "power2.inOut",
          },
          startTime + 0.5 // Starts exactly halfway through the next card's slide!
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-bg-primary relative flex h-screen w-full flex-col justify-center overflow-hidden"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 py-20 pb-10">
        <div className="mb-4 shrink-0 sm:mb-8 md:mb-12">
          <div className="mb-4 flex items-center gap-4">
            <div className="bg-accent/20 h-px w-12 sm:w-16" />
            <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase sm:text-xs">
              What We Do
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-text-primary text-3xl leading-[0.95] font-black tracking-tighter uppercase sm:text-4xl md:text-5xl lg:text-6xl">
              Elevating Brands <br className="hidden sm:block" />
              Through <span className="text-accent">Design</span>
            </h2>
            <Link
              href="/expertise"
              className="text-text-muted hover:text-accent group flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors sm:mb-2 sm:text-sm"
            >
              <span>View All</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* This relative grid acts as the strict container for all absolute cards */}
        <div className="relative w-full grow">
          {expertiseData.map((item, index) => (
            <ExpertiseCard
              key={item.title}
              item={item}
              index={index}
              setCardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
