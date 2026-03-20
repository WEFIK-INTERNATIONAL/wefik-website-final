"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function TextClipPathAnimation({
  text = "Animated Text",
  className = "",
  delay = 0,
  duration = 1.2,
}) {
  const textRef = useRef(null);

  useGSAP(() => {
    const el = textRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        y: 50,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration,
        delay,
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }
    );
  }, []);

  return (
    <div className="overflow-hidden">
      <h3 ref={textRef} className={className}>
        {text}
      </h3>
    </div>
  );
}

export default TextClipPathAnimation;
