"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, Briefcase, Clock } from "lucide-react";
import { format } from "date-fns";

export default function JobList({ jobs }) {
  const listRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".job-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
    <section ref={listRef} className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col gap-1">
        <h2 className="text-text-primary mb-12 text-xs font-black tracking-[0.3em] uppercase">
          Open Positions ({jobs.length})
        </h2>

        <div className="divide-y divide-white/5 border-t border-white/5">
          {jobs.map((job) => (
            <Link
              key={job.slug.current}
              href={`/careers/${job.slug.current}`}
              className="job-item group block py-8 transition-all hover:bg-white/[0.02] hover:px-6 md:py-12"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-4">
                  <h3 className="font-display text-text-primary group-hover:text-accent text-3xl font-black tracking-tighter transition-colors md:text-5xl">
                    {job.title}
                  </h3>

                  <div className="text-text-muted flex flex-wrap gap-6 text-sm font-bold tracking-widest uppercase">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-accent" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-accent" />
                      {format(new Date(job.postedAt), "MMM dd, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-text-primary hidden -translate-x-4 text-xs font-black tracking-widest uppercase opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 md:block">
                    Apply Now
                  </span>
                  <div className="group-hover:bg-accent group-hover:border-accent flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition-all group-hover:scale-110">
                    <ArrowRight
                      size={24}
                      className="text-white transition-transform group-hover:translate-x-1 group-hover:text-black"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
