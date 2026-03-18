import React from "react";
import { getAllWorks } from "@/sanity/lib/queries";
import WorksGallery from "@/components/works/WorksGallery";

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
        <header className="mb-16 md:mb-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="text-accent mb-4 block text-xs font-bold tracking-[0.3em] uppercase">
                Our Portfolio
              </span>
              <h1 className="font-display text-text-primary text-5xl leading-[0.9] font-black tracking-tighter md:text-8xl lg:text-9xl">
                SELECTED <br />
                <span className="text-accent italic">WORKS.</span>
              </h1>
            </div>
            <p className="text-text-muted max-w-xs text-sm leading-relaxed md:text-base">
              Explore our latest projects across web development, design, and
              digital transformation.
            </p>
          </div>
        </header>
      </div>

      <WorksGallery initialWorks={works} categories={categories} />

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-accent/5 absolute -top-[10%] -left-[5%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>
    </main>
  );
}
