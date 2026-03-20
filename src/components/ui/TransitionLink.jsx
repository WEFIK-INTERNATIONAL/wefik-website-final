"use client";

import React from "react";
import { useViewTransition } from "@/hooks/useViewTransition";

const TransitionLink = ({ href, children, className, ...props }) => {
  const { navigateWithTransition } = useViewTransition();

  const handleClick = (e) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;
