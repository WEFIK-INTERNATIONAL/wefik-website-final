import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AVATARS = [
  { src: "/images/avatar/avatar-1.png", alt: "Client 1" },
  { src: "/images/avatar/avatar-2.png", alt: "Client 2" },
  { src: "/images/avatar/avatar-3.png", alt: "Client 3" },
  { src: "/images/avatar/avatar-4.png", alt: "Client 4" },
];

const BORDERS = [
  "border-(--color-accent)/50",
  "border-(--color-accent)/35",
  "border-(--color-accent)/20",
  "border-(--color-accent)/10",
];

function Avatar({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "bg-bg-card size-10 overflow-hidden rounded-full border-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default function TrustedAvatar() {
  return (
    <div className="flex items-center">
      {AVATARS.map((avatar, i) => (
        <Avatar
          key={avatar.alt}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            overflow: "hidden",
            border: `2.5px solid ${avatar.border}`,
            backgroundColor: "var(--color-bg-card)",
            marginLeft: i !== 0 ? "-12px" : "0",
            zIndex: AVATARS.length - i,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image
            src={avatar.src}
            alt={avatar.alt}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </Avatar>
      ))}
    </div>
  );
}
