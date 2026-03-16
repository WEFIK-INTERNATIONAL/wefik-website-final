"use client";

import { usePageTransition } from "./PageTransitionProvider";

export default function TransitionLink({
  href,
  children,
  className,
  style,
  onClick,
  ...props
}) {
  const { navigateTo } = usePageTransition();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
    navigateTo(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
}
