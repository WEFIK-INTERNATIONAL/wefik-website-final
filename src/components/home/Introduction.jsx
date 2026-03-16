"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Tag from "../ui/Tag";

gsap.registerPlugin(useGSAP);

const text = `Our digital agency creates impact for brands. In the disciplines Websites, social media, content marketing, campaigning and branding. Between timeless and zeitgeist. When we communicate: Effectively. Quick witted. Ambitious`;

const words = text.split(" ");

export default function Introduction() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = !mounted ? true : resolvedTheme === "dark";

  const sectionRef = useRef(null);
  const scrollPinRef = useRef(null);
  const wordRefs = useRef([]);

  useGSAP(
    () => {
      const wordEls = wordRefs.current.filter(Boolean);
      if (!wordEls.length) return;

      gsap.set(wordEls, { opacity: 0.12 });

      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: scrollPinRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef, dependencies: [] }
  );

  const accentColor = isDark ? "#a3e635" : "#51731a";

  return (
    <section
      ref={sectionRef}
      className="bg-bg-primary relative w-full overflow-x-clip"
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

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="sticky top-[clamp(80px,10vh,140px)] z-10 pt-12 lg:pt-24">
          <div className="flex justify-center">
            <Tag>This is Wefik</Tag>
          </div>

          <div className="mx-auto mt-10 max-w-7xl text-center text-[clamp(2rem,6vw,3.5rem)] leading-[1.2] font-bold tracking-tight lg:leading-[1.15] lg:font-extrabold lg:-tracking-[0.03em]">
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
            >
              This is Wefik for you.
            </span>
          </div>
        </div>
        <div ref={scrollPinRef} className="h-[150vh]" />
      </div>
    </section>
  );
}
