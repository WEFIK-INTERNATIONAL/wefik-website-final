"use client";

import React, { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";

const PAGE_SIZE = 6;

export default function BlogGrid({ posts = [] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const prevVisible = useRef(PAGE_SIZE);
  const gridRef = useRef(null);

  const shown = posts.slice(0, visibleCount);
  const remaining = posts.length - shown.length;

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

  if (posts.length === 0) return null;

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {shown.map((post, i) => (
          <div
            key={post.slug.current}
            data-batch={Math.floor(i / PAGE_SIZE)}
            className="h-full"
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      {posts.length > PAGE_SIZE && (
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="flex w-full max-w-xs flex-col items-center gap-2">
            <p className="text-text-muted text-sm">
              Showing{" "}
              <span className="text-text-primary font-semibold">
                {shown.length}
              </span>{" "}
              of {posts.length} articles
            </p>
            <div className="bg-text-primary/10 h-1 w-full overflow-hidden rounded-full">
              <div
                className="bg-accent h-full rounded-full transition-[width] duration-500"
                style={{ width: `${(shown.length / posts.length) * 100}%` }}
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
    </>
  );
}
