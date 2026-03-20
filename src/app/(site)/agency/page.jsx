"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const stats = [
  { value: 3, suffix: "+", label: "Years in the game" },
  { value: 60, suffix: "+", label: "Projects delivered" },
  { value: 40, suffix: "+", label: "Happy clients" },
  { value: 100, suffix: "%", label: "Passion guaranteed" },
];

const values = [
  {
    index: "01",
    title: "Craft Over\nConvenience",
    body: "We never take shortcuts. Every pixel, every line of code, every campaign beat is considered and deliberate.",
  },
  {
    index: "02",
    title: "Bold By\nDesign",
    body: "Safe is invisible. We push creative boundaries to make brands impossible to ignore.",
  },
  {
    index: "03",
    title: "Partners,\nNot Vendors",
    body: "Your goals become ours. We invest in outcomes, not just deliverables.",
  },
  {
    index: "04",
    title: "Always\nEvolving",
    body: "Digital never stands still. Neither do we — we track, refine, and adapt relentlessly.",
  },
];

const team = [
  { name: "Arjun Mehta", role: "Founder & Creative Director", since: "2022" },
  { name: "Priya Sharma", role: "Head of Design", since: "2022" },
  { name: "Rohan Das", role: "Lead Developer", since: "2023" },
  { name: "Sneha Kapoor", role: "Strategy & Branding", since: "2023" },
  { name: "Vikram Bose", role: "Motion & Content", since: "2024" },
  { name: "Ananya Roy", role: "Project Lead", since: "2024" },
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

function SplitWords({ text, className, style }) {
  return (
    <div className={className} style={style} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
}

export default function AgencyPage() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const manifestoRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const locationRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-ghost",
        { yPercent: 8, opacity: 0 },
        { yPercent: 0, opacity: 0.04, duration: 1.4 },
        0
      );
      tl.fromTo(
        ".hero-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );
      tl.fromTo(
        ".hero-line .split-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.06 },
        0.35
      );
      tl.fromTo(
        ".hero-pill",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        0.7
      );
      tl.fromTo(
        ".hero-footer > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        0.85
      );

      gsap.to(".hero-ghost", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      const inner1 = marqueeRef.current?.querySelector(".marquee-inner-1");
      const inner2 = marqueeRef.current?.querySelector(".marquee-inner-2");
      if (!inner1 || !inner2) return;

      let pos1 = 0;
      let pos2 = -(inner2.offsetWidth / 2);
      const speed = 1.2;

      const ticker = gsap.ticker.add(() => {
        pos1 -= speed;
        pos2 += speed;
        if (Math.abs(pos1) >= inner1.offsetWidth / 2) pos1 = 0;
        if (pos2 >= 0) pos2 = -(inner2.offsetWidth / 2);
        gsap.set(inner1, { x: pos1 });
        gsap.set(inner2, { x: pos2 });
      });

      return () => {
        gsap.ticker.remove(ticker);
      };
    },
    { scope: marqueeRef }
  );

  useGSAP(
    () => {
      const st = {
        trigger: manifestoRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        ".manifesto-label",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: st,
        }
      );

      gsap.fromTo(
        ".manifesto-headline .split-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { ...st, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".manifesto-body",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { ...st, start: "top 72%" },
        }
      );
    },
    { scope: manifestoRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".stat-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => {
              document.querySelectorAll(".stat-number").forEach((el) => {
                const target = parseFloat(el.dataset.target);
                const proxy = { val: 0 };
                gsap.to(proxy, {
                  val: target,
                  duration: 1.8,
                  ease: "power2.out",
                  onUpdate() {
                    el.textContent = Math.round(proxy.val);
                  },
                });
              });
            },
          },
        }
      );
    },
    { scope: statsRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".values-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".values-headline .split-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: valuesRef.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".value-card",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: valuesRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".team-header > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".team-row",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".team-list",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: teamRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".location-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: locationRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: locationRef }
  );

  useGSAP(
    () => {
      const panel = ctaRef.current?.querySelector(".cta-panel");
      if (!panel) return;

      gsap.fromTo(
        panel,
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".cta-ghost",
        { xPercent: 10, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".cta-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ctaRef }
  );

  return (
    <main className="bg-bg-primary text-text-primary overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-between px-5 pt-32 pb-10 md:px-10 md:pt-40 lg:px-16 lg:pt-48"
      >
        <div
          className="hero-ghost font-big pointer-events-none absolute inset-x-0 top-16 leading-none font-black tracking-tighter uppercase select-none"
          style={{
            fontSize: "clamp(6rem, 22vw, 22rem)",
            color: "var(--color-text-primary)",
            opacity: 0,
          }}
          aria-hidden
        >
          WEFIK
        </div>

        <div className="hero-meta relative z-10 flex items-center justify-between opacity-0">
          <span className="font-accent text-text-muted text-[10px] font-bold tracking-[0.35em] uppercase">
            Kolkata, India · Est. 2022
          </span>
          <span className="border-border font-accent text-text-muted rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase">
            Digital Agency
          </span>
        </div>

        <div className="relative z-10 mt-10 md:mt-0">
          <SplitWords
            text="We Build"
            className="hero-line font-big text-text-primary leading-none font-black tracking-tight uppercase"
            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          />
          <div className="flex flex-wrap items-end gap-4 md:gap-6">
            <SplitWords
              text="Digital"
              className="hero-line font-big text-text-primary leading-none font-black tracking-tight uppercase"
              style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
            />
            <span className="hero-pill bg-accent-bright font-accent mb-2 inline-block rounded-full px-5 py-2 text-xs font-black tracking-[0.3em] text-black uppercase opacity-0 md:mb-4 md:px-7 md:py-3 md:text-sm">
              that matters
            </span>
          </div>
          <SplitWords
            text="Experiences"
            className="hero-line font-big text-text-primary leading-none font-black tracking-tight uppercase"
            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          />
        </div>

        <div className="hero-footer relative z-10 mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="font-body text-text-muted max-w-sm text-base leading-snug opacity-0 md:text-lg">
            Culture-driven, creative and competitive. We craft digital
            experiences that make brands impossible to ignore.
          </p>
          <Link
            href="/contact"
            className="group bg-accent font-accent hover:bg-accent-hover inline-flex items-center gap-4 rounded-full px-8 py-4 text-[11px] font-bold tracking-[0.25em] text-white uppercase opacity-0 transition-all duration-300 hover:gap-6"
          >
            <span>Start a Project</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <div
        ref={marqueeRef}
        className="relative cursor-default"
        style={{ height: "300px", overflow: "visible" }}
      >
        <div
          className="strip-1 absolute py-5"
          style={{
            top: "50%",
            left: "-50vw",
            width: "200vw",
            transform: "translateY(calc(-50% - 48px)) rotate(-10deg)",
            transformOrigin: "center center",
            zIndex: 1,
            background: "#0f1a05",
            borderTop: "2px solid rgba(163,230,53,0.3)",
            borderBottom: "2px solid rgba(163,230,53,0.3)",
          }}
        >
          <div className="marquee-inner-1 flex w-max items-center whitespace-nowrap will-change-transform">
            {[...capabilities, ...capabilities, ...capabilities].map(
              (cap, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-big px-10 text-2xl font-black tracking-tight text-white uppercase md:text-3xl">
                    {cap}
                  </span>
                  <span
                    style={{
                      color: "#a3e635",
                      fontSize: "1.4rem",
                      paddingInline: "4px",
                    }}
                  >
                    ✦
                  </span>
                </span>
              )
            )}
          </div>
        </div>

        <div
          className="strip-2 absolute py-5"
          style={{
            top: "50%",
            left: "-50vw",
            width: "200vw",
            transform: "translateY(calc(-50% + 48px)) rotate(10deg)",
            transformOrigin: "center center",
            zIndex: 2,
            background: "#a3e635",
            borderTop: "2px solid rgba(15,26,5,0.15)",
            borderBottom: "2px solid rgba(15,26,5,0.15)",
          }}
        >
          <div className="marquee-inner-2 flex w-max items-center whitespace-nowrap will-change-transform">
            {[...capabilities, ...capabilities, ...capabilities]
              .reverse()
              .map((cap, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-big px-10 text-2xl font-black tracking-tight text-black uppercase md:text-3xl">
                    {cap}
                  </span>
                  <span
                    style={{
                      color: "rgba(0,0,0,0.35)",
                      fontSize: "1.4rem",
                      paddingInline: "4px",
                    }}
                  >
                    ◆
                  </span>
                </span>
              ))}
          </div>
        </div>
      </div>

      <section
        ref={manifestoRef}
        className="px-5 py-20 md:px-10 md:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div className="flex flex-row items-start gap-4 lg:flex-col">
              <span className="manifesto-label font-accent text-text-muted text-[9px] font-bold tracking-[0.4em] uppercase opacity-0">
                Our Story
              </span>
              <div className="bg-border h-px flex-1 lg:h-16 lg:w-px lg:flex-none" />
            </div>

            <div className="flex flex-col gap-8">
              <SplitWords
                text="Culture-driven. Creative. Competitive."
                className="manifesto-headline font-big text-text-primary leading-none font-black tracking-tight uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <p className="manifesto-body font-body text-text-muted text-base leading-relaxed opacity-0 md:text-lg">
                  Wefik was born in Kolkata with a simple obsession — make
                  things that actually work. Not just things that look good in a
                  Dribbble shot, but experiences that solve real problems and
                  move real needles.
                </p>
                <p className="manifesto-body font-body text-text-muted text-base leading-relaxed opacity-0 md:text-lg">
                  We work across websites, apps, branding, and digital
                  campaigns. Between timeless craft and cultural zeitgeist. We
                  communicate effectively, quick-wittedly, ambitiously. This is
                  Wefik.
                </p>
              </div>

              <Link
                href="/works"
                className="group font-accent text-accent inline-flex w-fit items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:gap-5"
              >
                <span>See our work</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className="border-border bg-bg-secondary border-y px-5 py-16 md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-px md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-item flex flex-col gap-2 px-6 py-8 opacity-0 md:px-10 md:py-10"
                style={{
                  borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <div
                  className="font-big text-text-primary leading-none font-black"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                >
                  <span className="stat-number" data-target={s.value}>
                    0
                  </span>
                  <span>{s.suffix}</span>
                </div>
                <span className="font-accent text-text-muted text-[9px] font-semibold tracking-[0.3em] uppercase md:text-[10px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={valuesRef}
        className="px-5 py-20 md:px-10 md:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="values-label font-accent text-text-muted text-[9px] font-bold tracking-[0.4em] uppercase opacity-0">
                What We Stand For
              </span>
              <SplitWords
                text="Our Core Values"
                className="values-headline font-big text-text-primary mt-3 leading-none font-black tracking-tight uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={i}
                className={`value-card group border-border hover:border-accent/40 relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 opacity-0 transition-colors duration-500 md:p-8 ${
                  i === 1 ? "bg-accent-bright" : "bg-bg-card"
                }`}
              >
                <span
                  className={`font-big pointer-events-none absolute -top-3 -right-3 leading-none font-black opacity-[0.06] select-none ${
                    i === 1 ? "text-black" : "text-text-primary"
                  }`}
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                  aria-hidden
                >
                  {v.index}
                </span>

                <div className="relative z-10 flex flex-col gap-5">
                  <div
                    className={`font-big leading-tight font-black tracking-tight uppercase ${
                      i === 1 ? "text-black" : "text-text-primary"
                    }`}
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {v.title}
                  </div>
                  <p
                    className={`font-body text-sm leading-relaxed ${i === 1 ? "text-black/75" : "text-text-muted"}`}
                  >
                    {v.body}
                  </p>
                </div>

                <div
                  className={`group-hover:border-accent group-hover:bg-accent relative z-10 mt-8 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                    i === 1 ? "border-black/20" : "border-border"
                  }`}
                >
                  <ArrowUpRight
                    size={14}
                    className={`transition-all duration-300 group-hover:text-white ${i === 1 ? "text-black/60" : "text-text-muted"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={teamRef}
        className="border-border border-t px-5 py-20 md:px-10 md:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="team-header mb-12 flex flex-col gap-4 md:mb-0 md:flex-row md:items-end md:justify-between">
            <div className="opacity-0">
              <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.4em] uppercase">
                The Humans
              </span>
              <div
                className="font-big text-text-primary mt-3 leading-none font-black tracking-tight uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Meet the Team
              </div>
            </div>
            <Link
              href="/careers"
              className="group font-accent text-text-muted hover:text-accent inline-flex w-fit items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase opacity-0 transition-all hover:gap-4 md:mb-2"
            >
              <span>We&apos;re hiring</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="team-list mt-8 md:mt-12">
            {team.map((member, i) => (
              <div
                key={i}
                className="team-row group border-border hover:bg-bg-secondary flex items-center justify-between border-t py-5 opacity-0 transition-colors duration-200 last:border-b md:py-6"
              >
                <div className="flex items-center gap-4 px-2 md:gap-6 md:px-4">
                  <div className="bg-accent/10 text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full md:h-12 md:w-12">
                    <span className="font-big text-sm leading-none font-black md:text-base">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-big text-text-primary text-base leading-none font-black tracking-tight uppercase md:text-xl">
                      {member.name}
                    </span>
                    <span className="font-accent text-text-muted text-[9px] font-semibold tracking-[0.25em] uppercase md:text-[10px]">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-2 md:gap-8 md:px-4">
                  <span className="font-accent text-text-muted hidden text-[9px] font-semibold tracking-[0.25em] uppercase sm:block">
                    Since {member.since}
                  </span>
                  <div className="border-border group-hover:border-accent group-hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300">
                    <ArrowUpRight
                      size={13}
                      className="text-text-muted transition-colors group-hover:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={locationRef}
        className="border-border bg-bg-secondary border-t px-5 py-14 md:px-10 md:py-20 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              icon: MapPin,
              label: "Location",
              content: (
                <p className="font-body text-text-primary text-base">
                  Kestopur Salt Lake
                  <br />
                  Kolkata 700114, India
                </p>
              ),
            },
            {
              icon: Mail,
              label: "Email",
              content: (
                <a
                  href="mailto:info@wefik.in"
                  className="font-body text-text-primary hover:text-accent text-base transition-colors"
                >
                  info@wefik.in
                </a>
              ),
            },
            {
              icon: Phone,
              label: "Phone",
              content: (
                <a
                  href="tel:+919609653522"
                  className="font-body text-text-primary hover:text-accent text-base transition-colors"
                >
                  +91 96096 53522
                </a>
              ),
            },
          ].map(({ icon: Icon, label, content }, i) => (
            <div
              key={i}
              className="location-item flex flex-col gap-3 opacity-0"
            >
              <div className="border-border flex h-10 w-10 items-center justify-center rounded-full border">
                <Icon size={16} className="text-accent" />
              </div>
              <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.35em] uppercase">
                {label}
              </span>
              {content}
            </div>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className="px-5 py-20 md:px-10 md:py-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="cta-panel bg-text-primary relative overflow-hidden rounded-[2rem] px-8 py-16 opacity-0 md:rounded-[3rem] md:px-16 md:py-24">
            <div
              className="cta-ghost font-big pointer-events-none absolute -right-4 -bottom-6 leading-none font-black uppercase opacity-0 select-none"
              style={{
                fontSize: "clamp(5rem, 18vw, 16rem)",
                color: "rgba(255,255,255,0.04)",
              }}
              aria-hidden
            >
              LET&apos;S
            </div>

            <div className="cta-content relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-4 opacity-0">
                <span className="font-accent text-[9px] font-bold tracking-[0.4em] text-white/50 uppercase">
                  Ready to build something great?
                </span>
                <div
                  className="font-big leading-none font-black tracking-tight text-white uppercase"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                >
                  Let&apos;s Work
                  <br />
                  <span className="text-accent-bright">Together.</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 opacity-0">
                <Link
                  href="/contact"
                  className="group bg-accent-bright font-accent inline-flex items-center gap-5 rounded-full px-8 py-5 text-[11px] font-bold tracking-[0.25em] text-black uppercase transition-all duration-300 hover:gap-7"
                >
                  <span>Book a Call</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <span className="font-accent text-[9px] font-semibold tracking-[0.25em] text-white/40 uppercase md:text-center">
                  Free 30-min strategy session
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
