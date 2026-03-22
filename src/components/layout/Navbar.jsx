"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import TransitionLink from "../ui/TransitionLink";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import AnimatedButton from "../ui/AnimatedButton";
import BookACall from "../ui/BookACall";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Agency", href: "/agency" },
  { label: "Expertise", href: "/expertise" },
  { label: "Works", href: "/works" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

function WeFikLogo() {
  return (
    <svg
      viewBox="0 0 155.41 89.43"
      style={{ height: "1.5rem", width: "auto", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        fill="#A3E635"
        d="M116.72,89.43l-1.61-0.92L75.3,65.68L37.2,86.14c-1.91,1.02-4.28,0.16-5.08-1.85
          L9.34,27.6L0.28,5.05C-1.11,1.59,3-1.46,5.91,0.86L60.8,44.65L82.4,61.87l32.83,26.37L116.72,89.43z"
      />
      <path
        fill="#51731A"
        d="M149.72,0.47c3.21-1.73,6.81,1.56,5.37,4.92l-13.3,31l-19.48,47.96
          c-0.99,2.44-4.08,3.19-6.08,1.48L91.49,64.67l-23.72-20.2L149.72,0.47z"
      />
    </svg>
  );
}

function HamburgerIcon({ open }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="1"
        x2="20"
        y2="1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: "10px 1px",
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
          transition: "transform 0.35s cubic-bezier(0.77,0,0.175,1)",
        }}
      />
      <line
        x1="0"
        y1="7"
        x2="20"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
      <line
        x1="0"
        y1="13"
        x2="20"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: "10px 13px",
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          transition: "transform 0.35s cubic-bezier(0.77,0,0.175,1)",
        }}
      />
    </svg>
  );
}

function ArrowUpRight({ size = 11 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 10L10 1M10 1H3M10 1V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isDark = !mounted ? true : resolvedTheme === "dark";

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navPillRef = useRef(null);
  const rightRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayBgRef = useRef(null);
  const overlayLinksRef = useRef([]);
  const overlayFooterRef = useRef(null);
  const deskLinkRefs = useRef([]);
  const menuTl = useRef(null);
  const isAnimating = useRef(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuOpen || isAnimating.current) return;
    isAnimating.current = true;
    document.body.style.overflow = "";
    setMenuOpen(false);

    gsap
      .timeline({
        onComplete: () => {
          isAnimating.current = false;
          menuTl.current?.pause(0);
          gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
        },
      })
      .to(
        overlayFooterRef.current,
        {
          autoAlpha: 0,
          y: 16,
          duration: 0.22,
          ease: "power2.in",
        },
        0
      )
      .to(
        [...overlayLinksRef.current].reverse(),
        {
          autoAlpha: 0,
          y: 40,
          skewY: -2,
          duration: 0.3,
          ease: "power2.in",
          stagger: 0.045,
        },
        0
      )
      .to(
        overlayBgRef.current,
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.5,
          ease: "power4.inOut",
        },
        0.25
      );
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => closeMenu(), 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, menuOpen, closeMenu]);

  useGSAP(
    () => {
      const els = [logoRef.current, navPillRef.current, rightRef.current];
      if (els.some((e) => !e)) return;
      gsap.set(els, { autoAlpha: 0, y: -18 });
      gsap
        .timeline({ delay: 0.12 })
        .to(logoRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        })
        .to(
          navPillRef.current,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          rightRef.current,
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
    },
    { scope: navRef }
  );

  useGSAP(
    () => {
      if (!overlayRef.current || !overlayBgRef.current) return;
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(overlayBgRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set(overlayLinksRef.current, { autoAlpha: 0, y: 52, skewY: 4 });
      gsap.set(overlayFooterRef.current, { autoAlpha: 0, y: 20 });

      menuTl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, {
          autoAlpha: 1,
          pointerEvents: "all",
          duration: 0.01,
        })
        .to(
          overlayBgRef.current,
          { scaleY: 1, duration: 0.52, ease: "power4.inOut" },
          0
        )
        .to(
          overlayLinksRef.current,
          {
            autoAlpha: 1,
            y: 0,
            skewY: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.065,
          },
          0.2
        )
        .to(
          overlayFooterRef.current,
          { autoAlpha: 1, y: 0, duration: 0.38, ease: "power2.out" },
          0.52
        );
    },
    { scope: overlayRef }
  );

  function openMenu() {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
    menuTl.current?.play().then(() => {
      isAnimating.current = false;
    });
  }

  function onLinkMouseMove(e, el) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.22,
      y: (e.clientY - r.top - r.height / 2) * 0.22,
      duration: 0.3,
      ease: "power2.out",
    });
  }
  function onLinkMouseLeave(el) {
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }

  function getLinkStyle(i, isActive) {
    const isHovered = hoveredIndex === i;
    return {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 14px",
      borderRadius: "8px",
      fontSize: "13.5px",
      fontWeight: 500,
      textDecoration: "none",
      whiteSpace: "nowrap",
      transition: "color 0.2s, background 0.2s",
      color: isActive
        ? "var(--color-accent)"
        : isHovered
          ? "var(--color-text-primary)"
          : "var(--color-text-muted)",
      background: isActive
        ? "rgba(163,230,53,0.08)"
        : isHovered
          ? isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)"
          : "transparent",
    };
  }

  const pillBg = scrolled
    ? isDark
      ? "rgba(10,10,10,0.72)"
      : "rgba(245,248,238,0.82)"
    : isDark
      ? "rgba(10,10,10,0.18)"
      : "rgba(245,248,238,0.30)";

  const pillBorder = scrolled
    ? isDark
      ? "1px solid rgba(163,230,53,0.13)"
      : "1px solid rgba(163,230,53,0.28)"
    : isDark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)";

  const pillShadow = scrolled
    ? isDark
      ? "0 4px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)"
      : "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.90)"
    : "none";

  const innerPillBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.07)";

  const innerPillBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";

  const hamburgerBorder = isDark
    ? "1px solid rgba(255,255,255,0.10)"
    : "1px solid rgba(0,0,0,0.10)";

  const hamburgerBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .nav-hamburger { display: none !important; }
          .nav-cta        { display: inline-flex !important; }
          .nav-desktop    { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
        }
      `}</style>

      <header
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "8px 16px" : "14px 16px",
          transition: "padding 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "76rem",
            margin: "0 auto",
            borderRadius: "16px",
            border: pillBorder,
            background: pillBg,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: pillShadow,
            transition:
              "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "56px",
              padding: "0 20px",
            }}
          >
            <TransitionLink
              ref={logoRef}
              href="/"
              aria-label="WEFIK — Back to home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <WeFikLogo />
            </TransitionLink>
            <nav
              ref={navPillRef}
              className="nav-desktop"
              aria-label="Main navigation"
              role="navigation"
              style={{ alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  padding: "5px 6px",
                  borderRadius: "12px",
                  border: innerPillBorder,
                  background: innerPillBg,
                }}
              >
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <TransitionLink
                      key={link.href}
                      href={link.href}
                      ref={(el) => (deskLinkRefs.current[i] = el)}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                        onLinkMouseLeave(deskLinkRefs.current[i]);
                      }}
                      onMouseMove={(e) =>
                        onLinkMouseMove(e, deskLinkRefs.current[i])
                      }
                      style={getLinkStyle(i, isActive)}
                    >
                      {link.label}
                      {isActive && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: "5px",
                            left: "14px",
                            right: "14px",
                            height: "1px",
                            borderRadius: "999px",
                            background: "var(--color-accent)",
                          }}
                        />
                      )}
                    </TransitionLink>
                  );
                })}
              </div>
            </nav>
            <div
              ref={rightRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              <ThemeSwitcher />
              <div className="hidden lg:block">
                <BookACall>
                  <AnimatedButton>Book a Call</AnimatedButton>
                </BookACall>
              </div>

              <button
                className="nav-hamburger"
                onClick={() => {
                  if (isAnimating.current) return;
                  menuOpen ? closeMenu() : openMenu();
                }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  border: hamburgerBorder,
                  background: hamburgerBg,
                  backdropFilter: "blur(8px)",
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(163,230,53,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(0,0,0,0.10)";
                }}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          overflow: "hidden",
          visibility: "hidden",
          opacity: 0,
        }}
        aria-hidden={!menuOpen}
      >
        <div
          ref={overlayBgRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-bg-primary)",
            transformOrigin: "top",
            transform: "scaleY(0)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            zIndex: 10,
            background:
              "linear-gradient(90deg, transparent 0%, #a3e635 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "96px 24px 32px",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  ref={(el) => (overlayLinksRef.current[i] = el)}
                  onClick={closeMenu}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                    textDecoration: "none",
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-text-primary)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color = "var(--color-accent)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color = "var(--color-text-primary)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {isActive && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--color-accent)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: "clamp(1.3rem, 5vw, 1.7rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight size={16} />
                </TransitionLink>
              );
            })}
          </nav>

          <div
            ref={overlayFooterRef}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              paddingTop: "24px",
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <span
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--color-text-subtle)",
                }}
              >
                Get in touch
              </span>
              <a
                href="mailto:info@wefik.in"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                }}
              >
                info@wefik.in
              </a>
              <a
                href="tel:+919609653522"
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-subtle)",
                  textDecoration: "none",
                }}
              >
                +91 96096 53522
              </a>
            </div>

            <BookACall>
              <AnimatedButton>Book a Call</AnimatedButton>
            </BookACall>
          </div>
        </div>
      </div>
    </>
  );
}
