"use client";

import React from "react";

export default function MascotIcon({
  className = "w-6 h-6",
  isSpeaking = false,
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body Frame */}
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="8"
        className="fill-current opacity-20"
      />
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="8"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Antenna */}
      <path
        d="M16 4V1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="1" r="1.5" className="fill-current" />

      {/* Digital Eyes */}
      <circle cx="11" cy="14" r="2.5" className="fill-current" />
      <circle cx="21" cy="14" r="2.5" className="fill-current" />
      <circle cx="12" cy="13" r="0.75" fill="white" />
      <circle cx="22" cy="13" r="0.75" fill="white" />

      {/* Mouth */}
      {isSpeaking ? (
        <path
          d="M12 21C13.5 22.5 18.5 22.5 20 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M12 20C13 21.5 19 21.5 20 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
