"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "../ui/Tag";

const text = `Our digital agency creates impact for brands across websites, social media, content marketing, campaigns and branding. Between timeless and zeitgeist. How we communicate: Effectively. Quick-witted. Ambitious.`;

const words = text.split(" ");

export default function Introduction() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  const isDark = !mounted ? true : resolvedTheme === "dark";

  const sectionRef = useRef(null);
  const scrollPinRef = useRef(null);
  const wordRefs = useRef([]);

  useGSAP(
    () => {
      const wordEls = wordRefs.current.filter(Boolean);
      if (!wordEls.length) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        gsap.set(wordEls, { opacity: 1 });
        return;
      }

      const isMobile = window.innerWidth < 768;
      gsap.set(wordEls, { opacity: 0.25 });

      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=60%" : "+=90%",
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimer);
    },
    { scope: sectionRef, dependencies: [] }
  );

  const accentColor = isDark ? "#a3e635" : "#51731a";

  return (
    <section
      ref={sectionRef}
      className="bg-bg-primary relative h-screen w-full overflow-hidden"
    >
      <div
        className={`pointer-events-none absolute top-[25%] left-[20%] h-[360px] w-[360px] rounded-full blur-[48px] ${
          isDark
            ? "bg-[radial-gradient(circle,rgba(163,230,53,0.05)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle,rgba(81,115,26,0.05)_0%,transparent_70%)]"
        }`}
      />
      <div
        className={`blur-3pxl pointer-events-none absolute right-[20%] bottom-[25%] h-[480px] w-[480px] rounded-full ${
          isDark
            ? "bg-[radial-gradient(circle,rgba(163,230,53,0.03)_0%,transparent_70%)]"
            : "bg-[radial-gradient(circle,rgba(81,115,26,0.03)_0%,transparent_70%)]"
        }`}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-center px-6">
        <div className="mb-10 flex justify-center">
          <Tag>This is Wefik</Tag>
        </div>

        <div className="font-big mx-auto max-w-6xl text-center text-[clamp(2rem,6vw,3.75rem)] leading-[1] font-black tracking-tight uppercase">
          <span className="text-text-primary">
            Culture-driven, creative and competitive.{" "}
          </span>
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordRefs.current[i] = el)}
              className="text-text-primary inline"
            >
              {word}{" "}
            </span>
          ))}
          <span
            className={`mt-2 block bg-linear-to-r bg-clip-text text-transparent ${
              isDark
                ? "from-[#a3e635] to-[#bef264]"
                : "from-[#51731a] to-[#3a5212]"
            }`}
            style={{ color: accentColor }}
          >
            This is Wefik for you.
          </span>
        </div>
      </div>
    </section>
  );
}
