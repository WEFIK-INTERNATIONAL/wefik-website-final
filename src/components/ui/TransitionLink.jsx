"use client";

import React from "react";
import { useViewTransition } from "@/hooks/useViewTransition";

const TransitionLink = React.forwardRef(
  ({ href, children, className, onClick, ...props }, ref) => {
    const { navigateWithTransition } = useViewTransition();

    const handleClick = (e) => {
      e.preventDefault();
      if (onClick) onClick(e);
      navigateWithTransition(href);
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
