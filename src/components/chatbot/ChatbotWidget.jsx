"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import MascotIcon from "./MascotIcon";
import { useLoader } from "@/components/ui/LoaderProvider";

const ChatPanel = dynamic(() => import("./ChatPanel"), {
  ssr: false,
  loading: () => null,
});

const HIDDEN_PREFIXES = ["/studio", "/portal", "/login", "/api"];

export default function ChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisibleOnScroll, setIsVisibleOnScroll] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const launcherRef = useRef(null);
  const lastScrollY = useRef(0);

  // Safe preloader check
  let isPreloaderDone = true;
  try {
    const loader = useLoader();
    if (loader) isPreloaderDone = loader.isPreloaderDone;
  } catch {
    // If mounted outside LoaderProvider, default to true
  }

  // 1. Centralized Route Visibility Check
  const isHiddenRoute =
    !pathname || HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // 2. Mobile scroll listener: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current + 15 && currentScrollY > 100) {
        // Scrolling down
        setIsVisibleOnScroll(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        // Scrolling up
        setIsVisibleOnScroll(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Observe body overflow / mobile menu state to hide launcher during modal overlays
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isBodyLocked = document.body.style.overflow === "hidden";
      setIsMobileMenuOpen(isBodyLocked && !isOpen);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => observer.disconnect();
  }, [isOpen]);

  // 4. Return focus to launcher button when panel closes
  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => launcherRef.current?.focus(), 40);
    } else {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => launcherRef.current?.focus(), 40);
  };

  if (isHiddenRoute || !isPreloaderDone || isMobileMenuOpen) {
    return null;
  }

  const isContactPage = pathname === "/contact";

  return (
    <aside
      aria-label="Wefik Virtual Assistant"
      className={`fixed ${isOpen ? "z-[60]" : "z-40"} flex flex-col items-end transition-all duration-300 ${
        !isVisibleOnScroll && !isOpen
          ? "pointer-events-none translate-y-20 opacity-0"
          : "translate-y-0 opacity-100"
      } ${
        isContactPage
          ? "right-[calc(12px+env(safe-area-inset-right))] bottom-[calc(80px+env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6"
          : "right-[calc(12px+env(safe-area-inset-right))] bottom-[calc(12px+env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6"
      }`}
    >
      {/* Expanded Chat Panel */}
      {isOpen && (
        <div className="animate-in fade-in mb-3 duration-200">
          <ChatPanel onClose={handleClose} />
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className="flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-full bg-[var(--color-accent,#51731a)] text-white shadow-lg transition-all duration-200 hover:bg-[var(--color-accent-hover,#3a5212)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent,#51731a)] focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 sm:h-14 sm:w-14"
      >
        {isOpen ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        ) : (
          <MascotIcon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
        )}
      </button>
    </aside>
  );
}
