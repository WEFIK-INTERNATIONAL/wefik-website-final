"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

function NextjsIcon({ hovered }) {
  return (
    <svg viewBox="0 0 75 75" width="40" height="40" fill="none">
      <path
        d="M37.5 0C16.7845 0 0 16.7845 0 37.5C0 58.2155 16.7845 75 37.5 75C51.5283 75 63.8055 67.3182 70.4431 55.8821L28.1409 16.6366C27.2405 15.8041 26.2494 15.8427 26.2494 17.6534V51.5622C26.2494 53.3729 27.288 54.2483 29.0591 54.2483C30.8302 54.2483 31.8687 53.3344 31.8687 51.5622V27.6533L65.5147 59.8166C60.36 67.4338 52.1245 72.4688 42.6136 74.0309C39.6387 74.5209 36.5701 74.5513 33.5859 74.1209C25.334 73.1895 18.0673 69.4566 12.6363 64.0256C7.20524 58.5946 3.47235 51.3279 2.54095 43.0759C2.11051 40.0918 2.14095 37.0232 2.63102 34.0483C4.19308 24.5374 9.22808 16.3018 16.8453 11.1471C26.2166 4.79632 37.1643 2.52985 47.9366 4.38096"
        fill={hovered ? "#ffffff" : "currentColor"}
      />
      <path
        d="M72.1874 37.5C72.1874 34.5458 71.7966 31.6881 71.0664 28.9723L71.0664 28.9723C70.6219 27.3197 68.8687 26.5447 67.3516 27.3243C65.8346 28.104 65.5019 29.897 66.6083 31.1348C67.6534 33.1557 68.3079 35.2831 68.308 37.5C68.308 40.2443 67.5019 42.8443 66.1107 45.0519"
        fill={hovered ? "#ffffff" : "currentColor"}
      />
    </svg>
  );
}

function ReactIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#61dafb" : "currentColor"}
    >
      <path d="M12 9.861A2.139 2.139 0 1 0 12 14.139 2.139 2.139 0 1 0 12 9.861zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 0 0 1.363 3.578l.101.213-.101.213a23.307 23.307 0 0 0-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 0 1 1.182-3.046A24.752 24.752 0 0 1 5.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 0 0-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 0 0 1.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.64-2.294-4.315-3.046a24.788 24.788 0 0 1-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 0 0-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 0 0-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 0 1 3.233-.501 24.847 24.847 0 0 1 2.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zm9.589 20.362c-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 0 0 2.421-2.968l.135-.193.234-.02a23.63 23.63 0 0 0 3.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 0 1-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 0 1-3.234.501 24.674 24.674 0 0 1-2.051 2.545zM18.69 8.945l-.472-.119a23.479 23.479 0 0 0-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 0 0-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.823 6.855l-.133.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.686-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0 1 14.75 7.24zM7.206 22.677A2.38 2.38 0 0 1 6 22.369c-1.512-.871-1.812-3.369-.823-6.854l.132-.468.472.119c1.155.291 2.429.496 3.785.609l.235.02.134.193a23.596 23.596 0 0 0 2.422 2.968l.34.349-.34.349c-1.898 1.95-3.728 3.023-5.151 3.023zm-1.19-6.427c-.686 2.688-.509 4.681.485 5.254.987.563 2.843-.305 4.8-2.208a24.998 24.998 0 0 1-2.052-2.545 24.976 24.976 0 0 1-3.233-.501z" />
    </svg>
  );
}

function NuxtIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#00dc82" : "currentColor"}
    >
      <path d="M13.464 19.83h8.922c.283 0 .562-.073.807-.21a1.6 1.6 0 0 0 .591-.574a1.53 1.53 0 0 0 .216-.783a1.53 1.53 0 0 0-.217-.782L17.792 7.414a1.6 1.6 0 0 0-.591-.573a1.65 1.65 0 0 0-.807-.21c-.283 0-.562.073-.807.21a1.6 1.6 0 0 0-.59.573L13.463 9.99L10.47 4.953a1.6 1.6 0 0 0-.591-.573a1.65 1.65 0 0 0-.807-.21c-.284 0-.562.073-.807.21a1.6 1.6 0 0 0-.591.573L.216 17.481a1.53 1.53 0 0 0-.217.782c0 .275.074.545.216.783a1.6 1.6 0 0 0 .59.574c.246.137.525.21.808.21h5.6c2.22 0 3.856-.946 4.982-2.79l2.733-4.593l1.464-2.457l4.395 7.382h-5.859Zm-6.341-2.46l-3.908-.002l5.858-9.842l2.923 4.921l-1.957 3.29c-.748 1.196-1.597 1.632-2.916 1.632" />
    </svg>
  );
}

function StrapiIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="36"
      height="36"
      fill={hovered ? "#4945ff" : "currentColor"}
    >
      <path d="m23.327 15.205-.893-1.555-4.321 2.632 4.799-6.11.726-.426-.179-.27.33-.421-1.515-1.261-.693.883-13.992 8.186 5.173-6.221 9.636-5.282-.915-1.769-5.248 2.876 2.584-3.106-1.481-1.305-5.816 6.994-5.777 3.168 4.423-5.847 2.771-1.442-.88-1.789-8.075 4.203L6.186 4.43 4.648 3.198 0 9.349l.072.058.868 1.768 5.153-2.683-4.696 6.207.77.617.458.885 5.425-2.974-5.974 7.185 1.481 1.304.297-.358 14.411-8.459-4.785 6.094.078.065-.007.005.992 1.726 6.364-3.877-2.451 3.954 1.642 1.077L24 15.648z" />
    </svg>
  );
}

function VueIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#42b883" : "currentColor"}
    >
      <path d="M24 1.61h-9.94L12 5.16L9.94 1.61H0l12 20.78ZM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43Z" />
    </svg>
  );
}

function GatsbyIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#663399" : "currentColor"}
    >
      <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
    </svg>
  );
}

function AppwriteIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#a3e635" : "currentColor"}
    >
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
    </svg>
  );
}

function PythonIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#3776ab" : "currentColor"}
    >
      <path d="m14.25.18l.9.2l.73.26l.59.3l.45.32l.34.34l.25.34l.16.33l.1.3l.04.26l.02.2l-.01.13V8.5l-.05.63l-.13.55l-.21.46l-.26.38l-.3.31l-.33.25l-.35.19l-.35.14l-.33.1l-.3.07l-.26.04l-.21.02H8.77l-.69.05l-.59.14l-.5.22l-.41.21l-.33.32l-.27.35l-.2.36l-.15.37l-.1.35l-.07.32l-.04.27l-.02.21v3.06H3.17l-.21-.03l-.28-.07l-.32-.12l-.35-.18l-.36-.26l-.36-.36l-.35-.46l-.32-.59l-.28-.73l-.21-.88l-.14-1.05l-.05-1.23l.06-1.22l.16-1.04l.24-.87l.32-.71l.36-.57l.4-.44l.42-.33l.42-.24l.4-.16l.36-.1l.32-.05l.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75l-.02-.37l.05-.34l.11-.31l.17-.28l.25-.26l.31-.23l.38-.2l.44-.18l.51-.15l.58-.12l.64-.1l.71-.06l.77-.04l.84-.02 1.27.05zm-6.3 1.98l-.23.33l-.08.41l.08.41l.23.34l.33.22l.41.09l.41-.09l.33-.22l.23-.34l.08-.41l-.08-.41l-.23-.33l-.33-.22l-.41-.09l-.41.09zm13.09 3.95l.28.06l.32.12l.35.18l.36.27l.36.35l.35.47l.32.59l.28.73l.21.88l.14 1.04l.05 1.23l-.06 1.23l-.16 1.04l-.24.86l-.32.71l-.36.57l-.4.45l-.42.33l-.42.24l-.4.16l-.36.09l-.32.05l-.24.02l-.16-.01h-8.22v.82h5.84l.01 2.76l.02.36l-.05.34l-.11.31l-.17.29l-.25.25l-.31.24l-.38.2l-.44.17l-.51.15l-.58.13l-.64.09l-.71.07l-.77.04l-.84.01l-1.27-.04l-1.07-.14l-.9-.2l-.73-.25l-.59-.3l-.45-.33l-.34-.34l-.25-.34l-.16-.33l-.1-.3l-.04-.25l-.02-.2l.01-.13v-5.34l.05-.64l.13-.54l.21-.46l.26-.38l.3-.32l.33-.24l.35-.2l.35-.14l.33-.1l.3-.06l.26-.04l.21-.02l.13-.01h5.84l.69-.05l.59-.14l.5-.21l.41-.28l.33-.32l.27-.35l.2-.36l.15-.36l.1-.35l.07-.32l.04-.28l.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33l-.08.41l.08.41l.23.33l.33.23l.41.08l.41-.08l.33-.23l.23-.33l.08-.41l-.08-.41l-.23-.33l-.33-.23l-.41-.08l-.41.08z" />
    </svg>
  );
}

function AngularIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#dd0031" : "currentColor"}
    >
      <path d="M16.712 17.711H7.288l-1.204 2.916L12 24l5.916-3.373-1.204-2.916ZM14.692 0l7.832 16.855.814-12.856L14.692 0ZM9.308 0 .662 3.999l.814 12.856L9.308 0Zm-.405 13.93h6.198L12 6.396 8.903 13.93Z" />
    </svg>
  );
}

function ViteIcon({ hovered }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill={hovered ? "#646cff" : "currentColor"}
    >
      <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746a.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z" />
    </svg>
  );
}

const ROW_ONE = [
  { name: "Next.js", Icon: NextjsIcon, color: "#ffffff" },
  { name: "React", Icon: ReactIcon, color: "#61dafb" },
  { name: "Nuxt", Icon: NuxtIcon, color: "#00dc82" },
  { name: "Strapi", Icon: StrapiIcon, color: "#4945ff" },
];
const ROW_TWO = [
  { name: "Vue", Icon: VueIcon, color: "#42b883" },
  { name: "Gatsby", Icon: GatsbyIcon, color: "#663399" },
  { name: "Appwrite", Icon: AppwriteIcon, color: "#a3e635" },
  { name: "Python", Icon: PythonIcon, color: "#3776ab" },
  { name: "Angular", Icon: AngularIcon, color: "#dd0031" },
  { name: "Vite", Icon: ViteIcon, color: "#646cff" },
];
const ALL = [...ROW_ONE, ...ROW_TWO];
const MARQUEE_ITEMS = [...ALL, ...ALL, ...ALL, ...ALL];

function GridCell({
  name,
  Icon,
  color,
  isDark,
  noBorderRight = false,
  noBorderBottom = false,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex min-w-0 flex-1 cursor-default flex-col items-center justify-center overflow-hidden px-4 py-12 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${noBorderRight ? "border-r-0" : "border-r"} ${noBorderBottom ? "border-b-0" : "border-b"} ${isDark ? "border-[rgba(255,255,255,0.07)]" : "border-[rgba(0,0,0,0.08)]"} ${
        hovered
          ? isDark
            ? "bg-[rgba(255,255,255,0.02)]"
            : "bg-[rgba(0,0,0,0.015)]"
          : "bg-transparent"
      } ${isDark ? "text-[rgba(255,255,255,0.2)]" : "text-[rgba(10,20,5,0.25)]"} `}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div
        className="z-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transform: hovered ? "scale(1.15)" : "scale(1)",
        }}
      >
        <Icon hovered={hovered} />
      </div>
    </div>
  );
}

function MarqueeItem({ name, Icon, color, isDark }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex shrink-0 cursor-default flex-col items-center justify-center px-8 ${isDark ? "text-[rgba(255,255,255,0.28)]" : "text-[rgba(10,20,5,0.28)]"} `}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div
        className="flex h-12 items-center transition-transform duration-300 ease-in-out"
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <Icon hovered={hovered} />
      </div>
    </div>
  );
}

export default function TechTicker() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  const isDark = !mounted ? true : resolvedTheme === "dark";
  const borderClass = isDark
    ? "border-[rgba(255,255,255,0.07)]"
    : "border-[rgba(0,0,0,0.08)]";

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const oneSet = track.scrollWidth / 4;
      gsap.set(track, { x: 0 });

      tweenRef.current = gsap.to(track, {
        x: -oneSet,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % oneSet),
        },
      });

      return () => tweenRef.current?.kill();
    },
    { dependencies: [] }
  );

  return (
    <section
      className={`bg-bg-primary mt-20 w-full border-t border-b ${borderClass} `}
    >
      <div className="relative mx-auto hidden max-w-[1400px] border-r border-l border-inherit md:block">
        {[0, 1].map((row) => (
          <div
            key={row}
            className="absolute right-0 left-0 z-10 h-0"
            style={{ top: row === 0 ? "50%" : "100%" }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((col) => (
              <div
                key={col}
                className="pointer-events-none absolute h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(col * 100) / 6}%` }}
              >
                <div
                  className={`absolute top-[5px] right-0 left-0 h-px ${isDark ? "bg-[rgba(255,255,255,0.07)]" : "bg-[rgba(0,0,0,0.08)]"}`}
                />
                <div
                  className={`w-1px absolute top-0 bottom-0 left-[5px] ${isDark ? "bg-[rgba(255,255,255,0.07)]" : "bg-[rgba(0,0,0,0.08)]"}`}
                />
              </div>
            ))}
          </div>
        ))}
        <div className={`flex border-b ${borderClass}`}>
          <div
            className={`flex-[2_1_0%] border-r px-8 py-12 ${borderClass} flex flex-col justify-center gap-4 bg-[rgba(163,230,53,0.015)]`}
          >
            <p className="font-big text-text-primary m-0 text-[clamp(1.2rem,2.5vw,1.95rem)] leading-[0.9] font-black -tracking-[0.04em] uppercase">
              Your stack,
              <br />
              our expertise.
            </p>
            <div className="bg-accent h-[3px] w-10 rounded-[1px]" />
          </div>

          {ROW_ONE.map((tech, i) => (
            <GridCell
              key={tech.name}
              {...tech}
              isDark={isDark}
              noBorderRight={i === ROW_ONE.length - 1}
              noBorderBottom={false}
            />
          ))}
        </div>
        <div className="flex">
          {ROW_TWO.map((tech, i) => (
            <GridCell
              key={tech.name}
              {...tech}
              isDark={isDark}
              noBorderRight={i === ROW_TWO.length - 1}
              noBorderBottom={true}
            />
          ))}
        </div>
      </div>
      <div className="relative flex h-20 items-center overflow-hidden p-0 md:hidden">
        <div
          className={`border-r pr-4 pl-5 ${borderClass} relative z-20 flex h-full shrink-0 flex-col justify-center`}
          style={{
            backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
            boxShadow: isDark
              ? "15px 0 25px -10px rgba(0,0,0,0.8)"
              : "15px 0 25px -10px rgba(0,0,0,0.1)",
          }}
        >
          <p className="font-big text-text-primary relative z-10 m-0 text-[12px] leading-[1.1] font-black whitespace-nowrap uppercase">
            Your stack,
            <br />
            our expertise.
          </p>
        </div>
        <div
          className="relative z-10 flex h-full grow items-center overflow-hidden"
          onMouseEnter={() => {
            tweenRef.current?.pause();
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            tweenRef.current?.resume();
            pausedRef.current = false;
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
          >
            {MARQUEE_ITEMS.map((tech, i) => (
              <MarqueeItem
                key={`${tech.name}-${i}`}
                {...tech}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-25 w-10"
          style={{
            background: `linear-gradient(to left, var(--color-bg-primary), transparent)`,
          }}
        />
      </div>
    </section>
  );
}
