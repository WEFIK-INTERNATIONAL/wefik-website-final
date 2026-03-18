"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CTA() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useGSAP(
    () => {
      gsap.from(textRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.to(blob1Ref.current, {
        x: "15%",
        y: "-10%",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(blob2Ref.current, {
        x: "-15%",
        y: "10%",
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary border-border/20 relative overflow-hidden border-t py-32 md:py-48"
    >
      <div
        ref={blob1Ref}
        className="bg-accent/10 pointer-events-none absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
      />
      <div
        ref={blob2Ref}
        className="bg-accent-bright/5 pointer-events-none absolute top-1/2 right-1/4 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <div ref={textRef} className="flex flex-col items-center">
          <div className="bg-accent/10 border-border/20 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
            <Sparkles size={14} className="text-accent" />
            <span className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">
              Next Step
            </span>
          </div>

          <h2 className="text-text-primary mb-12 text-5xl leading-[0.9] font-black tracking-tighter uppercase md:text-8xl">
            Ready to Build <br />
            <span className="text-accent">The Future?</span>
          </h2>

          <p className="text-text-muted mx-auto mb-16 max-w-xl px-4 text-lg leading-relaxed md:text-xl">
            Let&apos;s collaborate to turn your vision into a digital reality.
            Our team is ready to deliver excellence.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            <MagneticButton>
              <Link
                href="/contact"
                className="group bg-accent hover:shadow-accent/20 relative inline-flex items-center gap-4 rounded-full px-8 py-4 font-bold tracking-widest text-black uppercase shadow-2xl transition-all duration-300 hover:bg-white"
              >
                <span className="text-sm">Start a Project</span>
                <div className="group-hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </MagneticButton>

            <Link
              href="/work"
              className="text-text-primary hover:text-accent flex items-center gap-2 px-8 py-4 font-bold tracking-widest uppercase transition-colors duration-300"
            >
              <span className="text-sm">Explore Works</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
