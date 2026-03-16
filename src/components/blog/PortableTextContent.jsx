import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components = {
  types: {
    image: ({ value }) => (
      <figure className="my-12 overflow-hidden rounded-2xl border border-white/5 bg-neutral-900">
        <div className="relative aspect-video w-full">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog image"}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-text-muted bg-white/2 px-6 py-4 text-center text-sm italic border-t border-white/5">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display mt-20 mb-8 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-16 mb-6 text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-text-muted mt-8 text-lg leading-relaxed md:text-xl">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent/40 bg-accent/5 my-12 border-l-4 py-8 px-8 text-2xl italic text-text-primary">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-text-muted mt-8 list-disc space-y-4 pl-8 text-lg md:text-xl">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-text-muted mt-8 list-decimal space-y-4 pl-8 text-lg md:text-xl">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-text-primary">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="bg-white/5 border-white/10 rounded-md border px-1.5 py-0.5 font-mono text-sm text-accent">
        {children}
      </code>
    ),
  },
};

export default function PortableTextContent({ value }) {
  if (!value) return null;
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
