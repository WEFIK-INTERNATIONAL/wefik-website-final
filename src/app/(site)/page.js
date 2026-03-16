import HeroSection from "@/components/home/HeroSection";
import TechTicker from "@/components/home/TechTicker";
import Introduction from "@/components/home/Introduction";
import SelectedWorks from "@/components/home/SelectedWorks";
import React from "react";

function Home() {
  return (
    <>
      <HeroSection />
      <TechTicker />
      <Introduction />
      <SelectedWorks />
    </>
  );
}

export default Home;
