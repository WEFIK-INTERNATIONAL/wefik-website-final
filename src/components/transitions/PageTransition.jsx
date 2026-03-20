"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();

  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
  }, [pathname]);

  return null;
}
