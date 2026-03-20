"use client";

import React, { createContext, useContext, useState } from "react";

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
