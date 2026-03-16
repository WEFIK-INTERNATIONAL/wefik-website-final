import React from "react";

export default function BlogHero() {
  return (
    <section className="bg-bg-primary relative w-full overflow-hidden pt-32 pb-16 md:pt-48 md:pb-24">
      {/* Background Ornamentation */}
      <div className="pointer-events-none absolute inset-0">
        <div className="border-border/30 absolute top-0 left-1/2 h-full w-px -translate-x-1/2 border-l border-dashed" />
        <div className="border-border/10 absolute top-[40%] left-0 h-px w-full border-t" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-accent/20" />
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Insights & Stories
            </span>
          </div>
          <h1 className="font-display mt-8 text-5xl font-black leading-[0.9] tracking-tighter md:text-8xl lg:text-9xl">
            Thought <span className="text-accent">Leadership</span> & Updates
          </h1>
          <p className="border-accent/10 text-text-muted mt-8 max-w-xl border-l-2 pl-6 text-lg md:text-xl">
            Explore our latest thoughts on digital innovation, design trends, and the future of web experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
