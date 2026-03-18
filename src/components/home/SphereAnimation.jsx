"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const paths = [
  "M361.604 361.238c-24.407 24.408-51.119 37.27-59.662 28.727-8.542-8.543 4.319-35.255 28.726-59.663 24.408-24.407 51.12-37.269 59.663-28.726 8.542 8.543-4.319 35.255-28.727 59.662z",
  "M360.72 360.354c-35.879 35.88-75.254 54.677-87.946 41.985-12.692-12.692 6.105-52.067 41.985-87.947 35.879-35.879 75.254-54.676 87.946-41.984 12.692 12.692-6.105 52.067-41.984 87.946z",
  "M357.185 356.819c-44.91 44.91-94.376 68.258-110.485 52.149-16.11-16.11 7.238-65.575 52.149-110.485 44.91-44.91 94.376-68.259 110.485-52.15 16.11 16.11-7.239 65.576-52.149 110.486z",
  "M350.998 350.632c-53.21 53.209-111.579 81.107-130.373 62.313-18.794-18.793 9.105-77.163 62.314-130.372 53.209-53.21 111.579-81.108 130.373-62.314 18.794 18.794-9.105 77.164-62.314 130.373z",
  "M343.043 342.677c-59.8 59.799-125.292 91.26-146.283 70.268-20.99-20.99 10.47-86.483 70.269-146.282 59.799-59.8 125.292-91.26 146.283-70.269 20.99 20.99-10.47 86.484-70.27 146.283z",
  "M334.646 334.28c-65.169 65.169-136.697 99.3-159.762 76.235-23.065-23.066 11.066-94.593 76.235-159.762s136.697-99.3 159.762-76.235c23.065 23.065-11.066 94.593-76.235 159.762z",
  "M324.923 324.557c-69.806 69.806-146.38 106.411-171.031 81.76-24.652-24.652 11.953-101.226 81.759-171.032 69.806-69.806 146.38-106.411 171.031-81.76 24.652 24.653-11.953 101.226-81.759 171.032z",
  "M312.99 312.625c-73.222 73.223-153.555 111.609-179.428 85.736-25.872-25.872 12.514-106.205 85.737-179.428s153.556-111.609 179.429-85.737c25.872 25.873-12.514 106.205-85.737 179.429z",
  "M300.175 299.808c-75.909 75.909-159.11 115.778-185.837 89.052-26.726-26.727 13.143-109.929 89.051-185.837 75.908-75.908 159.11-115.778 185.837-89.051 26.726 26.726-13.143 109.928-89.051 185.836z",
  "M284.707 284.34c-77.617 77.617-162.303 118.773-189.152 91.924-26.848-26.848 14.308-111.534 91.924-189.15C265.096 109.496 349.782 68.34 376.63 95.188c26.849 26.849-14.307 111.535-91.923 189.151z",
  "M269.239 267.989c-78.105 78.104-163.187 119.656-190.035 92.807-26.849-26.848 14.703-111.93 92.807-190.035 78.105-78.104 163.187-119.656 190.035-92.807 26.849 26.848-14.703 111.93-92.807 190.035z",
  "M252.887 252.52C175.27 330.138 90.584 371.294 63.736 344.446 36.887 317.596 78.043 232.91 155.66 155.293 233.276 77.677 317.962 36.521 344.81 63.37c26.85 26.848-14.307 111.534-91.923 189.15z",
  "M236.977 236.61C161.069 312.52 77.867 352.389 51.14 325.663c-26.726-26.727 13.143-109.928 89.052-185.837 75.908-75.908 159.11-115.777 185.836-89.05 26.727 26.726-13.143 109.928-89.051 185.836z",
  "M221.067 220.7C147.844 293.925 67.51 332.31 41.639 306.439c-25.873-25.873 12.513-106.206 85.736-179.429C200.6 53.786 280.931 15.4 306.804 41.272c25.872 25.873-12.514 106.206-85.737 179.429z",
  "M205.157 204.79c-69.806 69.807-146.38 106.412-171.031 81.76-24.652-24.652 11.953-101.225 81.759-171.031 69.806-69.807 146.38-106.411 171.031-81.76 24.652 24.652-11.953 101.226-81.759 171.032z",
  "M189.247 188.881c-65.169 65.169-136.696 99.3-159.762 76.235-23.065-23.065 11.066-94.593 76.235-159.762s136.697-99.3 159.762-76.235c23.065 23.065-11.066 94.593-76.235 159.762z",
  "M173.337 172.971c-59.799 59.8-125.292 91.26-146.282 70.269-20.991-20.99 10.47-86.484 70.268-146.283 59.8-59.799 125.292-91.26 146.283-70.269 20.99 20.991-10.47 86.484-70.269 146.283z",
  "M157.427 157.061c-53.209 53.21-111.578 81.108-130.372 62.314-18.794-18.794 9.104-77.164 62.313-130.373 53.21-53.209 111.58-81.108 130.373-62.314 18.794 18.794-9.105 77.164-62.314 130.373z",
  "M141.517 141.151c-44.91 44.91-94.376 68.259-110.485 52.15-16.11-16.11 7.239-65.576 52.15-110.486 44.91-44.91 94.375-68.258 110.485-52.15 16.109 16.11-7.24 65.576-52.15 110.486z",
  "M125.608 125.241c-35.88 35.88-75.255 54.677-87.947 41.985-12.692-12.692 6.105-52.067 41.985-87.947C115.525 43.4 154.9 24.603 167.592 37.295c12.692 12.692-6.105 52.067-41.984 87.946z",
  "M109.698 109.332c-24.408 24.407-51.12 37.268-59.663 28.726-8.542-8.543 4.319-35.255 28.727-59.662 24.407-24.408 51.12-37.27 59.662-28.727 8.543 8.543-4.319 35.255-28.726 59.663z",
];

export default function SphereAnimation() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isDark = !mounted ? true : resolvedTheme === "dark";

  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const pathRefs = useRef([]);
  const tickerRef = useRef(null);
  const grad0Ref = useRef(null);
  const grad1Ref = useRef(null);
  const grad2Ref = useRef(null);

  const activeColor = isDark
    ? { r: 187, g: 244, b: 81, a: 1 }
    : { r: 81, g: 115, b: 26, a: 1 };
  const restingColor = isDark
    ? { r: 80, g: 80, b: 80, a: 0.35 }
    : { r: 120, g: 140, b: 80, a: 0.25 };

  const gradStops = React.useMemo(
    () =>
      isDark
        ? ["#373734", "#242423", "#0D0D0C"]
        : ["#d4e8a0", "#c5dc88", "#a3c45a"],
    [isDark]
  );

  useEffect(() => {
    if (grad0Ref.current)
      grad0Ref.current.setAttribute("stop-color", gradStops[0]);
    if (grad1Ref.current)
      grad1Ref.current.setAttribute("stop-color", gradStops[1]);
    if (grad2Ref.current)
      grad2Ref.current.setAttribute("stop-color", gradStops[2]);
  }, [gradStops, isDark]);

  useGSAP(
    () => {
      const group = groupRef.current;
      const pathEls = pathRefs.current;
      if (!group || !pathEls.length) return;

      gsap.to(group, {
        rotation: "+=360",
        duration: 40,
        ease: "none",
        repeat: -1,
        svgOrigin: "220 220",
      });

      const gradEl = document.getElementById("sphereGradientGsap");
      if (gradEl) {
        gsap.to(gradEl, {
          attr: { y2: "75%" },
          duration: 15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(gradEl, {
          attr: { x1: "25%", x2: "25%" },
          duration: 15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      pathEls.forEach((el, i) => {
        if (!el) return;
        const len = el.getTotalLength();
        gsap.set(el, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 3.9,
          delay: i * 0.19,
          ease: "power3.inOut",
        });
      });
      tickerRef.current = gsap.ticker.add((time) => {
        pathEls.forEach((el, i) => {
          if (!el) return;
          const t = time * 1000;
          const percent = (1 - Math.sin(i * 0.35 + 0.0022 * t)) / 2;

          const tx = 2 + (-4 - 2) * percent;
          const ty = 2 + (-4 - 2) * percent;
          gsap.set(el, { x: tx, y: ty });

          const r = Math.round(
            activeColor.r + (restingColor.r - activeColor.r) * percent
          );
          const g = Math.round(
            activeColor.g + (restingColor.g - activeColor.g) * percent
          );
          const b = Math.round(
            activeColor.b + (restingColor.b - activeColor.b) * percent
          );
          const a = +(
            activeColor.a +
            (restingColor.a - activeColor.a) * percent
          ).toFixed(3);
          el.setAttribute("stroke", `rgba(${r},${g},${b},${a})`);
        });
      });

      return () => {
        if (tickerRef.current) {
          gsap.ticker.remove(tickerRef.current);
        }
      };
    },
    { scope: containerRef, dependencies: [isDark] }
  );

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "50%",
        position: "absolute",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          maxWidth: "580px",
          aspectRatio: "1",
        }}
      >
        <svg
          viewBox="0 0 440 440"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <linearGradient
              id="sphereGradientGsap"
              x1="5%"
              x2="5%"
              y1="0%"
              y2="15%"
            >
              <stop ref={grad0Ref} stopColor={gradStops[0]} offset="0%" />
              <stop ref={grad1Ref} stopColor={gradStops[1]} offset="50%" />
              <stop ref={grad2Ref} stopColor={gradStops[2]} offset="100%" />
            </linearGradient>
          </defs>

          <g ref={groupRef}>
            {paths.map((d, i) => (
              <path
                key={i}
                ref={(el) => (pathRefs.current[i] = el)}
                d={d}
                fill="url(#sphereGradientGsap)"
                strokeWidth={1}
                stroke="rgba(80,80,80,0.35)"
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
