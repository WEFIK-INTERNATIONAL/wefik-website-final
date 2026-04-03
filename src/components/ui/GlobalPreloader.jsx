"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Preloader from "@/components/ui/Preloader";
import { useLoader } from "@/components/ui/LoaderProvider";

export default function GlobalPreloader() {
  const { setIsPreloaderDone } = useLoader();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Always default to true so the Preloader is guaranteed to be in the server HTML.
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // We use a timeout to avoid the "set-state-in-effect" lint error
    // and prevent cascading renders during the initial mount.
    const timer = setTimeout(() => {
      if (isHomePage) {
        if (sessionStorage.getItem("wefik-loaded")) {
          setShowPreloader(false);
          setIsPreloaderDone(true);
        }
      } else {
        setShowPreloader(false);
        setIsPreloaderDone(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isHomePage, setIsPreloaderDone]);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("wefik-loaded", "true");
    setShowPreloader(false);
  };

  if (!showPreloader) return null;

  return <Preloader onComplete={handleLoadingComplete} />;
}
