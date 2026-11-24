"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import WorkCard from "@/components/works/WorkCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PAGE_SIZE = 6;

export default function WorksGallery({ initialWorks, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredWorks, setFilteredWorks] = useState(initialWorks);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const prevVisible = useRef(PAGE_SIZE);
  const shownWorks = filteredWorks.slice(0, visibleCount);
  const remaining = filteredWorks.length - shownWorks.length;

  const gridRef = useRef(null);

  // ---- Filter slider ----
  const sliderRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateEdges();
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateEdges]);

  const slide = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = sliderRef.current;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    if (d.moved) sliderRef.current.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

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

  // Animate only the batch that "Load more" just added.
  useGSAP(() => {
    if (visibleCount > prevVisible.current && gridRef.current) {
      const batch = Math.ceil(visibleCount / PAGE_SIZE) - 1;
      gsap.fromTo(
        gridRef.current.querySelectorAll(`[data-batch="${batch}"]`),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }
      );
    }
    prevVisible.current = visibleCount;
  }, [visibleCount]);

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
        setVisibleCount(PAGE_SIZE);
        prevVisible.current = PAGE_SIZE;
      },
    });
  };

  return (
    <section aria-label="Portfolio works" className="mx-auto max-w-7xl px-6">
      <div className="border-border/50 mb-10 flex items-center gap-3 border-y py-4 md:mb-14">
        <button
          type="button"
          onClick={() => slide(-1)}
          disabled={!edges.left}
          aria-label="Scroll filters left"
          className="border-text-primary/15 text-text-primary hover:border-accent hover:text-accent disabled:hover:border-text-primary/15 disabled:hover:text-text-primary hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-default disabled:opacity-30 md:flex"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="relative min-w-0 flex-1">
          <div
            ref={sliderRef}
            role="toolbar"
            aria-label="Filter works by industry"
            onScroll={updateEdges}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className="scrollbar-hide flex cursor-grab gap-2 overflow-x-auto select-none active:cursor-grabbing"
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              const count =
                cat === "All"
                  ? initialWorks.length
                  : initialWorks.filter((w) => w.category?.title === cat)
                      .length;
              return (
                <button
                  key={cat}
                  onClick={(e) => {
                    if (drag.current.moved) {
                      drag.current.moved = false;
                      return;
                    }
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                    handleFilter(cat);
                  }}
                  aria-pressed={active}
                  className={`inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
                    active
                      ? "bg-accent border-accent text-bg-primary"
                      : "border-text-primary/10 text-text-muted hover:border-accent/50 hover:text-text-primary"
                  }`}
                >
                  {cat}
                  <span
                    className={`text-[11px] tabular-nums ${
                      active ? "text-bg-primary/70" : "text-text-subtle"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* edge fades */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-(--color-bg-primary) to-transparent transition-opacity duration-300 ${edges.left ? "opacity-100" : "opacity-0"}`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-(--color-bg-primary) to-transparent transition-opacity duration-300 ${edges.right ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        <button
          type="button"
          onClick={() => slide(1)}
          disabled={!edges.right}
          aria-label="Scroll filters right"
          className="border-text-primary/15 text-text-primary hover:border-accent hover:text-accent disabled:hover:border-text-primary/15 disabled:hover:text-text-primary hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-default disabled:opacity-30 md:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {filteredWorks.length > 0 ? (
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {shownWorks.map((project, i) => (
            <div
              key={project.slug.current}
              className="work-card-anim"
              data-batch={Math.floor(i / PAGE_SIZE)}
            >
              <WorkCard project={project} />
            </div>
          ))}
        </div>
      ) : null}

      {filteredWorks.length > PAGE_SIZE && (
        <div className="mt-14 flex flex-col items-center gap-5 md:mt-16">
          <div className="flex w-full max-w-xs flex-col items-center gap-2">
            <p className="text-text-muted text-sm">
              Showing{" "}
              <span className="text-text-primary font-semibold">
                {shownWorks.length}
              </span>{" "}
              of {filteredWorks.length} projects
            </p>
            <div className="bg-text-primary/10 h-1 w-full overflow-hidden rounded-full">
              <div
                className="bg-accent h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${(shownWorks.length / filteredWorks.length) * 100}%`,
                }}
              />
            </div>
          </div>
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="group border-text-primary/20 text-text-primary hover:border-accent hover:bg-accent hover:text-bg-primary inline-flex h-12 cursor-pointer items-center gap-3 rounded-full border px-7 text-sm font-semibold transition-colors duration-300"
            >
              Load {Math.min(PAGE_SIZE, remaining)} more
              <Plus
                size={16}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </button>
          )}
        </div>
      )}

      {filteredWorks.length === 0 && (
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
