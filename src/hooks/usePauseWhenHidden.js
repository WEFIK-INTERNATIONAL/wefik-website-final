"use client";

import { useEffect } from "react";

/**
 * Pauses looping animations while their element is off screen, so marquees
 * and similar loops don't burn CPU/battery when nobody can see them.
 *
 * @param {React.RefObject<Element>} ref     element to watch
 * @param {() => (Array<{pause:Function, resume:Function}|null|undefined>)} getAnimations
 *        returns the GSAP tweens/timelines to pause and resume
 */
export default function usePauseWhenHidden(ref, getAnimations) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const anims = (getAnimations() || []).filter(Boolean);
        anims.forEach((a) => (entry.isIntersecting ? a.resume() : a.pause()));
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // getAnimations reads refs, so it doesn't need to be a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
