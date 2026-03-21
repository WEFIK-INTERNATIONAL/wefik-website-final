"use client";

import React, { useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Tag from "../ui/Tag";
import BookACall from "../ui/BookACall";

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
      className="bg-bg-primary relative px-6 py-24 md:px-12 md:py-32 lg:px-24"
    >
      <div className="bg-bg-card border-border/40 relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border py-24 shadow-2xl md:rounded-[4rem] md:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[4rem_4rem] opacity-[0.03] dark:opacity-[0.05]" />
          <div
            ref={blob1Ref}
            className="bg-accent/20 absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          />
          <div
            ref={blob2Ref}
            className="bg-accent-bright/10 absolute top-1/2 right-1/4 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          />
        </div>

        <div className="relative z-10 px-6 text-center">
          <div ref={textRef} className="flex flex-col items-center">
            <div className="mb-10">
              <Tag>Next Step</Tag>
            </div>

            <h2 className="text-text-primary mb-12 text-5xl leading-[0.9] font-black tracking-tighter uppercase md:text-8xl">
              Ready to Build <br />
              <span className="text-accent">The Future?</span>
            </h2>

            <p className="text-text-muted mx-auto mb-16 max-w-xl px-4 text-base leading-relaxed md:text-xl">
              Let&apos;s collaborate to turn your vision into a digital reality.
              Our team is ready to deliver excellence.
            </p>

            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <BookACall>
                <MagneticButton>
                  <div className="group bg-accent hover:shadow-accent/30 relative inline-flex items-center gap-4 rounded-full px-8 py-4 font-bold tracking-widest text-black uppercase shadow-2xl transition-all duration-300 hover:bg-white active:scale-95">
                    <span className="text-sm">Start a Project</span>
                    <div className="group-hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </MagneticButton>
              </BookACall>

              <MagneticButton>
                <TransitionLink
                  href="/works"
                  className="text-text-primary border-border/40 hover:bg-text-primary/5 hover:border-accent group flex items-center gap-4 rounded-full border px-8 py-4 font-bold tracking-widest uppercase transition-all duration-300 active:scale-95"
                >
                  <span className="text-sm">Explore Works</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={16} />
                  </div>
                </TransitionLink>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
