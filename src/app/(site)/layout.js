"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import { useLoader } from "@/components/ui/LoaderProvider";
import { ViewTransitions } from "next-view-transitions";

export default function SiteLayout({ children }) {
  const { isPreloaderDone } = useLoader();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("wefik-loaded")) {
      setTimeout(() => setShowPreloader(false), 0);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("wefik-loaded", "true");
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handleLoadingComplete} />}
      <div
        className="opacity-100"
        style={{
          visibility: isPreloaderDone ? "visible" : "hidden",
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
