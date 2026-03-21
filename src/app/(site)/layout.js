"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import { useLoader } from "@/components/ui/LoaderProvider";
import { ViewTransitions } from "next-view-transitions";

export default function SiteLayout({ children }) {
  const { setIsPreloaderDone } = useLoader();
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const [showPreloader, setShowPreloader] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const alreadyLoaded = !!sessionStorage.getItem("wefik-loaded");

    if (isHomePage && !alreadyLoaded) {
      setShowPreloader(true);
    } else {
      setIsPreloaderDone(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("wefik-loaded", "true");
    setShowPreloader(false);
  };

  const contentHidden = !hydrated || showPreloader;

  return (
    <>
      {showPreloader && <Preloader onComplete={handleLoadingComplete} />}

      <div
        style={{
          opacity: contentHidden ? 0 : 1,
          transition: showPreloader ? "none" : "opacity 0.25s ease",
          pointerEvents: contentHidden ? "none" : "auto",
        }}
      >
        <ViewTransitions>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </ViewTransitions>
      </div>
    </>
  );
}
