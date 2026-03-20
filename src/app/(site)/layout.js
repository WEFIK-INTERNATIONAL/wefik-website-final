"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import { LoaderProvider } from "@/components/ui/LoaderProvider";
import { ViewTransitions } from "next-view-transitions";

export default function SiteLayout({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <LoaderProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <ViewTransitions>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </ViewTransitions>
    </LoaderProvider>
  );
}
