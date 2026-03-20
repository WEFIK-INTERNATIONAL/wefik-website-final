import React from "react";
import TextClipPathAnimation from "./TextClipPathAnimation";

function HeadingText({ children }) {
  return (
    <div className="flex flex-col gap-24">
      <TextClipPathAnimation
        text={children}
        className="text-text-primary font-display text-6xl font-medium md:text-7xl md:text-9xl"
      />
      <div className="border-border w-full border-t" />
    </div>
  );
}

export default HeadingText;
