"use client";

import React, { useState, useCallback } from "react";

export default function ShareButton({
  url,
  title = "Check this out",
  text = "",
  variant = "icon",
  alwaysVisible = false,
}) {
  const [status, setStatus] = useState("idle"); 

  const handleShare = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const shareData = { url, title, text };

      if (navigator.share && navigator.canShare?.(shareData)) {
        try {
          await navigator.share(shareData);
          setStatus("shared");
        } catch {
        }
        setTimeout(() => setStatus("idle"), 2000);
        return;
      }
      try {
        await navigator.clipboard.writeText(url);
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 2000);
      } catch {
        const el = document.createElement("input");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 2000);
      }
    },
    [url, title, text]
  );

  if (variant === "pill") {
    return (
      <button
        onClick={handleShare}
        aria-label="Share this post"
        className="share-btn-pill group"
      >
        <span className="share-btn-pill__icon">
          <ShareIcon />
        </span>
        <span className="share-btn-pill__label">
          {status === "copied"
            ? "Link copied!"
            : status === "shared"
              ? "Shared!"
              : "Share"}
        </span>

        <style jsx>{`
          .share-btn-pill {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.625rem 1.25rem;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.04);
            color: var(--color-text-muted, #a0a0a0);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            cursor: pointer;
            transition:
              background 0.25s,
              border-color 0.25s,
              color 0.25s,
              transform 0.2s;
            backdrop-filter: blur(8px);
          }
          .share-btn-pill:hover {
            background: rgba(var(--color-accent-rgb, 200, 160, 80), 0.12);
            border-color: rgba(var(--color-accent-rgb, 200, 160, 80), 0.35);
            color: var(--color-accent, #c8a050);
            transform: translateY(-1px);
          }
          .share-btn-pill:active {
            transform: translateY(0) scale(0.97);
          }
          .share-btn-pill__icon {
            display: flex;
            align-items: center;
            transition: transform 0.25s;
          }
          .share-btn-pill:hover .share-btn-pill__icon {
            transform: rotate(-10deg) scale(1.1);
          }
          .share-btn-pill__label {
            min-width: 3.5rem;
            text-align: left;
          }
        `}</style>
      </button>
    );
  }

  // variant === "icon" — compact, for blog cards
  const isActive = status !== "idle";
  const visibleClass = alwaysVisible ? "share-icon-btn--visible" : "";

  return (
    <div className="share-icon-wrapper">
      <button
        onClick={handleShare}
        aria-label="Share this post"
        className={`share-icon-btn ${isActive ? "share-icon-btn--active" : ""} ${visibleClass}`}
      >
        {isActive ? <CheckIcon /> : <ShareIcon />}

        <span className="share-icon-tooltip">
          {status === "copied" ? "Copied!" : status === "shared" ? "Shared!" : "Share"}
        </span>
      </button>

      <style jsx>{`
        .share-icon-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .share-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: var(--color-text-muted, #a0a0a0);
          cursor: pointer;
          transition:
            background 0.2s,
            border-color 0.2s,
            color 0.2s,
            transform 0.2s,
            opacity 0.2s;
          opacity: 0;
          pointer-events: none;
          flex-shrink: 0;
        }

        /* Always-visible override (e.g. blog cards) */
        .share-icon-btn--visible {
          opacity: 1 !important;
          pointer-events: auto !important;
        }

        /* cards show the btn on hover via parent group */
        :global(.group:hover) .share-icon-btn,
        :global(.group:focus-within) .share-icon-btn {
          opacity: 1;
          pointer-events: auto;
        }

        .share-icon-btn--active {
          opacity: 1 !important;
          pointer-events: auto !important;
          background: rgba(var(--color-accent-rgb, 200, 160, 80), 0.15) !important;
          border-color: rgba(
            var(--color-accent-rgb, 200, 160, 80),
            0.35
          ) !important;
          color: var(--color-accent, #c8a050) !important;
        }

        .share-icon-btn:hover:not(.share-icon-btn--active) {
          background: rgba(var(--color-accent-rgb, 200, 160, 80), 0.1);
          border-color: rgba(var(--color-accent-rgb, 200, 160, 80), 0.28);
          color: var(--color-accent, #c8a050);
          transform: scale(1.12);
        }

        .share-icon-btn:active {
          transform: scale(0.93);
        }

        /* Tooltip */
        .share-icon-tooltip {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: rgba(20, 20, 20, 0.95);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition:
            opacity 0.15s,
            transform 0.15s;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .share-icon-btn:hover .share-icon-tooltip,
        .share-icon-btn--active .share-icon-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
