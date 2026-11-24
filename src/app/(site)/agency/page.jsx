"use client";

import TransitionLink from "@/components/ui/TransitionLink";
import { useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  PenTool,
  Zap,
  Handshake,
  RefreshCw,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import ContactCTA from "@/components/ui/ContactCTA";
import usePauseWhenHidden from "@/hooks/usePauseWhenHidden";
import Tag from "@/components/ui/Tag";

const stats = [
  { value: 3, suffix: "+", label: "Years in the game" },
  { value: 60, suffix: "+", label: "Projects delivered" },
  { value: 40, suffix: "+", label: "Happy clients" },
  { value: 4, suffix: "", label: "Core team members" },
];

const values = [
  {
    title: "Craft over convenience",
    body: "We never take shortcuts. Every pixel, every line of code, every campaign beat is considered and deliberate.",
    icon: PenTool,
  },
  {
    title: "Bold by design",
    body: "Safe is invisible. We push creative boundaries to make brands impossible to ignore.",
    icon: Zap,
  },
  {
    title: "Partners, not vendors",
    body: "Your goals become ours. We invest in outcomes, not just deliverables.",
    icon: Handshake,
  },
  {
    title: "Always evolving",
    body: "Digital never stands still. Neither do we. We track, refine, and adapt relentlessly.",
    icon: RefreshCw,
  },
];

const team = [
  { name: "Sk. Shahinur Islam", role: "Founder", since: "2022" },
  { name: "Sandip Samanta", role: "Co-Founder", since: "2022" },
  { name: "Supratik Sahis", role: "Head Designer", since: "2023" },
  { name: "Parthiv Sarker", role: "Lead Developer", since: "2023" },
];

const milestones = [
  {
    year: "2022",
    title: "Founded in Kolkata",
    body: "Wefik starts with two founders and one obsession: make things that actually work.",
  },
  {
    year: "2023",
    title: "The team grows",
    body: "A head designer and a lead developer join, and the studio takes on brand, product and engineering work end to end.",
  },
  {
    year: "Today",
    title: "Websites, apps & brands",
    body: "We design and build across web, product, branding and campaigns for clients across India.",
  },
];

const capabilities = [
  "Web Design",
  "Web Development",
  "Brand Identity",
  "Digital Products",
  "Motion Design",
  "Content & Campaigns",
  "UI/UX Research",
  "Shopify & WordPress",
];

const initials = (name) =>
  name
    .replace(/^Sk\.\s*/, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function Ribbon({ reverse }) {
  const items = [...capabilities, ...capabilities, ...capabilities];
  return (reverse ? [...items].reverse() : items).map((cap, i) => (
    <span key={i} className="flex items-center">
      <span className="font-big px-8 text-2xl font-black tracking-tight uppercase md:text-3xl">
        {cap}
      </span>
      <span aria-hidden="true" className="text-lg opacity-60">
        ✦
      </span>
    </span>
  ));
}

export default function AgencyPage() {
  const pageRef = useRef(null);
  const marqueeRef = useRef(null);
  const timelineRef = useRef(null);

  // Hero entrance + scroll reveals + stat counters + timeline line
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(".hero-word, .reveal", { clearProps: "all", opacity: 1 });
        document.querySelectorAll(".stat-number").forEach((el) => {
          el.textContent = el.dataset.target;
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.2 })
        .fromTo(
          ".hero-word",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.07 }
        )
        .fromTo(
          ".hero-side > *",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
          "-=0.7"
        );

      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      gsap.fromTo(
        ".banner-img",
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".banner",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      document.querySelectorAll(".stat-number").forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const proxy = { val: 0 };
        el.textContent = "0";
        gsap.to(proxy, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate() {
            el.textContent = Math.round(proxy.val);
          },
        });
      });

      if (timelineRef.current) {
        gsap.fromTo(
          ".timeline-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }
    },
    { scope: pageRef }
  );

  // Two crossing capability ribbons (time-based loops, paused off screen)
  const ribbonTweens = useRef([]);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const inner1 = marqueeRef.current?.querySelector(".marquee-inner-1");
      const inner2 = marqueeRef.current?.querySelector(".marquee-inner-2");
      if (!inner1 || !inner2) return;

      const half1 = inner1.scrollWidth / 3;
      const half2 = inner2.scrollWidth / 3;
      ribbonTweens.current = [
        gsap.fromTo(
          inner1,
          { x: 0 },
          { x: -half1, duration: 40, ease: "none", repeat: -1 }
        ),
        gsap.fromTo(
          inner2,
          { x: -half2 },
          { x: 0, duration: 40, ease: "none", repeat: -1 }
        ),
      ];
    },
    { scope: marqueeRef }
  );
  usePauseWhenHidden(marqueeRef, () => ribbonTweens.current);

  return (
    <main
      ref={pageRef}
      className="bg-bg-primary text-text-primary overflow-x-hidden"
    >
      {/* ───────── Hero ───────── */}
      <section className="relative px-6 pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="mb-7">
              <Tag>About Wefik</Tag>
            </div>
            <h1 className="text-text-primary text-6xl leading-[0.88] tracking-tighter md:text-8xl xl:text-9xl">
              {[["We", "build"], ["things", "that"], ["matter."]].map(
                (line, li) => (
                  <div key={li} className="block">
                    {line.map((w) => (
                      <span
                        key={w}
                        className="mr-[0.22em] inline-block overflow-hidden align-top"
                      >
                        <span
                          className={`hero-word inline-block ${
                            w === "matter." ? "text-accent" : ""
                          }`}
                        >
                          {w}
                        </span>
                      </span>
                    ))}
                  </div>
                )
              )}
            </h1>
          </div>

          <div className="hero-side flex flex-col gap-7 lg:pb-3">
            <p className="text-text-muted max-w-md text-base leading-relaxed md:text-lg">
              Culture-driven, creative and competitive. We craft websites,
              products and brands that make businesses impossible to ignore.
            </p>
            <div className="text-text-muted flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-accent" /> Kolkata, India
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays size={15} className="text-accent" /> Est. 2022
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TransitionLink
                href="/contact"
                className="group bg-accent text-bg-primary inline-flex h-14 items-center justify-between gap-5 rounded-full pr-2 pl-7 text-[15px] font-bold shadow-[0_12px_40px_-14px_var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Start a project
                <span className="bg-bg-primary text-accent flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight size={18} />
                </span>
              </TransitionLink>
              <TransitionLink
                href="/works"
                className="group border-text-primary/20 text-text-primary hover:border-accent hover:text-accent inline-flex h-14 items-center justify-center gap-2 rounded-full border px-7 text-[15px] font-semibold transition-colors duration-300"
              >
                See our work
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Image band with stats ───────── */}
      <section className="px-4 md:px-6">
        <div className="banner reveal relative mx-auto h-[62vh] min-h-[420px] max-w-7xl overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          <Image
            src="/images/agency/story_banner.png"
            alt="The Wefik studio vision"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="banner-img object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px p-3 md:grid-cols-4 md:p-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-black/35 px-5 py-5 backdrop-blur-md md:px-6 md:py-6"
              >
                <div className="font-big flex items-baseline text-4xl leading-none font-black text-white md:text-6xl">
                  <span
                    className="stat-number tabular-nums"
                    data-target={s.value}
                  >
                    {s.value}
                  </span>
                  <span className="text-accent-bright">{s.suffix}</span>
                </div>
                <div className="mt-2 text-[11px] font-semibold tracking-[0.15em] text-white/70 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Capability ribbons ───────── */}
      <div
        ref={marqueeRef}
        aria-label="Our capabilities"
        className="relative h-[220px] overflow-hidden md:h-[260px]"
      >
        <div
          className="bg-bg-card text-text-primary border-text-primary/10 absolute top-1/2 left-[-25vw] w-[150vw] border-y py-4"
          style={{ transform: "translateY(calc(-50% - 40px)) rotate(-6deg)" }}
        >
          <div className="marquee-inner-1 flex w-max items-center whitespace-nowrap will-change-transform">
            <Ribbon />
          </div>
        </div>
        <div
          className="bg-accent text-bg-primary absolute top-1/2 left-[-25vw] w-[150vw] py-4"
          style={{ transform: "translateY(calc(-50% + 40px)) rotate(6deg)" }}
        >
          <div className="marquee-inner-2 flex w-max items-center whitespace-nowrap will-change-transform">
            <Ribbon reverse />
          </div>
        </div>
      </div>

      {/* ───────── Story + timeline ───────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="reveal mb-6">
              <Tag>Our Story</Tag>
            </div>
            <h2 className="reveal text-text-primary text-5xl leading-[0.92] tracking-tight md:text-7xl">
              Culture-driven.
              <br />
              Creative.
              <br />
              <span className="text-accent">Competitive.</span>
            </h2>
            <p className="reveal text-text-muted mt-8 max-w-lg text-base leading-relaxed md:text-lg">
              Wefik was born in Kolkata with a simple obsession: make things
              that actually work. Not just things that look good in a Dribbble
              shot, but experiences that solve real problems and move real
              needles.
            </p>
            <p className="reveal text-text-muted mt-5 max-w-lg text-base leading-relaxed md:text-lg">
              We work across websites, apps, branding and digital campaigns,
              between timeless craft and cultural zeitgeist.
            </p>
          </div>

          <div ref={timelineRef} className="relative pl-10 md:pl-12">
            <div className="bg-text-primary/10 absolute top-2 bottom-2 left-[11px] w-[2px]" />
            <div className="timeline-fill bg-accent absolute top-2 bottom-2 left-[11px] w-[2px] origin-top" />
            <div className="flex flex-col gap-10 md:gap-14">
              {milestones.map((m) => (
                <div key={m.year} className="reveal relative">
                  <span className="bg-bg-primary border-accent absolute top-1.5 -left-10 flex h-6 w-6 items-center justify-center rounded-full border-2 md:-left-12">
                    <span className="bg-accent h-2 w-2 rounded-full" />
                  </span>
                  <div className="border-text-primary/10 bg-bg-card rounded-3xl border p-6 md:p-8">
                    <span className="text-accent font-big text-3xl font-black md:text-4xl">
                      {m.year}
                    </span>
                    <h3 className="text-text-primary mt-2 text-2xl leading-tight tracking-tight md:text-3xl">
                      {m.title}
                    </h3>
                    <p className="text-text-muted mt-3 text-sm leading-relaxed md:text-base">
                      {m.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Values ───────── */}
      <section className="border-text-primary/10 border-t px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="reveal mb-6">
                <Tag>What We Stand For</Tag>
              </div>
              <h2 className="reveal text-text-primary text-5xl leading-[0.92] tracking-tight md:text-7xl">
                Our core <span className="text-accent">values.</span>
              </h2>
            </div>
            <p className="reveal text-text-muted max-w-sm text-base leading-relaxed">
              Four principles that shape how we work with clients and with each
              other.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal group border-text-primary/10 bg-bg-card hover:border-accent/50 relative flex flex-col gap-6 rounded-3xl border p-7 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_var(--color-accent)]"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg-primary flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300">
                    <v.icon
                      size={22}
                      className="transition-transform duration-500 group-hover:rotate-12"
                    />
                  </span>
                  <span className="text-text-subtle font-big text-2xl font-black">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-text-primary text-2xl leading-tight tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-text-muted mt-3 text-sm leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Team ───────── */}
      <section className="border-text-primary/10 border-t px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="reveal mb-6">
                <Tag>The Team</Tag>
              </div>
              <h2 className="reveal text-text-primary text-5xl leading-[0.92] tracking-tight md:text-7xl">
                The humans <br className="hidden md:block" />
                behind <span className="text-accent">the work.</span>
              </h2>
            </div>
            <p className="reveal text-text-muted max-w-sm text-base leading-relaxed">
              A small collective of strategists, designers and engineers
              dedicated to solving real problems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div
                key={m.name}
                className="reveal group border-text-primary/10 bg-bg-card hover:border-accent/50 relative overflow-hidden rounded-3xl border p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1"
              >
                <div className="relative mb-10 flex items-start justify-between">
                  <span className="border-accent/40 bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg-primary font-big flex h-20 w-20 items-center justify-center rounded-full border text-3xl font-black transition-colors duration-500">
                    {initials(m.name)}
                  </span>
                  <span className="border-text-primary/10 text-text-subtle rounded-full border px-3 py-1 text-[11px] font-semibold tabular-nums">
                    Since {m.since}
                  </span>
                </div>
                <h3 className="text-text-primary text-3xl leading-[0.95] tracking-tight">
                  {m.name}
                </h3>
                <p className="text-accent mt-2 text-xs font-bold tracking-[0.15em] uppercase">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
