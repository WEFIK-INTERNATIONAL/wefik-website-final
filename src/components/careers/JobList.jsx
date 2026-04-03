"use client";

import React, { useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, Briefcase, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function JobList({ jobs }) {
  const listRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".job-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: listRef }
  );

  if (!jobs || jobs.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-text-muted text-xl font-medium">
          No open positions at the moment.
        </p>
        <p className="text-text-muted mt-2">
          Check back later or follow us for updates.
        </p>
      </div>
    );
  }

  return (
    <section ref={listRef} className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-accent h-px w-12" />
            <h2 className="font-accent text-text-muted text-[10px] font-bold tracking-[0.4em] uppercase">
              Open Positions ({jobs.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <TransitionLink
              key={job.slug.current}
              href={`/careers/${job.slug.current}`}
              className="job-item group border-border bg-bg-secondary hover:bg-bg-primary flex h-full flex-col gap-6 rounded-4xl border p-8 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="text-text-muted flex items-center gap-2 text-xs font-medium italic">
                  <CalendarIcon size={14} className="text-accent" />
                  Posted {format(new Date(job.postedAt), "MMM dd, yyyy")}
                </div>
              </div>

              <h3 className="font-display text-text-primary text-2xl leading-tight font-bold">
                {job.title}
              </h3>

              <div className="mt-auto flex flex-wrap gap-3">
                <div className="bg-accent/10 text-accent flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase">
                  <Briefcase size={12} />
                  {job.type}
                </div>
                <div className="text-text-primary flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase">
                  <MapPin size={12} />
                  {job.location}
                </div>
              </div>

              <div className="border-border mt-2 flex items-center justify-between border-t pt-6">
                <span className="font-accent text-text-primary group-hover:text-accent text-[10px] font-bold tracking-[0.2em] uppercase transition-colors">
                  View Details & Apply
                </span>
                <div className="bg-accent/10 group-hover:bg-accent text-accent flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:text-black">
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
