"use client";

import React from "react";

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
