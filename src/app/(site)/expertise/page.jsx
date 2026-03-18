"use client";

import React, { useRef } from "react";
import {
  Monitor,
  Smartphone,
  Code2,
  Layers,
  Zap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const expertiseDetails = [
  {
    title: "Web Design",
    description:
      "From pixel-perfect layouts to intuitive navigation, our websites don't just look good — they work hard for your brand. We focus on creating digital experiences that resonate with your audience and drive conversions.",
    points: [
      "Fully responsive across devices",
      "Optimized for speed and SEO",
      "Custom Tailored Design",
      "Accessibility & Inclusion",
      "Interactive Prototyping",
    ],
    icon: Monitor,
    color: "accent",
  },
  {
    title: "Digital Product Design",
    description:
      "From SaaS platforms to mobile apps, we design digital products that are beautiful, functional, and future-ready. Our approach combines user-centric research with cutting-edge visual design.",
    points: [
      "Mobile & web app design",
      "Dashboard & data visualization",
      "Cross-platform consistency",
      "User Research & Testing",
      "Design Systems",
    ],
    icon: Smartphone,
    color: "accent-bright",
  },
  {
    title: "Development",
    description:
      "We turn creative visions into functional, scalable platforms — built to perform and grow with your business. Our developers write clean, efficient code using the latest technologies.",
    points: [
      "Shopify, WordPress, & custom builds",
      "Seamless Integrations",
      "Fast, secure, and maintainable code",
      "E-commerce Solutions",
      "API Development",
    ],
    icon: Code2,
    color: "accent",
  },
  {
    title: "UI/UX & Prototyping",
    description:
      "We design experiences that engage users and drive results — blending creativity with human-centered strategy. We map out every touchpoint to ensure a seamless journey.",
    points: [
      "Wireframes & Interactive prototypes",
      "User journey mapping & testing",
      "Conversion-focused experience design",
      "Information Architecture",
      "Usability Audits",
    ],
    icon: Layers,
    color: "accent-bright",
  },
  {
    title: "Brand Identity",
    description:
      "Your brand is more than a logo — It's a story. We shape every detail so your business leaves a lasting mark. We define your brand's voice, look, and feel.",
    points: [
      "Logo creation & brand guidelines",
      "Typography & color systems",
      "Cohesive visual language",
      "Brand Strategy",
      "Social Media Kits",
    ],
    icon: Zap,
    color: "accent",
  },
  {
    title: "Creative Content & Campaigns",
    description:
      "We produce high-impact visual content and campaigns that amplify your brand's voice. From motion graphics to multi-channel campaigns, we get you noticed.",
    points: [
      "Social media campaigns & ad creatives",
      "Video editing & motion graphics",
      "Marketing automation-ready visuals",
      "Content Strategy",
      "Digital Advertising",
    ],
    icon: Sparkles,
    color: "accent-bright",
  },
];

export default function ExpertisePage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      const sections = gsap.utils.toArray(".expertise-section");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="bg-bg-primary text-text-primary min-h-screen pt-32 pb-24"
    >
      <section ref={heroRef} className="mb-24 px-6 md:mb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-accent/30 h-px w-16" />
            <span className="text-accent text-sm font-bold tracking-[0.3em] uppercase">
              Expertise
            </span>
          </div>
          <h1 className="text-text-primary mb-12 text-5xl leading-tight font-black tracking-tighter uppercase md:text-8xl">
            Capabilities <br />
            <span className="text-accent">That Drive Growth</span>
          </h1>
          <p className="text-text-muted max-w-2xl text-xl leading-relaxed md:text-2xl">
            We combine strategy, design, and technology to build brands that
            stand out and digital products that people love to use.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-7xl space-y-24 md:space-y-48">
          {expertiseDetails.map((item, index) => (
            <div
              key={item.title}
              id={item.title
                .toLowerCase()
                .replace(/ & /g, "-")
                .replace(/\s+/g, "-")}
              className={`expertise-section flex flex-col items-center gap-12 md:flex-row md:gap-24 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className={`bg-accent/10 dark:bg-accent/5 text-accent rounded-2xl p-4 shadow-sm`}
                  >
                    <item.icon size={32} />
                  </div>
                  <div className="text-text-primary text-3xl leading-tight font-black tracking-tight uppercase md:text-5xl">
                    {item.title}
                  </div>
                </div>
                <p className="text-text-muted mb-12 text-xl leading-relaxed md:text-2xl">
                  {item.description}
                </p>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="group/item flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={24}
                        className="text-accent mt-1 shrink-0 transition-transform group-hover/item:scale-110"
                      />
                      <span className="text-text-primary text-lg font-medium">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative aspect-square w-full flex-1">
                <div
                  className={`border-border/30 bg-bg-card group absolute inset-0 overflow-hidden rounded-4xl border shadow-xl dark:shadow-none`}
                >
                  <div
                    className={`bg-accent/10 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-[120px]`}
                  />
                  <div
                    className={`bg-accent/5 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-[120px]`}
                  />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="text-text-primary/10 text-[12rem] leading-none font-black select-none md:text-[20rem]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                    <item.icon
                      size={120}
                      className={`text-accent opacity-10 dark:opacity-20`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-32 md:py-64">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-text-primary mb-12 text-5xl leading-tight font-black tracking-tighter uppercase md:text-8xl">
            Have a project <br />
            <span className="text-accent decoration-border/30 underline underline-offset-8">
              In mind?
            </span>
          </h2>
          <div className="mt-8 inline-block">
            <a
              href="/contact"
              className="bg-accent hover:bg-accent-bright hover:shadow-accent/20 flex items-center gap-4 rounded-full px-12 py-6 text-xl font-bold tracking-widest text-black uppercase shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Start a Conversation
              <ArrowRight size={24} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
