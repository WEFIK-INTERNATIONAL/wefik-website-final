import React from "react";
import { getOpenJobs } from "@/sanity/lib/queries";
import CareersHero from "@/components/careers/CareersHero";
import JobList from "@/components/careers/JobList";

export const metadata = {
  title: "Careers | Join Wefik Team",
  description:
    "Explore career opportunities at Wefik and help us build the future of digital experiences.",
};

export default async function CareersPage() {
  const jobs = await getOpenJobs();

  return (
    <main className="bg-bg-primary min-h-screen">
      <CareersHero />

      <JobList jobs={jobs} />

      <section className="mx-auto max-w-7xl border-t border-white/5 px-6 py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <span className="text-accent text-3xl font-black">01.</span>
            <h3 className="text-text-primary text-xl font-black tracking-tighter">
              Remote Culture
            </h3>
            <p className="text-text-muted leading-relaxed">
              Work from anywhere in the world. We believe in talent, not time
              zones.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-accent text-3xl font-black">02.</span>
            <h3 className="text-text-primary text-xl font-black tracking-tighter">
              Growth Mindset
            </h3>
            <p className="text-text-muted leading-relaxed">
              Continuous learning with dedicated budget for courses and
              workshops.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-accent text-3xl font-black">03.</span>
            <h3 className="text-text-primary text-xl font-black tracking-tighter">
              Bold Ideas
            </h3>
            <p className="text-text-muted leading-relaxed">
              Zero hierarchy when it comes to creativity. Your ideas matter
              here.
            </p>
          </div>
        </div>
      </section>

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="bg-accent/3 absolute top-[30%] -right-[10%] h-[50%] w-[50%] rounded-full blur-[150px]" />
        <div className="middle-left absolute h-[40%] w-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>
    </main>
  );
}
