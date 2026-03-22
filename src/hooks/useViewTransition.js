"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useLoader } from "@/components/ui/LoaderProvider";

let _isTransitioningGlobal = false;

function getOrCreateOverlay() {
  let overlay = document.querySelector(".page-transition-overlay");
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.className = "page-transition-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "9999",

    pointerEvents: "none",
    overflow: "hidden",
  });

  overlay.innerHTML = `
    <svg
      width="100%" height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style="display:block;"
    >
      <path
        fill="#a3e635"
        class="overlay__path"
        vector-effect="non-scaling-stroke"
        d="M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z"
      />
    </svg>
  `;

  document.body.appendChild(overlay);
  return overlay;
}

const PATHS = {
  step1: {
    unfilled: "M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z",
    inBetween: "M 0 0 h 43 c -60 55 140 65 0 100 H 0 V 0 Z",
    filled: "M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z",
  },
  step2: {
    filled: "M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z",
    inBetween: "M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z",
    unfilled: "M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z",
  },
};

export const useViewTransition = () => {
  const router = useRouter();
  const { setIsTransitioning } = useLoader();
  const failsafeTimerRef = useRef(null);

  const cleanup = useCallback(
    (overlay) => {
      clearTimeout(failsafeTimerRef.current);
      _isTransitioningGlobal = false;
      setIsTransitioning(false);

      if (overlay) {
        overlay.style.pointerEvents = "none";
        try {
          overlay.parentNode?.removeChild(overlay);
        } catch (_) {}
      }
    },
    [setIsTransitioning]
  );

  const slideInOut = useCallback(
    (href, onRouteChange) => {
      const overlay = getOrCreateOverlay();
      const overlayPath = overlay.querySelector(".overlay__path");
      if (!overlayPath) {
        router.push(href);
        if (onRouteChange) onRouteChange();
        cleanup(overlay);
        return;
      }

      failsafeTimerRef.current = setTimeout(() => {
        if (_isTransitioningGlobal) {
          gsap.killTweensOf(overlayPath);
          cleanup(overlay);
          router.push(href);
          if (onRouteChange) onRouteChange();
        }
      }, 2500);

      gsap
        .timeline({ onComplete: () => cleanup(overlay) })
        .set(overlayPath, { attr: { d: PATHS.step1.unfilled } })

        .call(() => {
          overlay.style.pointerEvents = "all";
        })
        .to(overlayPath, {
          duration: 0.55,
          ease: "power4.in",
          attr: { d: PATHS.step1.inBetween },
        })
        .to(overlayPath, {
          duration: 0.2,
          ease: "power1.in",
          attr: { d: PATHS.step1.filled },
          onComplete: () => {
            setIsTransitioning(true);
            router.push(href);
            if (onRouteChange) onRouteChange();
          },
        })
        .to({}, { duration: 0.6 })

        .set(overlayPath, { attr: { d: PATHS.step2.filled } })
        .call(() => {
          overlay.style.pointerEvents = "none";
          setIsTransitioning(false);
        })
        .to(overlayPath, {
          duration: 0.15,
          ease: "sine.in",
          attr: { d: PATHS.step2.inBetween },
        })
        .to(overlayPath, {
          duration: 0.95,
          ease: "power4.out",
          attr: { d: PATHS.step2.unfilled },
        });
    },
    [router, setIsTransitioning, cleanup]
  );

  const navigateWithTransition = useCallback(
    (href, onRouteChange) => {
      if (typeof window === "undefined") return;
      if (window.location.pathname === href) return;
      if (_isTransitioningGlobal) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        if (onRouteChange) onRouteChange();
        return;
      }

      _isTransitioningGlobal = true;
      slideInOut(href, onRouteChange);
    },
    [router, slideInOut]
  );

  return { navigateWithTransition, router };
};
