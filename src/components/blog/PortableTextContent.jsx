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
            alt={value.alt || value.caption || "Blog article image"}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-text-muted border-t border-white/5 bg-white/2 px-6 py-4 text-center text-sm italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-text-primary mt-20 mb-8 text-3xl font-bold tracking-tight md:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-text-primary mt-16 mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-text-primary mt-12 mb-4 text-xl font-bold tracking-tight md:text-2xl">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-muted mt-8 text-lg leading-relaxed md:text-xl">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent/40 bg-accent/5 text-text-primary my-12 border-l-4 px-8 py-8 text-2xl italic">
        &quot;{children}&quot;
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
      const isExternal = value.href && !value.href.startsWith("/");
      return (
        <a
          href={value.href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
          className="text-accent decoration-accent/30 hover:decoration-accent underline underline-offset-4 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="text-text-primary font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-text-muted italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="text-accent rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm">
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
