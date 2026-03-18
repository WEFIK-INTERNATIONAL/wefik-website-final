"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef(null);
  const ringRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const isAnimating = React.useRef(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      will-change: clip-path, opacity;
      clip-path: circle(0px at 50% 50%);
    `;
    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    return () => overlay.remove();
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full" />;
  }

  const handleToggle = (e) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const nextTheme = theme === "dark" ? "light" : "dark";
    const overlay = overlayRef.current;
    const x = e.clientX;
    const y = e.clientY;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    overlay.style.backgroundColor =
      nextTheme === "dark" ? "#0a0a0a" : "#f5f8ee";
    gsap.set(overlay, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    tl.to(
      buttonRef.current,
      {
        scale: 0.82,
        duration: 0.12,
        ease: "power2.in",
      },
      0
    );

    tl.fromTo(
      ringRef.current,
      { scale: 1, opacity: 0.6 },
      { scale: 2.8, opacity: 0, duration: 0.5, ease: "power2.out" },
      0
    );

    tl.fromTo(
      overlay,
      { clipPath: `circle(0px at ${x}px ${y}px)` },
      {
        clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        duration: 0.58,
        ease: "power3.inOut",
        onComplete: () => setTheme(nextTheme),
      },
      0.05
    );

    tl.to(
      buttonRef.current,
      {
        scale: 1,
        duration: 0.35,
        ease: "elastic.out(1.2, 0.5)",
      },
      0.2
    );

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(overlay, {
            clipPath: `circle(0px at ${x}px ${y}px)`,
            opacity: 1,
          });
        },
      },
      0.65
    );
  };

  return (
    <div className="relative flex items-center justify-center">
      <span
        ref={ringRef}
        className="border-accent absolute inset-0 rounded-full border opacity-0"
        aria-hidden="true"
      />
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label="Toggle theme"
        className="border-border bg-bg-card hover:border-accent relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 select-none"
      >
        <Sun className="text-accent h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
        <Moon className="text-accent absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
      </button>
    </div>
  );
}
