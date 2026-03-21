import React from "react";
import { getAllWorks } from "@/sanity/lib/queries";
import WorksGallery from "@/components/works/WorksGallery";

import WorksHero from "@/components/works/WorksHero";

export const metadata = {
  title: "Our Works | Wefik",
  description: "Explore our selected projects and case studies.",
};

export default async function WorksPage() {
  const works = await getAllWorks();

  const categories = works.reduce(
    (acc, work) => {
      if (work.category?.title && !acc.includes(work.category.title)) {
        acc.push(work.category.title);
      }
      return acc;
    },
    ["All"]
  );

  return (
    <main className="bg-bg-primary min-h-screen pt-32 pb-24 md:pt-48">
      <div className="mx-auto max-w-7xl px-6">
        <WorksHero />
      </div>

      <WorksGallery initialWorks={works} categories={categories} />

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-accent/5 absolute -top-[10%] -left-[5%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>
    </main>
  );
}
