"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export default function CallToActionCom() {
  const containerRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    const el = containerRef.current;
    const totalWidth = el.scrollWidth / 2;

    tweenRef.current = gsap.to(el, {
      x: `-${totalWidth}px`,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const handleMouseEnter = () => {
    tweenRef.current?.timeScale(0.5);
  };

  const handleMouseLeave = () => {
    tweenRef.current?.timeScale(1);
  };

  return (
    <section className="-translate-y-5">
      <Link href="/contact" className="flex overflow-x-clip p-4">
        <div
          ref={containerRef}
          className="group flex flex-none gap-16 pr-16 text-8xl font-medium md:text-[14rem]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex items-center gap-16">
              <span className="text-accent text-7xl">&#10038;</span>
              <span className="text-text-primary group-hover:text-accent transition-all duration-300">
                Get in Contact
              </span>
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}
