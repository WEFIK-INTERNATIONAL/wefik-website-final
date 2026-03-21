"use client";

import React, { useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import {
  Monitor,
  Smartphone,
  Code2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "../ui/Tag";

const expertiseData = [
  {
    title: "Web Design",
    description:
      "Crafting digital experiences that bridge the gap between aesthetics and functionality. We create websites that leave a lasting impression.",
    points: [
      "Bespoke Visual Identity",
      "Conversion-Focused UX/UI",
      "High-Performance Architecture",
    ],
    icon: Monitor,
    variant: "neutral",
    link: "/expertise#web-design",
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    title: "Digital Products",
    description:
      "From complex SaaS platforms to intuitive mobile apps, we design products that solve real problems and scale with your user base.",
    points: [
      "User-Centric Research",
      "Rapid Prototyping",
      "Scalable Design Systems",
    ],
    icon: Smartphone,
    variant: "vibrant",
    link: "/expertise#digital-product-design",
    gradient: "from-accent/20 to-accent-bright/10",
  },
  {
    title: "Development",
    description:
      "Building robust, future-proof solutions using cutting-edge technology. Our code is as clean as our designs.",
    points: [
      "Next.js & React Mastery",
      "Shopify & Headless Solutions",
      "Seamless API Integrations",
    ],
    icon: Code2,
    variant: "neutral",
    link: "/expertise#development",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
];

const ExpertiseCard = ({ item, setCardRef, index }) => {
  const isVibrant = item.variant === "vibrant";
  const neutralText = isVibrant ? "text-black" : "text-text-primary";
  const neutralMuted = isVibrant ? "text-black/70" : "text-text-muted";
  const neutralBg = isVibrant ? "bg-black/10" : "bg-accent/10";
  const neutralIcon = isVibrant ? "text-black" : "text-accent";
  const neutralBorder = isVibrant ? "border-black/10" : "border-border";

  return (
    <div
      ref={setCardRef}
      className={`absolute inset-0 overflow-hidden border ${
        isVibrant
          ? "bg-accent-bright border-white/20 shadow-[0_40px_100px_-20px_rgba(163,230,53,0.4)]"
          : "bg-bg-card border-border shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)]"
      }`}
      style={{ borderRadius: "clamp(1rem, 2.5vw, 2rem)" }}
    >
      <div
        className={`pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-linear-to-br opacity-20 blur-3xl ${item.gradient}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.035] mix-blend-overlay" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:hidden">
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex shrink-0 items-center justify-center rounded-xl p-2.5 ${neutralBg}`}
          >
            <item.icon size={22} className={neutralIcon} strokeWidth={1.5} />
          </div>
          <span
            className={`font-accent text-[0.65rem] font-bold tracking-[0.3em] uppercase opacity-60 sm:text-[0.7rem] ${neutralMuted}`}
          >
            Service 0{index + 1}
          </span>
        </div>

        <div
          className={`font-big leading-[0.88] font-black tracking-tight uppercase ${neutralText}`}
          style={{ fontSize: "clamp(2.8rem, 11vw, 4.5rem)" }}
        >
          {item.title}
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <p
            className={`font-body leading-snug ${isVibrant ? "text-black/80" : "text-text-muted"}`}
            style={{ fontSize: "clamp(0.875rem, 2.4vw, 1rem)" }}
          >
            {item.description}
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {item.points.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${neutralBg}`}
                >
                  <CheckCircle2
                    size={10}
                    className={neutralIcon}
                    strokeWidth={2.5}
                  />
                </div>
                <span
                  className={`font-accent leading-tight font-semibold tracking-wider uppercase ${neutralText}`}
                  style={{ fontSize: "clamp(0.6rem, 1.6vw, 0.72rem)" }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden h-full lg:grid lg:grid-cols-[1fr_1.25fr] lg:p-12 xl:p-16 2xl:p-20">
        <div
          className={`flex flex-col justify-between border-r pr-10 xl:pr-14 ${neutralBorder}`}
        >
          <div
            className={`inline-flex w-fit items-center justify-center rounded-2xl p-4 xl:p-5 ${neutralBg}`}
          >
            <item.icon
              className={neutralIcon}
              strokeWidth={1.5}
              style={{
                width: "clamp(28px, 2.5vw, 44px)",
                height: "clamp(28px, 2.5vw, 44px)",
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <span
              className={`font-accent font-bold tracking-[0.4em] uppercase opacity-60 ${neutralMuted}`}
              style={{ fontSize: "clamp(0.65rem, 0.7vw, 0.75rem)" }}
            >
              Service 0{index + 1}
            </span>
            <div
              className={`font-big leading-none font-black tracking-tight uppercase ${neutralText}`}
              style={{ fontSize: "clamp(2.8rem, 4.5vw, 5.5rem)" }}
            >
              {item.title}
            </div>
          </div>

          <TransitionLink
            href={item.link}
            className={`group inline-flex w-fit items-center gap-4 rounded-full px-7 py-4 text-[0.7rem] font-bold tracking-[0.25em] uppercase transition-all duration-300 hover:gap-6 ${
              isVibrant
                ? "bg-black text-white hover:bg-black/85"
                : "bg-accent hover:bg-accent-hover text-white"
            }`}
          >
            <span>Explore</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </TransitionLink>
        </div>

        <div className="flex flex-col justify-center gap-6 pl-10 xl:pl-14">
          <p
            className={`font-body leading-snug ${isVibrant ? "text-black/85" : "text-text-muted"}`}
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.5rem)" }}
          >
            {item.description}
          </p>

          <div className="flex flex-col gap-4">
            {item.points.map((point, idx) => (
              <div key={idx} className="group flex items-center gap-3">
                <div
                  className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${neutralBg}`}
                  style={{
                    width: "clamp(26px, 2vw, 34px)",
                    height: "clamp(26px, 2vw, 34px)",
                  }}
                >
                  <CheckCircle2
                    className={neutralIcon}
                    strokeWidth={2}
                    style={{
                      width: "clamp(12px, 1vw, 15px)",
                      height: "clamp(12px, 1vw, 15px)",
                    }}
                  />
                </div>
                <span
                  className={`font-accent font-semibold tracking-wider uppercase ${neutralText}`}
                  style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
                >
                  {point}
                </span>
              </div>
            ))}
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
      if (!cards.length) return;

      gsap.set(cards[0], { yPercent: 0, scale: 1 });
      cards.slice(1).forEach((card) => {
        gsap.set(card, { yPercent: 110, scale: 1 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const prev = cards[i - 1];
        const pos = i - 1;
        tl.to(card, { yPercent: 0, ease: "none", duration: 1 }, pos);
        tl.to(prev, { scale: 0.94, ease: "none", duration: 0.8 }, pos + 0.2);
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section className="bg-bg-primary w-full px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4 md:space-y-6">
            <Tag>Capabilities</Tag>
            <h2 className="text-text-primary text-4xl leading-[0.9] font-black tracking-tighter uppercase sm:text-6xl md:text-8xl lg:text-[10rem]">
              Defining the <br />
              Future of{" "}
              <span className="text-accent font-accent font-light lowercase italic">
                design
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="text-text-muted font-accent max-w-xs text-xs leading-relaxed md:text-sm">
              We merge creativity with technical precision to build digital
              products that move the needle.
            </p>
            <TransitionLink
              href="/expertise"
              className="text-text-muted hover:text-accent group flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-all md:text-xs"
            >
              <span>View Services</span>
              <div className="border-border group-hover:border-accent flex h-9 w-9 items-center justify-center rounded-full border transition-colors">
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </TransitionLink>
          </div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className="bg-bg-primary relative h-screen w-full overflow-hidden"
      >
        <div
          className="absolute inset-x-3 overflow-hidden md:inset-x-[8vw] lg:inset-x-[12vw]"
          style={{
            top: "clamp(3rem, 12vh, 8rem)",
            bottom: "clamp(3rem, 12vh, 8rem)",
          }}
        >
          {expertiseData.map((item, index) => (
            <ExpertiseCard
              key={item.title}
              item={item}
              index={index}
              setCardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
