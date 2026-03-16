"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NUM_METEORS = 5;
const LINE_SPACING_DESKTOP = 100;
const LINE_SPACING_MOBILE = 60;

function Meteor({ x, duration, delay, isDark, onComplete }) {
  const meteorRef = useRef(null);

  useGSAP(
    () => {
      const el = meteorRef.current;
      if (!el) return;

      const vh = typeof window !== "undefined" ? window.innerHeight + 140 : 900;

      gsap.fromTo(
        el,
        { y: -140, opacity: 0 },
        {
          y: vh,
          duration,
          delay,
          ease: "none",
          onComplete,
          onUpdate: function () {
            const p = this.progress();
            const opacity = p < 0.05 ? p / 0.05 : p > 0.95 ? (1 - p) / 0.05 : 1;
            gsap.set(el, { opacity });
          },
        }
      );
    },
    { scope: meteorRef, dependencies: [x, duration, delay] }
  );

  const accentColor = isDark ? "rgba(163,230,53," : "rgba(81,115,26,";

  return (
    <div
      ref={meteorRef}
      style={{
        position: "absolute",
        left: x,
        top: 0,
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "2px",
          height: "110px",
          background: `linear-gradient(to top, ${accentColor}0.75), transparent)`,
          borderRadius: "1px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-3px",
          width: "8px",
          height: "130px",
          background: `linear-gradient(to top, ${accentColor}0.18), transparent)`,
          filter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-1px",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: accentColor + "0.9)",
          boxShadow: `0 0 6px 2px ${accentColor}0.4)`,
        }}
      />
    </div>
  );
}

export default function GridBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [numLines, setNumLines] = useState(0);
  const [lineSpacing, setLineSpacing] = useState(LINE_SPACING_DESKTOP);
  const [meteors, setMeteors] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted ? true : resolvedTheme === "dark";
  useEffect(() => {
    function calculate() {
      const w = window.innerWidth;
      const spacing = w < 640 ? LINE_SPACING_MOBILE : LINE_SPACING_DESKTOP;
      setLineSpacing(spacing);
      setNumLines(Math.floor(w / spacing) + 1);
    }
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const createMeteor = useCallback(
    (id) => {
      if (numLines === 0) return null;
      return {
        id,
        key: `${id}-${++counterRef.current}`,
        lineIndex: Math.floor(Math.random() * numLines),
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 12,
      };
    },
    [numLines]
  );
  useEffect(() => {
    if (numLines > 0) {
      setMeteors(
        Array.from({ length: NUM_METEORS }, (_, i) => createMeteor(i))
      );
    }
  }, [numLines, createMeteor]);
  const recycleMeteor = useCallback(
    (id) => {
      setMeteors((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...createMeteor(id), delay: 2 + Math.random() * 8 }
            : m
        )
      );
    },
    [createMeteor]
  );

  const lineStroke = isDark
    ? "rgba(255,255,255,0.055)"
    : "rgba(81,115,26,0.10)";
  const accentLineStroke = isDark
    ? "rgba(163,230,53,0.07)"
    : "rgba(81,115,26,0.16)";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 75% at 50% 0%, #000 55%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 90% 75% at 50% 0%, #000 55%, transparent 100%)",
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: numLines }).map((_, i) => (
          <line
            key={i}
            x1={i * lineSpacing}
            y1="0"
            x2={i * lineSpacing}
            y2="100%"
            stroke={i % 5 === 0 ? accentLineStroke : lineStroke}
            strokeWidth={i % 5 === 0 ? "1" : "0.75"}
          />
        ))}
      </svg>

      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {meteors.filter(Boolean).map((meteor) => (
          <Meteor
            key={meteor.key}
            x={meteor.lineIndex * lineSpacing}
            duration={meteor.duration}
            delay={meteor.delay}
            isDark={isDark}
            onComplete={() => recycleMeteor(meteor.id)}
          />
        ))}
      </div>
    </div>
  );
}
