import React from "react";
import { twMerge } from "tailwind-merge";

function Tag({ className, children, ...otherProps }) {
  return (
    <div
      className={twMerge(
        "border-accent/15 bg-accent/5 inline-flex items-center gap-2 self-center rounded-full border px-4 py-1.5 backdrop-blur-md",
        className
      )}
      {...otherProps}
    >
      <span className="relative flex h-[7px] w-[7px]">
        <span className="bg-accent absolute inset-0 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full opacity-70" />
        <span className="bg-accent relative h-[7px] w-[7px] rounded-full" />
      </span>
      <span className="text-text-muted text-[12px] leading-none tracking-[0.04em] whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}

export default Tag;
