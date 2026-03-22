"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function SiteLayout({ children }) {
  const { setIsPreloaderDone } = useLoader();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showPreloader, setShowPreloader] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const alreadyLoaded = !!sessionStorage.getItem("wefik-loaded");

    if (isHomePage && !alreadyLoaded) {
      setTimeout(() => setShowPreloader(true), 0);
    } else {
      setTimeout(() => setIsPreloaderDone(true), 0);
    }
  }, [isHomePage, setIsPreloaderDone]);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("wefik-loaded", "true");
    setShowPreloader(false);
  };

  return (
    <>
      {}
      {showPreloader && <Preloader onComplete={handleLoadingComplete} />}

      {}
      <SmoothScroll>
        <Navbar />
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}
