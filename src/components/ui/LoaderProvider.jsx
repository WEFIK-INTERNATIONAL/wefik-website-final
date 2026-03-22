"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

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

  const failsafeRef = useRef(null);
  useEffect(() => {
    failsafeRef.current = setTimeout(() => {
      setIsPreloaderDone((prev) => {
        if (!prev) {
          console.warn(
            "[LoaderProvider] Preloader did not complete — forcing done state."
          );
        }
        return true;
      });
    }, 5000);

    return () => clearTimeout(failsafeRef.current);
  }, []);

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
