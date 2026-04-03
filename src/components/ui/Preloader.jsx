"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/components/ui/LoaderProvider";

const Preloader = ({ onComplete }) => {
  const { setIsPreloaderDone } = useLoader();
  const [percentage, setPercentage] = useState(0);
  const [status, setStatus] = useState("Initializing Core");
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const wordRef = useRef(null);
  const statusRef = useRef(null);
  const progressLineRef = useRef(null);
  const tlRef = useRef(null);

  const statuses = [
    "Optimizing Systems",
    "Loading Assets",
    "Finalizing Interface",
    "Ready",
  ];

  const brandName = "WEFIK".split("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleComplete = () => {
    document.body.style.overflow = "";
    setIsPreloaderDone(true);
    if (onComplete) onComplete();
  };

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !wordRef.current ||
        !counterRef.current ||
        !statusRef.current ||
        !progressLineRef.current
      )
        return;

      const tl = gsap.timeline({ onComplete: handleComplete });
      tlRef.current = tl;

      tl.set(containerRef.current, { clipPath: "inset(0% 0% 0% 0%)" });

      const letters = wordRef.current.children;
      tl.fromTo(
        letters,
        { yPercent: 120, opacity: 0, rotateX: -30 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      const obj = { value: 0 };
      tl.to(
        obj,
        {
          value: 100,
          duration: 3,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.floor(obj.value);
            setPercentage(val);
            const stage = Math.min(Math.floor(val / 25), 3);
            setStatus((prev) => {
              const next = statuses[stage];
              return prev !== next ? next : prev;
            });
          },
        },
        "-=0.8"
      );

      tl.to(
        letters,
        {
          yPercent: -120,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.in",
        },
        "+=0.2"
      )
        .to(
          [counterRef.current, statusRef.current, progressLineRef.current],
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "-=0.6"
        )
        .to(
          containerRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.2,
            ease: "expo.inOut",
          },
          "-=0.2"
        );

      const failsafe = setTimeout(() => {
        if (tlRef.current && tlRef.current.isActive()) {
          tlRef.current.kill();
          handleComplete();
        }
      }, 6000);

      return () => {
        clearTimeout(failsafe);
        tl.kill();

        document.body.style.overflow = "";
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="preloader-container"
      className="bg-bg-primary text-text-primary fixed inset-0 z-[10000] flex flex-col justify-between p-6 md:p-12"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: "var(--color-bg-primary, #f5f8ee)",
      }}
    >
      <div className="h-20 w-full" />

      <div
        className="flex w-full items-center justify-center overflow-hidden py-10"
        style={{ perspective: "1000px" }}
      >
        <h1
          ref={wordRef}
          className="font-display flex overflow-hidden text-[25vw] leading-none font-black tracking-tighter sm:text-[20vw] md:text-[22vw]"
        >
          {brandName.map((char, index) => (
            <span key={index} className="inline-block pb-4 opacity-0">
              {char}
            </span>
          ))}
        </h1>
      </div>

      <div className="relative flex w-full flex-col justify-between gap-6 pb-6 md:flex-row md:items-end">
        <div
          ref={statusRef}
          className="text-text-muted font-mono text-[10px] font-bold tracking-[0.2em] uppercase md:mb-2"
        >
          {status}
        </div>

        <div className="flex items-baseline justify-end overflow-hidden">
          <h2
            ref={counterRef}
            className="font-monolith text-[22vw] leading-[0.8] font-black tracking-tighter md:text-[12vw]"
          >
            {percentage.toString().padStart(3, "0")}
          </h2>
          <span className="font-monolith text-2xl font-bold md:text-5xl">
            %
          </span>
        </div>
      </div>

      <div className="bg-border/40 absolute right-0 bottom-0 left-0 h-1 md:h-[6px]">
        <div
          ref={progressLineRef}
          className="bg-accent h-full transition-[width] duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Preloader;
