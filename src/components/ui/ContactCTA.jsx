"use client";

import React, { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import SplitWords from "./SplitWords";
import BookACall from "./BookACall";

export default function ContactCTA() {
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-panel",
        { y: 70, opacity: 0, scale: 0.97 },
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
        ".cta-line .split-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 76%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".cta-actions > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
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
    <section ref={ctaRef} className="px-5 pb-24 md:px-10 md:pb-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="cta-panel bg-bg-card border-border/40 relative overflow-hidden rounded-4xl border px-8 py-16 opacity-0 shadow-2xl md:rounded-[3rem] md:px-16 md:py-24">
          {}
          <div
            className="font-big text-text-primary pointer-events-none absolute -right-4 -bottom-4 leading-none font-black uppercase opacity-[0.04] select-none"
            style={{
              fontSize: "clamp(5rem, 16vw, 14rem)",
            }}
            aria-hidden
          >
            BOOK
          </div>

          <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.4em] uppercase">
                Prefer a conversation?
              </span>
              <SplitWords
                text="Book a Free 30-Min Call"
                className="cta-line font-big text-text-primary leading-none font-black tracking-tight uppercase"
                style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
              />
              <p className="font-body text-text-muted max-w-sm text-base">
                Let&apos;s talk about your project, goals, and how Wefik can
                help you get there.
              </p>
            </div>

            <div className="cta-actions flex flex-col gap-4">
              <BookACall>
                <div className="group bg-accent-bright font-accent inline-flex items-center gap-5 rounded-full px-8 py-5 text-[11px] font-bold tracking-[0.25em] text-black uppercase transition-all duration-300 hover:gap-7">
                  <span>Schedule a Call</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </BookACall>
              <a
                href="mailto:info@wefik.in"
                className="group font-accent text-text-muted hover:text-text-primary inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-all hover:gap-4"
              >
                <span>Or just email us</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
