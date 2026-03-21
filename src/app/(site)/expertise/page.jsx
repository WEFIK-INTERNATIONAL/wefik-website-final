"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useLoader } from "@/components/ui/LoaderProvider";
import TransitionLink from "@/components/ui/TransitionLink";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Tag from "@/components/ui/Tag";
import ContactCTA from "@/components/ui/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

// ─── Content ───────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    id: "web-design",
    title: "Web Design",
    tagline: "Pixels with purpose.",
    description:
      "From pixel-perfect layouts to intuitive navigation, our websites don't just look good — they work hard for your brand. We create digital experiences that resonate with your audience and drive real conversions.",
    points: [
      "Fully responsive design",
      "Speed & SEO optimized",
      "Custom-tailored aesthetics",
      "Accessibility-first build",
      "Interactive prototyping",
    ],
  },
  {
    num: "02",
    id: "digital-product",
    title: "Digital Product",
    tagline: "Interfaces that perform.",
    description:
      "From SaaS platforms to mobile apps, we design digital products that are beautiful, functional, and future-ready. Our approach combines user-centric research with cutting-edge visual design.",
    points: [
      "Mobile & web app design",
      "Dashboard & data visualization",
      "Cross-platform consistency",
      "User research & testing",
      "Design systems",
    ],
  },
  {
    num: "03",
    id: "development",
    title: "Development",
    tagline: "Code that scales.",
    description:
      "We turn creative visions into functional, scalable platforms — built to perform and grow with your business. Clean, efficient code using the latest technologies and proven best practices.",
    points: [
      "Shopify, WordPress & custom",
      "Seamless integrations",
      "Fast, secure & maintainable",
      "E-commerce solutions",
      "API development",
    ],
  },
  {
    num: "04",
    id: "ui-ux",
    title: "UI / UX Design",
    tagline: "Experiences by design.",
    description:
      "We design experiences that engage users and drive results — blending creativity with human-centered strategy. Every touchpoint is carefully mapped for a seamless, delightful journey.",
    points: [
      "Wireframes & prototypes",
      "User journey mapping",
      "Conversion-focused UX",
      "Information architecture",
      "Usability audits",
    ],
  },
  {
    num: "05",
    id: "brand-identity",
    title: "Brand Identity",
    tagline: "Stories that stick.",
    description:
      "Your brand is more than a logo — it's a story. We shape every detail so your business leaves a lasting impression, defining your voice, visual language, and feel across every touchpoint.",
    points: [
      "Logo & brand guidelines",
      "Typography & color systems",
      "Cohesive visual language",
      "Brand strategy",
      "Social media kits",
    ],
  },
  {
    num: "06",
    id: "creative-content",
    title: "Creative Content",
    tagline: "Campaigns that convert.",
    description:
      "We produce high-impact visual content and campaigns that amplify your brand's voice. From motion graphics to multi-channel campaigns — we get you noticed, remembered, and chosen.",
    points: [
      "Social media campaigns",
      "Video & motion graphics",
      "Marketing-ready visuals",
      "Content strategy",
      "Digital advertising",
    ],
  },
];

const STATS = [
  { value: "06", label: "Core disciplines" },
  { value: "30+", label: "Clients served" },
  { value: "4.9★", label: "Average rating" },
  { value: "100%", label: "On-time delivery" },
];

function WebDesignSVG() {
  return (
    <svg viewBox="0 0 240 185" fill="none" className="art-svg h-full w-full">
      <style>{`
        .wd-rect1 { animation: wd-scan 3.2s ease-in-out infinite; }
        .wd-rect2 { animation: wd-scan 3.2s ease-in-out infinite 0.3s; }
        .wd-rect3 { animation: wd-scan 3.2s ease-in-out infinite 0.6s; }
        .wd-cursor { animation: wd-blink 1.1s step-end infinite; }
        @keyframes wd-scan {
          0%,100% { opacity: 0.07; }
          50%      { opacity: 0.18; }
        }
        @keyframes wd-blink {
          0%,100% { opacity: 0.7; }
          50%      { opacity: 0; }
        }
        .art-card:hover .wd-browser { filter: drop-shadow(0 6px 18px rgba(163,230,53,0.18)); }
        .art-card:hover .wd-scan-line {
          animation: wd-scan-hover 1s ease forwards;
        }
        @keyframes wd-scan-hover {
          from { transform: translateY(0); opacity: 0.18; }
          to   { transform: translateY(52px); opacity: 0; }
        }
      `}</style>
      <g className="wd-browser">
        {/* Browser chrome */}
        <rect
          x="10"
          y="10"
          width="220"
          height="165"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.28"
        />
        <rect
          x="10"
          y="10"
          width="220"
          height="30"
          rx="10"
          fill="currentColor"
          opacity="0.06"
        />
        <line
          x1="10"
          y1="40"
          x2="230"
          y2="40"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.12"
        />
        <circle cx="28" cy="25" r="5" fill="currentColor" opacity="0.22" />
        <circle cx="44" cy="25" r="5" fill="currentColor" opacity="0.22" />
        <circle cx="60" cy="25" r="5" fill="currentColor" opacity="0.22" />
        <rect
          x="78"
          y="18"
          width="90"
          height="14"
          rx="7"
          fill="currentColor"
          opacity="0.08"
        />
        {/* Hero block */}
        <rect
          className="wd-rect1"
          x="22"
          y="52"
          width="196"
          height="28"
          rx="5"
          fill="currentColor"
        />
        {/* Content rows */}
        <rect
          className="wd-rect2"
          x="22"
          y="88"
          width="130"
          height="7"
          rx="3.5"
          fill="currentColor"
          opacity="0.1"
        />
        <rect
          className="wd-rect2"
          x="22"
          y="100"
          width="100"
          height="7"
          rx="3.5"
          fill="currentColor"
          opacity="0.1"
        />
        {/* Card grid */}
        <rect
          className="wd-rect3"
          x="22"
          y="118"
          width="90"
          height="50"
          rx="5"
          fill="currentColor"
        />
        <rect
          className="wd-rect3"
          x="122"
          y="118"
          width="96"
          height="50"
          rx="5"
          fill="currentColor"
        />
        {/* Scan line */}
        <line
          className="wd-scan-line"
          x1="22"
          y1="56"
          x2="218"
          y2="56"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.35"
        />
        {/* Blinking cursor */}
        <rect
          className="wd-cursor"
          x="22"
          y="93"
          width="7"
          height="13"
          rx="1.5"
          fill="currentColor"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

function DigitalProductSVG() {
  return (
    <svg viewBox="0 0 240 185" fill="none" className="art-svg h-full w-full">
      <style>{`
        .dp-phone { transform-origin: 120px 92px; }
        .dp-orbit1 { animation: dp-orbit 6s linear infinite; transform-origin: 50px 65px; }
        .dp-orbit2 { animation: dp-orbit 8s linear infinite reverse; transform-origin: 190px 120px; }
        .dp-pulse  { animation: dp-pulse 2s ease-in-out infinite; }
        @keyframes dp-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dp-pulse {
          0%,100% { opacity: 0.22; r: 4; }
          50%     { opacity: 0.55; r: 6; }
        }
        .art-card:hover .dp-screen {
          animation: dp-shimmer 0.6s ease forwards;
        }
        @keyframes dp-shimmer {
          0%   { opacity: 0.07; }
          50%  { opacity: 0.22; }
          100% { opacity: 0.12; }
        }
      `}</style>
      {/* Orbit rings */}
      <circle
        className="dp-orbit1"
        cx="50"
        cy="65"
        r="25"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.13"
      />
      <circle
        className="dp-orbit2"
        cx="190"
        cy="120"
        r="30"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.1"
      />
      {/* Orbital node dots */}
      <circle
        className="dp-pulse"
        cx="50"
        cy="40"
        r="4"
        fill="currentColor"
        opacity="0.32"
      />
      <circle cx="190" cy="90" r="4" fill="currentColor" opacity="0.22" />
      {/* Phone body */}
      <rect
        x="80"
        y="5"
        width="80"
        height="175"
        rx="12"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.28"
      />
      <rect
        x="104"
        y="12"
        width="32"
        height="5"
        rx="2.5"
        fill="currentColor"
        opacity="0.18"
      />
      {/* Screen content */}
      <rect
        className="dp-screen"
        x="84"
        y="26"
        width="72"
        height="44"
        rx="6"
        fill="currentColor"
        opacity="0.1"
      />
      <rect
        x="84"
        y="78"
        width="34"
        height="30"
        rx="4"
        fill="currentColor"
        opacity="0.08"
      />
      <rect
        x="124"
        y="78"
        width="32"
        height="30"
        rx="4"
        fill="currentColor"
        opacity="0.08"
      />
      <rect
        x="84"
        y="116"
        width="72"
        height="7"
        rx="3.5"
        fill="currentColor"
        opacity="0.1"
      />
      <rect
        x="84"
        y="130"
        width="52"
        height="7"
        rx="3.5"
        fill="currentColor"
        opacity="0.07"
      />
      {/* Home indicator */}
      <circle
        cx="120"
        cy="169"
        r="5"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.2"
      />
      {/* Connectors */}
      <line
        x1="84"
        y1="55"
        x2="74"
        y2="65"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.13"
        strokeDasharray="2 3"
      />
      <line
        x1="156"
        y1="95"
        x2="186"
        y2="115"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
        strokeDasharray="2 3"
      />
    </svg>
  );
}

function DevelopmentSVG() {
  return (
    <svg viewBox="0 0 240 185" fill="none" className="art-svg h-full w-full">
      <style>{`
        .dev-line { stroke-dasharray: 120; stroke-dashoffset: 120; }
        .art-card:hover .dev-line {
          animation: dev-type 1s ease forwards;
        }
        @keyframes dev-type {
          to { stroke-dashoffset: 0; }
        }
        .dev-row { animation: dev-fade 4s ease-in-out infinite; }
        .dev-row:nth-child(odd)  { animation-delay: 0s; }
        .dev-row:nth-child(even) { animation-delay: 0.7s; }
        @keyframes dev-fade {
          0%,100% { opacity: 0.08; }
          50%     { opacity: 0.2; }
        }
        .dev-bracket { animation: dev-bracket-pulse 3s ease-in-out infinite; }
        @keyframes dev-bracket-pulse {
          0%,100% { opacity: 0.28; }
          50%     { opacity: 0.55; }
        }
      `}</style>
      <rect
        x="10"
        y="10"
        width="220"
        height="165"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.18"
      />
      <rect
        x="10"
        y="10"
        width="220"
        height="24"
        rx="8"
        fill="currentColor"
        opacity="0.05"
      />
      <circle cx="24" cy="22" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="37" cy="22" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="22" r="4" fill="currentColor" opacity="0.2" />
      {[
        [22, 46, 38, "dev-row"],
        [65, 46, 58, "dev-row"],
        [128, 46, 22, "dev-row"],
        [34, 60, 75, "dev-row"],
        [34, 74, 96, "dev-row"],
        [34, 74, 16, "dev-row"],
        [22, 88, 30, "dev-row"],
        [57, 88, 90, "dev-row"],
        [34, 102, 60, "dev-row"],
        [22, 116, 45, "dev-row"],
        [72, 116, 50, "dev-row"],
        [34, 130, 80, "dev-row"],
        [22, 144, 38, "dev-row"],
      ].map(([x, y, w, cls], k) => (
        <rect
          key={k}
          className={cls}
          x={x}
          y={y}
          width={w}
          height="5"
          rx="2.5"
          fill="currentColor"
          opacity="0.1"
        />
      ))}
      {/* Animated type-on line */}
      <line
        className="dev-line"
        x1="22"
        y1="60"
        x2="122"
        y2="60"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
        strokeLinecap="round"
      />
      {/* Bracket pair */}
      <path
        className="dev-bracket"
        d="M 170 50 L 158 97 L 170 144"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.28"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="dev-bracket"
        d="M 185 50 L 197 97 L 185 144"
        stroke="currentColor"
        strokeWidth="2.2"
        opacity="0.28"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UiUxSVG() {
  return (
    <svg viewBox="0 0 240 185" fill="none" className="art-svg h-full w-full">
      <style>{`
        .ux-arc { stroke-dasharray: 502; stroke-dashoffset: 502; }
        .art-card:hover .ux-arc1 { animation: ux-draw 0.8s 0.0s ease forwards; }
        .art-card:hover .ux-arc2 { animation: ux-draw 0.8s 0.15s ease forwards; }
        .art-card:hover .ux-arc3 { animation: ux-draw 0.8s 0.3s ease forwards; }
        .art-card:hover .ux-arc4 { animation: ux-draw 0.8s 0.45s ease forwards; }
        .art-card:hover .ux-arc5 { animation: ux-draw 0.8s 0.6s ease forwards; }
        @keyframes ux-draw { to { stroke-dashoffset: 0; } }
        .ux-node { animation: ux-node-pulse 2.5s ease-in-out infinite; }
        @keyframes ux-node-pulse {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.35); }
        }
        .ux-node:nth-child(2) { animation-delay: 0.4s; }
        .ux-node:nth-child(3) { animation-delay: 0.8s; }
        .ux-node:nth-child(4) { animation-delay: 1.2s; }
      `}</style>
      {[160, 125, 92, 62, 36].map((r, i) => (
        <circle
          key={i}
          className={`ux-arc ux-arc${i + 1}`}
          cx="120"
          cy="185"
          r={r}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity={0.07 + i * 0.04}
        />
      ))}
      {/* Central user */}
      <circle cx="120" cy="176" r="12" fill="currentColor" opacity="0.18" />
      <path
        d="M 100 195 Q 120 183 140 195"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Animated nodes */}
      {[
        [164, 142, 5, 0.32],
        [75, 128, 5, 0.32],
        [192, 88, 4, 0.22],
        [47, 78, 4, 0.22],
      ].map(([cx, cy, r, o], i) => (
        <circle
          key={i}
          className="ux-node"
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          opacity={o}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {/* Connectors */}
      <line
        x1="120"
        y1="176"
        x2="164"
        y2="142"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        strokeDasharray="3 3"
      />
      <line
        x1="120"
        y1="176"
        x2="75"
        y2="128"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        strokeDasharray="3 3"
      />
      <line
        x1="164"
        y1="142"
        x2="192"
        y2="88"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
        strokeDasharray="2 4"
      />
      <line
        x1="75"
        y1="128"
        x2="47"
        y2="78"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.1"
        strokeDasharray="2 4"
      />
    </svg>
  );
}

function BrandIdentitySVG() {
  return (
    <svg viewBox="0 0 240 185" fill="none" className="art-svg h-full w-full">
      <style>{`
        .bi-letter { transition: opacity 0.4s ease, filter 0.4s ease; }
        .art-card:hover .bi-letter-fill {
          animation: bi-reveal 0.7s ease forwards;
        }
        @keyframes bi-reveal {
          from { opacity: 0.1; }
          to   { opacity: 0.22; }
        }
        .art-card:hover .bi-guide { opacity: 0.25 !important; }
        .bi-dot { animation: bi-dot-shift 4s ease-in-out infinite; }
        .bi-dot:nth-child(2) { animation-delay: 0.5s; }
        .bi-dot:nth-child(3) { animation-delay: 1s; }
        @keyframes bi-dot-shift {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.5); }
        }
      `}</style>
      {/* W fill (thick) */}
      <path
        className="bi-letter bi-letter-fill"
        d="M 18 28 L 60 157 L 98 68 L 120 118 L 142 68 L 180 157 L 222 28"
        stroke="currentColor"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.1"
      />
      {/* W outline */}
      <path
        className="bi-letter"
        d="M 18 28 L 60 157 L 98 68 L 120 118 L 142 68 L 180 157 L 222 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.28"
      />
      {/* Guide lines */}
      <line
        className="bi-guide"
        x1="8"
        y1="157"
        x2="232"
        y2="157"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        style={{ transition: "opacity 0.4s" }}
      />
      <line
        className="bi-guide"
        x1="8"
        y1="28"
        x2="232"
        y2="28"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.1"
        style={{ transition: "opacity 0.4s" }}
      />
      <line
        className="bi-guide"
        x1="8"
        y1="24"
        x2="8"
        y2="162"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        style={{ transition: "opacity 0.4s" }}
      />
      <line
        className="bi-guide"
        x1="232"
        y1="24"
        x2="232"
        y2="162"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
        style={{ transition: "opacity 0.4s" }}
      />
      {/* Color swatches */}
      <circle
        className="bi-dot"
        cx="12"
        cy="175"
        r="5"
        fill="currentColor"
        opacity="0.28"
        style={{ transformOrigin: "12px 175px" }}
      />
      <circle
        className="bi-dot"
        cx="26"
        cy="175"
        r="5"
        fill="currentColor"
        opacity="0.18"
        style={{ transformOrigin: "26px 175px" }}
      />
      <circle
        className="bi-dot"
        cx="40"
        cy="175"
        r="5"
        fill="currentColor"
        opacity="0.1"
        style={{ transformOrigin: "40px 175px" }}
      />
    </svg>
  );
}

function CreativeContentSVG() {
  return (
    <svg viewBox="0 0 240 185" fill="none" className="art-svg h-full w-full">
      <style>{`
        .cc-play { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1); transform-origin: 120px 92px; }
        .art-card:hover .cc-play { transform: scale(1.18); }
        .cc-frame { animation: cc-flicker 3s ease-in-out infinite; }
        .cc-frame:nth-child(2) { animation-delay: 0.4s; }
        .cc-frame:nth-child(3) { animation-delay: 0.8s; }
        @keyframes cc-flicker {
          0%,100% { opacity: 0.07; }
          45%,55% { opacity: 0.18; }
        }
        .cc-sprocket { animation: cc-roll 1.8s linear infinite; transform-origin: 23px 100px; }
        .cc-sprocketR { animation: cc-roll 1.8s linear infinite; transform-origin: 217px 100px; }
        @keyframes cc-roll {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .art-card:hover .cc-ring { animation: cc-ping 0.6s ease forwards; }
        @keyframes cc-ping {
          0%   { r: 22; opacity: 0.2; }
          100% { r: 34; opacity: 0; }
        }
      `}</style>
      {/* Strip body */}
      <rect
        x="10"
        y="42"
        width="220"
        height="101"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.22"
      />
      {/* Sprocket holes */}
      {[52, 72, 92, 112].map((y, i) => (
        <rect
          key={`sl${i}`}
          x="16"
          y={y}
          width="14"
          height="12"
          rx="3"
          fill="currentColor"
          opacity="0.12"
        />
      ))}
      {[52, 72, 92, 112].map((y, i) => (
        <rect
          key={`sr${i}`}
          x="210"
          y={y}
          width="14"
          height="12"
          rx="3"
          fill="currentColor"
          opacity="0.12"
        />
      ))}
      {/* Film frames */}
      <rect
        className="cc-frame"
        x="38"
        y="50"
        width="50"
        height="85"
        rx="4"
        fill="currentColor"
      />
      <rect
        className="cc-frame"
        x="96"
        y="50"
        width="48"
        height="85"
        rx="4"
        fill="currentColor"
      />
      <rect
        className="cc-frame"
        x="152"
        y="50"
        width="50"
        height="85"
        rx="4"
        fill="currentColor"
      />
      {/* Play button */}
      <g className="cc-play">
        <circle
          className="cc-ring"
          cx="120"
          cy="92"
          r="22"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.2"
        />
        <path
          d="M 113 83 L 132 92 L 113 101 Z"
          fill="currentColor"
          opacity="0.38"
        />
      </g>
      {/* Starburst above */}
      {[0, 45, 90, 135].map((deg, i) => (
        <line
          key={i}
          x1={120 + Math.cos((deg * Math.PI) / 180) * 8}
          y1={19 + Math.sin((deg * Math.PI) / 180) * 8}
          x2={120 + Math.cos((deg * Math.PI) / 180) * 18}
          y2={19 + Math.sin((deg * Math.PI) / 180) * 18}
          stroke="currentColor"
          strokeWidth={i % 2 === 0 ? "2" : "1.4"}
          opacity={i % 2 === 0 ? "0.22" : "0.13"}
        />
      ))}
      {/* Bottom label strips */}
      <rect
        x="38"
        y="148"
        width="164"
        height="8"
        rx="4"
        fill="currentColor"
        opacity="0.08"
      />
      <rect
        x="38"
        y="161"
        width="100"
        height="6"
        rx="3"
        fill="currentColor"
        opacity="0.06"
      />
    </svg>
  );
}

const SVG_COMPONENTS = [
  WebDesignSVG,
  DigitalProductSVG,
  DevelopmentSVG,
  UiUxSVG,
  BrandIdentitySVG,
  CreativeContentSVG,
];

function StickyNav({ activeService, onNavClick, sectionRef }) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useGSAP(
    () => {
      if (!wrapperRef.current || !innerRef.current || !sectionRef.current)
        return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 120px",
        end: "bottom bottom",
        pin: innerRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        // Disable on mobile/tablet (below 1024px)
        onUpdate: (self) => {
          if (window.innerWidth < 1024) {
            self.disable();
          } else {
            self.enable();
          }
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <aside className="hidden w-48 shrink-0 lg:block xl:w-52">
      {/* This wrapper fills the full height of the content column */}
      <div ref={wrapperRef} style={{ height: "100%", position: "relative" }}>
        {/* This inner div is the "sticky" panel */}
        <div ref={innerRef} style={{ willChange: "transform" }}>
          <p
            className="font-accent mb-5"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
            }}
          >
            Services
          </p>

          <nav className="flex flex-col">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onNavClick(i)}
                className={`snav-item flex items-center gap-3 py-3 pl-4 text-left ${activeService === i ? "active" : ""}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color:
                    activeService === i
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                }}
              >
                <span
                  className="font-accent"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    opacity: 0.55,
                    minWidth: "18px",
                  }}
                >
                  {s.num}
                </span>
                <span
                  className="font-body"
                  style={{
                    fontSize: "13px",
                    fontWeight: activeService === i ? 600 : 400,
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ExpertisePage() {
  const { canPlayEntrance } = useLoader();

  const containerRef = useRef(null);
  const tagRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const panelRefs = useRef([]);
  const explorerSectionRef = useRef(null); // passed to StickyNav

  const [activeService, setActiveService] = useState(0);

  // Safety net
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      containerRef.current.querySelectorAll(".anim-el").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver: update active nav item as user scrolls
  useEffect(() => {
    const observers = [];
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveService(i);
        },
        { threshold: 0.25, rootMargin: "0px 0px -45% 0px" }
      );
      obs.observe(panel);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToPanel = useCallback((index) => {
    panelRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  // GSAP entrance + scroll-triggered panel reveals
  useGSAP(
    () => {
      if (!canPlayEntrance) return;

      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.2 })
        .fromTo(
          tagRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }
        )
        .fromTo(
          headlineRef.current?.querySelectorAll(".split-word"),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 },
          "-=0.45"
        )
        .fromTo(
          sublineRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            onComplete: () => ScrollTrigger.refresh(),
          },
          "-=0.6"
        );

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const base = { scrollTrigger: { trigger: panel, start: "top 80%" } };
        const q = (sel) => panel.querySelector(sel);
        const qa = (sel) => panel.querySelectorAll(sel);

        const line = q(".panel-line");
        const num = q(".panel-num");
        const title = q(".panel-title");
        const desc = q(".panel-desc");
        const tags = qa(".panel-tag");
        const vis = q(".panel-visual");

        if (line)
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              transformOrigin: "left",
              ...base,
            }
          );
        if (num)
          gsap.fromTo(
            num,
            { opacity: 0, scale: 0.88 },
            { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", ...base }
          );
        if (title)
          gsap.fromTo(
            title,
            { y: 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 75%" },
            }
          );
        if (desc)
          gsap.fromTo(
            desc,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 72%" },
            }
          );
        if (tags.length)
          gsap.fromTo(
            tags,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.055,
              duration: 0.55,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 68%" },
            }
          );
        if (vis)
          gsap.fromTo(
            vis,
            { x: 36, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 74%" },
            }
          );
      });
    },
    { scope: containerRef, dependencies: [canPlayEntrance] }
  );

  return (
    <main
      ref={containerRef}
      className="bg-bg-primary text-text-primary min-h-screen"
    >
      <style>{`
        @keyframes marquee-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-slide 32s linear infinite;
          will-change: transform;
        }
        .marquee-inner:hover { animation-play-state: paused; }

        /* Left-nav active indicator */
        .snav-item { position: relative; transition: color 0.22s ease; }
        .snav-item::before {
          content: "";
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 2px; height: 55%;
          background: var(--color-accent);
          border-radius: 0 2px 2px 0;
          transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .snav-item.active::before,
        .snav-item:hover::before { transform: translateY(-50%) scaleY(1); }
        .snav-item.active { color: var(--color-accent) !important; }
        .snav-item:hover:not(.active) { color: var(--color-text-primary) !important; }

        /* Art card hover — lifts the card */
        .art-card {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.35s ease,
                      border-color 0.3s ease;
        }
        .art-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 20px 56px -12px rgba(163,230,53,0.18);
          border-color: rgba(163,230,53,0.35) !important;
        }
      `}</style>

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pt-36 pb-0 md:px-12 md:pt-44">
        {/* Dot-grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.55,
          }}
        />
        {/* Accent bloom */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 42% at 72% 55%, rgba(163,230,53,0.08) 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div ref={tagRef} className="anim-el mb-10 opacity-0">
            <Tag>Expertise</Tag>
          </div>

          <h1
            ref={headlineRef}
            className="font-big anim-el mb-10"
            style={{
              fontSize: "clamp(3.6rem, 10.5vw, 10rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
            }}
          >
            <div className="overflow-hidden">
              <span className="split-word inline-block">Capabilities</span>
            </div>
            <div className="overflow-hidden">
              <span
                className="split-word inline-block italic"
                style={{ color: "var(--color-accent)" }}
              >
                that drive
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="split-word inline-block">growth.</span>
            </div>
          </h1>

          <div
            ref={sublineRef}
            className="anim-el flex flex-col gap-8 opacity-0 md:flex-row md:items-end md:justify-between"
          >
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "500px",
              }}
            >
              Strategy, design, and technology — combined to build brands people
              remember and digital products people love.
            </p>
            <div className="flex flex-col items-start gap-1 md:items-end">
              <span
                className="font-big"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  letterSpacing: "-0.04em",
                }}
              >
                06
              </span>
              <span
                className="font-accent"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-text-subtle)",
                }}
              >
                Core services
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES EXPLORER ════════════════════════════════════════════════ */}
      <section
        ref={explorerSectionRef}
        className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24"
      >
        <div className="flex items-start gap-0 lg:gap-20 xl:gap-28">
          {/* ── Sticky left nav — JS-pinned via useLenis ── */}
          <StickyNav
            activeService={activeService}
            onNavClick={scrollToPanel}
            sectionRef={explorerSectionRef}
          />

          {/* ── Service panels ── */}
          <div className="min-w-0 flex-1">
            {SERVICES.map((service, i) => {
              const SvgComponent = SVG_COMPONENTS[i];
              return (
                <div
                  key={service.id}
                  ref={(el) => (panelRefs.current[i] = el)}
                  style={{
                    paddingTop: i === 0 ? "0" : "clamp(4.5rem, 10vw, 8rem)",
                    paddingBottom: "clamp(4.5rem, 10vw, 8rem)",
                    borderBottom:
                      i < SERVICES.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                    position: "relative",
                  }}
                >
                  {/* Ghost number */}
                  <div
                    className="panel-num pointer-events-none absolute inset-0 flex items-start justify-end overflow-hidden select-none"
                    aria-hidden="true"
                  >
                    <span
                      className="font-big"
                      style={{
                        fontSize: "clamp(7rem, 20vw, 17rem)",
                        fontWeight: 900,
                        color: "var(--color-text-primary)",
                        opacity: 0.04,
                        letterSpacing: "-0.05em",
                        lineHeight: 0.85,
                      }}
                    >
                      {service.num}
                    </span>
                  </div>

                  {/* Top rule */}
                  <div
                    className="panel-line mb-8 h-px"
                    style={{
                      background: "var(--color-accent)",
                      opacity: 0.25,
                      width: "64px",
                      display: i === 0 ? "none" : "block",
                    }}
                  />

                  {/* Two-column grid */}
                  <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
                    {/* Text column */}
                    <div className="flex flex-col gap-7">
                      <div>
                        <span
                          className="font-accent mb-3 block"
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.22em",
                            color: "var(--color-accent)",
                            textTransform: "uppercase",
                          }}
                        >
                          {service.num}
                        </span>
                        <h2
                          className="panel-title font-big"
                          style={{
                            fontSize: "clamp(2rem, 4.5vw, 4rem)",
                            fontWeight: 900,
                            lineHeight: 0.95,
                            letterSpacing: "-0.03em",
                            textTransform: "uppercase",
                            color: "var(--color-text-primary)",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {service.title}
                        </h2>
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.95rem",
                            fontStyle: "italic",
                            color: "var(--color-accent)",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {service.tagline}
                        </p>
                      </div>

                      <p
                        className="panel-desc font-body"
                        style={{
                          fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.78,
                        }}
                      >
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.points.map((point) => (
                          <span
                            key={point}
                            className="panel-tag font-accent cursor-default"
                            style={{
                              display: "inline-block",
                              padding: "5px 13px",
                              borderRadius: "999px",
                              fontSize: "11px",
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              border: "1px solid var(--color-border)",
                              color: "var(--color-text-muted)",
                              transition:
                                "border-color 0.2s, color 0.2s, background 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                "var(--color-accent)";
                              e.currentTarget.style.color =
                                "var(--color-accent)";
                              e.currentTarget.style.background =
                                "rgba(163,230,53,0.06)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "var(--color-border)";
                              e.currentTarget.style.color =
                                "var(--color-text-muted)";
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Art column */}
                    <div className="panel-visual flex items-start justify-center pt-2 md:justify-end">
                      <div
                        className="art-card"
                        style={{
                          width: "100%",
                          maxWidth: "340px",
                          aspectRatio: "4 / 3",
                          border: "1px solid var(--color-border)",
                          borderRadius: "18px",
                          background: "var(--color-bg-card)",
                          position: "relative",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "24px",
                        }}
                      >
                        {/* Inner bloom */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "radial-gradient(55% 55% at 65% 35%, rgba(163,230,53,0.07) 0%, transparent 100%)",
                            borderRadius: "18px",
                            pointerEvents: "none",
                          }}
                        />
                        {/* Corner label */}
                        <span
                          className="font-accent"
                          style={{
                            position: "absolute",
                            top: "14px",
                            left: "16px",
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "var(--color-text-subtle)",
                            opacity: 0.6,
                          }}
                        >
                          {service.num}
                        </span>
                        {/* SVG */}
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            color: "var(--color-accent)",
                          }}
                        >
                          <SvgComponent />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STATS ════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col gap-2"
              style={{
                borderLeft: "2px solid var(--color-border)",
                paddingLeft: "1.25rem",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderLeftColor = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderLeftColor = "var(--color-border)")
              }
            >
              <span
                className="font-big"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.6rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                }}
              >
                {value}
              </span>
              <span
                className="font-accent"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-subtle)",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ══════════════════════════════════════════════════════════════ */}
      <ContactCTA />
    </main>
  );
}
