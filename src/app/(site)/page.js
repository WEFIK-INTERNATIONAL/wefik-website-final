import HeroSection from "@/components/home/HeroSection";
import TechTicker from "@/components/home/TechTicker";
import Introduction from "@/components/home/Introduction";
import SelectedWorks from "@/components/home/SelectedWorks";
import Process from "@/components/home/Process";
import Expertise from "@/components/home/Expertise";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import React from "react";
import { getHomeFeaturedWorks } from "@/sanity/lib/queries";

export default async function Home() {
  const projects = await getHomeFeaturedWorks();

  return (
    <>
      <HeroSection />
      <TechTicker />
      <Introduction />
      <SelectedWorks projects={projects} />
      <Process />
      <Expertise />
      <Testimonials />
      <CTA />
    </>
  );
}
