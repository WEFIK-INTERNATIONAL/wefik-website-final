"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useLoader } from "@/components/ui/LoaderProvider";
import TransitionLink from "@/components/ui/TransitionLink";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Tag from "@/components/ui/Tag";
import ContactCTA from "@/components/ui/ContactCTA";
import { SERVICE_ART } from "@/components/expertise/ServiceArt";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    id: "web-design",
    title: "Web Design",
    tagline: "Pixels with purpose.",
    description:
      "From pixel-perfect layouts to intuitive navigation, our websites don't just look good — they work hard for your brand. We create digital experiences that resonate with your audience and drive real conversions.",
    points: [
      "Fully responsive design",
      "Speed & SEO optimized",
      "Custom-tailored aesthetics",
      "Accessibility-first build",
      "Interactive prototyping",
    ],
  },
  {
    num: "02",
    id: "digital-product",
    title: "Digital Product",
    tagline: "Interfaces that perform.",
    description:
      "From SaaS platforms to mobile apps, we design digital products that are beautiful, functional, and future-ready. Our approach combines user-centric research with cutting-edge visual design.",
    points: [
      "Mobile & web app design",
      "Dashboard & data visualization",
      "Cross-platform consistency",
      "User research & testing",
      "Design systems",
    ],
  },
  {
    num: "03",
    id: "development",
    title: "Development",
    tagline: "Code that scales.",
    description:
      "We turn creative visions into functional, scalable platforms — built to perform and grow with your business. Clean, efficient code using the latest technologies and proven best practices.",
    points: [
      "Shopify, WordPress & custom",
      "Seamless integrations",
      "Fast, secure & maintainable",
      "E-commerce solutions",
      "API development",
    ],
  },
  {
    num: "04",
    id: "ui-ux",
    title: "UI / UX Design",
    tagline: "Experiences by design.",
    description:
      "We design experiences that engage users and drive results — blending creativity with human-centered strategy. Every touchpoint is carefully mapped for a seamless, delightful journey.",
    points: [
      "Wireframes & prototypes",
      "User journey mapping",
      "Conversion-focused UX",
      "Information architecture",
      "Usability audits",
    ],
  },
  {
    num: "05",
    id: "brand-identity",
    title: "Brand Identity",
    tagline: "Stories that stick.",
    description:
      "Your brand is more than a logo — it's a story. We shape every detail so your business leaves a lasting impression, defining your voice, visual language, and feel across every touchpoint.",
    points: [
      "Logo & brand guidelines",
      "Typography & color systems",
      "Cohesive visual language",
      "Brand strategy",
      "Social media kits",
    ],
  },
  {
    num: "06",
    id: "creative-content",
    title: "Creative Content",
    tagline: "Campaigns that convert.",
    description:
      "We produce high-impact visual content and campaigns that amplify your brand's voice. From motion graphics to multi-channel campaigns — we get you noticed, remembered, and chosen.",
    points: [
      "Social media campaigns",
      "Video & motion graphics",
      "Marketing-ready visuals",
      "Content strategy",
      "Digital advertising",
    ],
  },
];

const STATS = [
  { value: "06", label: "Core disciplines" },
  { value: "30+", label: "Clients served" },
  { value: "4.9★", label: "Average rating" },
  { value: "100%", label: "On-time delivery" },
];

function StickyNav({ activeService, onNavClick }) {
  // Plain CSS sticky: stays below the fixed navbar (top 120px) for the whole
  // services section and stops at the section's end.
  return (
    <aside className="hidden w-48 shrink-0 self-stretch lg:block xl:w-52">
      <div className="sticky top-[120px]">
        <div>
          <p
            className="font-accent mb-5"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
            }}
          >
            Services
          </p>

          <nav className="flex flex-col">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onNavClick(i)}
                className={`snav-item flex items-center gap-3 py-3 pl-4 text-left ${activeService === i ? "active" : ""}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color:
                    activeService === i
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                }}
              >
                <span
                  className="font-accent"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    opacity: 0.55,
                    minWidth: "18px",
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: "13px",
                    fontWeight: activeService === i ? 600 : 400,
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default function ExpertisePage() {
  const { canPlayEntrance } = useLoader();

  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const panelRefs = useRef([]);
  const explorerSectionRef = useRef(null);

  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.querySelectorAll(".anim-el").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers = [];
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveService(i);
        },
        { threshold: 0.25, rootMargin: "0px 0px -45% 0px" }
      );
      obs.observe(panel);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Service art only animates while its card is on screen.
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".sa-art") ?? [];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("in-view", e.isIntersecting)
        ),
      { threshold: 0.2 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const scrollToPanel = useCallback((index) => {
    panelRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  useGSAP(
    () => {
      if (!canPlayEntrance) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.2 })
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        .fromTo(
          headlineRef.current?.querySelectorAll(".split-word"),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          sublineRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            onComplete: () => ScrollTrigger.refresh(),
          },
          "-=0.6"
        );

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const base = { scrollTrigger: { trigger: panel, start: "top 80%" } };
        const q = (sel) => panel.querySelector(sel);
        const qa = (sel) => panel.querySelectorAll(sel);

        const line = q(".panel-line");
        const num = q(".panel-num");
        const title = q(".panel-title");
        const desc = q(".panel-desc");
        const tags = qa(".panel-tag");
        const vis = q(".panel-visual");

        if (line)
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              transformOrigin: "left",
              ...base,
            }
          );
        if (num)
          gsap.fromTo(
            num,
            { opacity: 0, scale: 0.88 },
            { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", ...base }
          );
        if (title)
          gsap.fromTo(
            title,
            { y: 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 75%" },
            }
          );
        if (desc)
          gsap.fromTo(
            desc,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 72%" },
            }
          );
        if (tags.length)
          gsap.fromTo(
            tags,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.055,
              duration: 0.55,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 68%" },
            }
          );
        if (vis)
          gsap.fromTo(
            vis,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 74%" },
            }
          );
      });
    },
    { scope: containerRef, dependencies: [canPlayEntrance] }
  );

  return (
    <main
      ref={containerRef}
      className="bg-bg-primary text-text-primary min-h-screen"
    >
      <style>{`
        @keyframes marquee-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-slide 32s linear infinite;
          will-change: transform;
        }
        .marquee-inner:hover { animation-play-state: paused; }

        
        .snav-item { position: relative; transition: color 0.22s ease; }
        .snav-item::before {
          content: "";
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 2px; height: 55%;
          background: var(--color-accent);
          border-radius: 0 2px 2px 0;
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .snav-item.active::before,
        .snav-item:hover::before { transform: translateY(-50%) scaleY(1); }
        .snav-item.active { color: var(--color-accent) !important; }
        .snav-item:hover:not(.active) { color: var(--color-text-primary) !important; }

        
        .art-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.35s ease,
                      border-color 0.3s ease;
        }
        .art-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 20px 56px -12px rgba(163,230,53,0.18);
          border-color: rgba(163,230,53,0.35) !important;
        }
      `}</style>

      {}
      <section className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-36 pb-0 md:px-12 md:pt-44">
        {}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.55,
          }}
        />
        {}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 42% at 72% 55%, rgba(163,230,53,0.08) 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div ref={tagRef} className="anim-el mb-10 opacity-0">
            <Tag>Expertise</Tag>
          </div>

          <h1
            ref={headlineRef}
            className="font-big anim-el mb-10"
            style={{
              fontSize: "clamp(3.6rem, 10.5vw, 10rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
            }}
          >
            <div className="overflow-hidden">
              <span className="split-word inline-block">Capabilities</span>
            </div>
            <div className="overflow-hidden">
              <span
                className="split-word inline-block"
                style={{ color: "var(--color-accent)" }}
              >
                that drive
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="split-word inline-block">growth.</span>
            </div>
          </h1>

          <div
            ref={sublineRef}
            className="anim-el flex flex-col gap-8 opacity-0 md:flex-row md:items-end md:justify-between"
          >
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "500px",
              }}
            >
              Strategy, design, and technology — combined to build brands people
              remember and digital products people love.
            </p>
            <div className="flex flex-col items-start gap-1 md:items-end">
              <span
                className="font-big"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  letterSpacing: "-0.04em",
                }}
              >
                06
              </span>
              <span
                className="font-accent"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-text-subtle)",
                }}
              >
                Core services
              </span>
            </div>
          </div>
        </div>
      </section>

      {}
      <section
        ref={explorerSectionRef}
        className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24"
      >
        <div className="flex items-start gap-0 lg:gap-20 xl:gap-28">
          {}
          <StickyNav activeService={activeService} onNavClick={scrollToPanel} />

          {}
          <div className="min-w-0 flex-1">
            {SERVICES.map((service, i) => {
              const Art = SERVICE_ART[i];
              return (
                <div
                  key={service.id}
                  ref={(el) => (panelRefs.current[i] = el)}
                  style={{
                    paddingTop: i === 0 ? "0" : "clamp(4.5rem, 10vw, 8rem)",
                    paddingBottom: "clamp(4.5rem, 10vw, 8rem)",
                    borderBottom:
                      i < SERVICES.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    position: "relative",
                  }}
                >
                  {}
                  <div
                    className="panel-line mb-8 h-px"
                    style={{
                      background: "var(--color-accent)",
                      opacity: 0.25,
                      width: "64px",
                      display: i === 0 ? "none" : "block",
                    }}
                  />

                  {}
                  <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14">
                    {}
                    <div className="flex flex-col gap-7">
                      <div>
                        <span
                          className="font-accent mb-3 block"
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.22em",
                            color: "var(--color-accent)",
                            textTransform: "uppercase",
                          }}
                        >
                          {service.num}
                        </span>
                        <h2
                          className="panel-title font-big"
                          style={{
                            fontSize: "clamp(2rem, 4.5vw, 4rem)",
                            fontWeight: 900,
                            lineHeight: 0.95,
                            letterSpacing: "-0.03em",
                            textTransform: "uppercase",
                            color: "var(--color-text-primary)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {service.title}
                        </h2>
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--color-accent)",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {service.tagline}
                        </p>
                      </div>

                      <p
                        className="panel-desc font-body"
                        style={{
                          fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.78,
                        }}
                      >
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.points.map((point) => (
                          <span
                            key={point}
                            className="panel-tag font-accent cursor-default"
                            style={{
                              display: "inline-block",
                              padding: "5px 13px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-muted)",
                              transition:
                                "border-color 0.2s, color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                "var(--color-accent)";
                              e.currentTarget.style.color =
                                "var(--color-accent)";
                              e.currentTarget.style.background =
                                "rgba(163,230,53,0.06)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "var(--color-border)";
                              e.currentTarget.style.color =
                                "var(--color-text-muted)";
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    {}
                    <div className="panel-visual flex items-start justify-center md:justify-end">
                      <div className="art-card sa-art border-text-primary/10 bg-bg-card relative aspect-4/3 w-full max-w-[480px] overflow-hidden rounded-3xl border px-3 pt-9 pb-3 md:px-5 md:pt-11 md:pb-5">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(60% 60% at 70% 30%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 100%)",
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-60"
                          style={{
                            backgroundImage:
                              "radial-gradient(color-mix(in srgb, var(--color-text-primary) 10%, transparent) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                            maskImage:
                              "radial-gradient(ellipse at center, #000 40%, transparent 80%)",
                          }}
                        />
                        <span className="text-text-subtle absolute top-4 left-5 z-10 text-[10px] font-bold tracking-[0.2em] uppercase">
                          {service.num} · {service.title}
                        </span>
                        <div
                          className="relative h-full w-full"
                          role="img"
                          aria-label={`${service.title} illustration`}
                        >
                          <Art />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col gap-2"
              style={{
                borderLeft: "2px solid var(--color-border)",
                paddingLeft: "1.25rem",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderLeftColor = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderLeftColor = "var(--color-border)")
              }
            >
              <span
                className="font-big"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.6rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                }}
              >
                {value}
              </span>
              <span
                className="font-accent"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-subtle)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {}
      <ContactCTA />
    </main>
  );
}
