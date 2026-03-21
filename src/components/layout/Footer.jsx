"use client";
import React, { useState, useRef, useEffect } from "react";
import CallToActionCom from "@/components/ui/CallToActionCom";
import { gsap } from "@/lib/gsap";
import TransitionLink from "@/components/ui/TransitionLink";

const allLinks = [
  {
    title: "Contact",
    linksTo: [
      { name: "WEFIK", url: "/" },
      { name: "Kestopur Salt Lake kolkata 700114", url: "#" },
      { name: "info@wefik.in", url: "mailto:info@wefik.in" },
      { name: "+91 9609653522", url: "tel:9609653522" },
    ],
  },
  {
    title: "Pages",
    linksTo: [
      { name: "Home", url: "/" },
      { name: "Agency", url: "/agency" },
      { name: "Expertise", url: "/expertise" },
      { name: "Work", url: "/works" },
      { name: "Contact", url: "/contact" },
      { name: "Blog", url: "/blogs" },
      { name: "Career", url: "/careers" },
    ],
  },
  {
    title: "Legal",
    linksTo: [
      { name: "Privacy Policy", url: "/legal/privacy-policy" },
      { name: "Terms of Service", url: "/legal/terms" },
      {
        name: "Refund and Cancellation Policy",
        url: "/legal/refund-cancellation-policy",
      },
      { name: "Cookie Policy", url: "/legal/cookiepolicy" },
    ],
  },
  {
    title: "Socials",
    linksTo: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/wefikinternational/",
      },
      { name: "Twitter", url: "https://x.com/wefikindia" },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/wefik/",
      },
      { name: "Instagram", url: "https://www.instagram.com/wefik.in/" },
      { name: "Behance", url: "https://www.behance.net/wefik" },
      { name: "Medium", url: "https://wefikindia.medium.com/" },
    ],
  },
];

const AccordionItem = ({ link, index, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, marginTop: 0 },
        { height: "auto", marginTop: 16, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        height: 0,
        marginTop: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="flex-1">
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center justify-between"
      >
        <h3 className="from-accent to-accent-bright bg-linear-to-r bg-clip-text font-semibold text-transparent">
          {link.title}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          className="text-text-muted"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <div ref={contentRef} className="h-0 overflow-hidden">
        <ul className="flex flex-col gap-2">
          {link.linksTo.map((sublink, subIndex) => (
            <li key={subIndex}>
              {sublink.url.startsWith("/") ? (
                <TransitionLink href={sublink.url} className="text-text-muted">
                  {sublink.name}
                </TransitionLink>
              ) : (
                <a href={sublink.url} className="text-text-muted">
                  {sublink.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <hr
        className={`${
          index === 3 ? "hidden" : "border-border/10 mt-5 border-t"
        }`}
      />
    </div>
  );
};

const DropDownLinks = ({ allLinks }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex max-w-6xl flex-col gap-6 md:hidden">
      {allLinks.map((link, index) => (
        <AccordionItem
          key={index}
          link={link}
          index={index}
          isOpen={selectedIndex === index}
          onToggle={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

function Footer() {
  return (
    <section className="to-bg-footer font-neue relative overflow-x-clip bg-linear-to-b from-transparent pt-24">
      <div>
        <div className="mx-6">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <TransitionLink href="/" className="shrink-0 md:hidden lg:flex">
                <p className="text-text-primary text-2xl font-medium md:text-4xl">
                  WEFIK
                </p>
              </TransitionLink>
              <p className="text-text-muted max-w-lg leading-relaxed">
                From websites and apps to design, branding, and digital
                campaigns, we turn your ideas into reality.
              </p>
            </div>
            <div className="flex-1">
              <DropDownLinks allLinks={allLinks} />
              <div className="hidden w-full gap-20 md:flex md:justify-center lg:justify-end">
                {allLinks.map((link, index) => (
                  <div key={index} className="flex flex-col">
                    <h3 className="from-accent to-accent-bright bg-linear-to-r bg-clip-text font-semibold text-transparent">
                      {link.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2">
                      {link.linksTo.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          {sublink.url.startsWith("/") ? (
                            <TransitionLink
                              className="text-text-muted hover:text-accent cursor-pointer leading-5 transition-all hover:drop-shadow-[0_0_6px_var(--color-accent-bright)]"
                              href={sublink.url}
                            >
                              {sublink.name}
                            </TransitionLink>
                          ) : (
                            <a
                              className="text-text-muted hover:text-accent cursor-pointer leading-5 transition-all hover:drop-shadow-[0_0_6px_var(--color-accent-bright)]"
                              href={sublink.url}
                            >
                              {sublink.name}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 mb-5 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-text-subtle text-sm">
              All rights reserved 2025 ©{" "}
              <span className="text-accent">WEFIK</span>
            </p>
            <div className="flex gap-5">
              <TransitionLink
                href="/legal/data-protection"
                className="text-text-muted hover:text-text-primary text-sm transition"
              >
                Data Protection
              </TransitionLink>
              <TransitionLink
                href="/legal/imprint"
                className="text-text-muted hover:text-text-primary text-sm transition"
              >
                Imprint
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
      <div className="border-border/10 border-t pt-5">
        <CallToActionCom />
      </div>
    </section>
  );
}

export default Footer;
