"use client";

import React, { useState, useRef } from "react";
import WorkCard from "@/components/works/WorkCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function WorksGallery({ initialWorks, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredWorks, setFilteredWorks] = useState(initialWorks);

  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".work-card-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  }, [filteredWorks]);

  const handleFilter = (category) => {
    if (category === activeCategory) return;

    setActiveCategory(category);

    gsap.to(".work-card-anim", {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        const filtered =
          category === "All"
            ? initialWorks
            : initialWorks.filter((w) => w.category?.title === category);
        setFilteredWorks(filtered);
      },
    });
  };

  return (
    <section aria-label="Portfolio works" className="mx-auto max-w-7xl px-6">
      <div className="mb-12 flex flex-wrap gap-3 md:mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            aria-pressed={activeCategory === cat}
            aria-label={`Filter works by ${cat}`}
            className={`rounded-full px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all duration-300 md:px-8 md:py-3 ${
              activeCategory === cat
                ? "bg-accent shadow-accent/20 scale-105 text-black shadow-lg"
                : "text-text-muted border border-white/5 bg-white/5 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredWorks.length > 0 ? (
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {filteredWorks.map((project) => (
            <div key={project.slug.current} className="work-card-anim">
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-text-muted text-xl font-medium">
            No projects found in this category.
          </p>
          <button
            onClick={() => handleFilter("All")}
            className="text-accent border-accent mt-4 border-b pb-1 font-bold"
          >
            View all works
          </button>
        </div>
      )}
    </section>
  );
}
