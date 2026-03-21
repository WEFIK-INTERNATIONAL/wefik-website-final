"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LoaderContext = createContext(null);

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}

export function LoaderProvider({ children }) {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("wefik-loaded")) {
      setTimeout(() => setIsPreloaderDone(true), 0);
    }
  }, []);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const canPlayEntrance = isPreloaderDone && !isTransitioning;

  return (
    <LoaderContext.Provider
      value={{
        isPreloaderDone,
        setIsPreloaderDone,
        isTransitioning,
        setIsTransitioning,
        canPlayEntrance,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}
