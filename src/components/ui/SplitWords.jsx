"use client";

import React from "react";

/**
 * SplitWords component to animate words individually.
 * @param {string} text - The text to split and animate.
 * @param {string} className - Additional CSS classes.
 * @param {object} style - Inline styles.
 */
export default function SplitWords({ text, className, style }) {
  if (!text) return null;

  return (
    <div className={className} style={style} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.22em" }}
        >
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
}
