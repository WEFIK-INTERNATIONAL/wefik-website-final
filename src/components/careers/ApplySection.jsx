"use client";

import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";

export default function ApplySection({ jobTitle, applyUrl }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="mt-16 rounded-3xl border border-white/5 bg-white/5 p-8 text-center md:p-16">
        <h2 className="text-text-primary mb-4 text-3xl font-black tracking-tighter">
          Interested in this position?
        </h2>
        <p className="text-text-muted mb-12 text-lg">
          Send your resume and portfolio to join our team.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-accent hover:bg-accent/90 inline-flex h-16 cursor-pointer items-center justify-center rounded-full px-12 text-sm font-black tracking-[0.2em] text-black uppercase transition-all hover:scale-105 active:scale-95"
          >
            Apply for this role
          </button>

          {applyUrl && (
            <span className="text-text-muted text-xs font-bold tracking-widest uppercase">
              or
            </span>
          )}

          {applyUrl && (
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary hover:text-accent border-b border-white/10 pb-1 text-sm font-black tracking-[0.1em] uppercase transition-colors"
            >
              Apply via External Link
            </a>
          )}
        </div>
      </section>

      <ApplicationForm
        jobTitle={jobTitle}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}
