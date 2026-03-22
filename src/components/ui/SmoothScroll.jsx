"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true, force: true });

    const rafId = requestAnimationFrame(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2,
        orientation: "vertical",
        gestureOrientation: "vertical",

        prevent: (node) => node.classList?.contains("lenis-prevent"),
      }}
    >
      {children}
    </ReactLenis>
  );
}
