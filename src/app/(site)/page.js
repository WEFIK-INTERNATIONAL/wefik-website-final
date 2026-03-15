import React from "react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-display text-accent text-4xl">Wefik</h1>
        <p className="text-text-muted font-body text-lg">
          Premium Design Studio
        </p>
      </div>

      <div className="bg-bg-card border-border flex flex-col items-center gap-6 rounded-2xl border p-6 shadow-xl">
        <p className="text-text-primary">Toggle theme to see it in action</p>
        <ThemeSwitcher />
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-bg-secondary border-border rounded-xl border p-4">
          <h3 className="text-accent-bright font-accent mb-2">Secondary BG</h3>
          <p className="text-text-subtle text-sm">Testing subtle text color</p>
        </div>
        <div className="border-accent rounded-xl border bg-transparent p-4">
          <h3 className="text-text-primary font-big text-2xl uppercase">
            Big Shoulders
          </h3>
          <p className="text-accent underline">Accent Link Color</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
