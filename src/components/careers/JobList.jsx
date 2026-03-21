"use client";

import React, { useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
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
    <section ref={listRef} className="mx-auto max-w-7xl px-6 py-24 lg:py-40">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-4">
          <div className="bg-accent h-px w-12" />
          <h2 className="font-accent text-text-muted text-[10px] font-bold tracking-[0.4em] uppercase">
            Open Positions ({jobs.length})
          </h2>
        </div>

        <div className="border-border flex flex-col border-t">
          {jobs.map((job, i) => (
            <TransitionLink
              key={job.slug.current}
              href={`/careers/${job.slug.current}`}
              className="job-item group border-border hover:bg-bg-secondary relative block border-b py-10 transition-colors duration-500 md:py-16 lg:px-8"
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="font-accent text-accent text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="bg-accent/20 h-px w-6" />
                    <span className="font-body text-text-muted text-xs font-medium italic">
                      Posted {format(new Date(job.postedAt), "MMM dd, yyyy")}
                    </span>
                  </div>

                  <h3 className="font-big text-text-primary text-3xl font-black tracking-tighter uppercase transition-all duration-500 group-hover:pl-4 md:text-5xl lg:text-7xl">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Briefcase size={14} className="text-accent opacity-50" />
                      <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.2em] uppercase">
                        {job.type}
                      </span>
                    </div>
                    <div className="bg-border h-1 w-1 rounded-full" />
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent opacity-50" />
                      <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.2em] uppercase">
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-start md:self-center">
                  <span className="font-accent text-text-primary hidden translate-x-4 text-[10px] font-bold tracking-[0.3em] uppercase opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                    Explore Role
                  </span>
                  <div className="bg-accent/10 group-hover:bg-accent flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-45 md:h-20 md:w-20">
                    <ArrowRight
                      size={28}
                      className="text-accent transition-colors duration-500 group-hover:text-black"
                    />
                  </div>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
