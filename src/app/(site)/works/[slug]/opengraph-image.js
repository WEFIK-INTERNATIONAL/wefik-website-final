/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getWorkBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SEO } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }) {
  const { slug } = params;

  let title = `${SEO.siteName} Works`;
  let tags = [];
  let coverUrl = null;

  try {
    const project = await getWorkBySlug(slug);
    if (project) {
      title = project.title;
      tags = project.tags?.slice(0, 4) ?? [];
      if (project.coverImage?.asset) {
        coverUrl = urlFor(project.coverImage).width(1200).height(630).url();
      }
    }
  } catch (_) {}

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {coverUrl && (
        <img
          src={coverUrl}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.97) 30%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #a3e635 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "48px 72px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg viewBox="0 0 155.41 89.43" width="36" height="21">
            <path
              fill="#A3E635"
              d="M116.72,89.43l-1.61-0.92L75.3,65.68L37.2,86.14c-1.91,1.02-4.28,0.16-5.08-1.85L9.34,27.6L0.28,5.05C-1.11,1.59,3-1.46,5.91,0.86L60.8,44.65L82.4,61.87l32.83,26.37L116.72,89.43z"
            />
            <path
              fill="#51731A"
              d="M149.72,0.47c3.21-1.73,6.81,1.56,5.37,4.92l-13.3,31l-19.48,47.96c-0.99,2.44-4.08,3.19-6.08,1.48L91.49,64.67l-23.72-20.2L149.72,0.47z"
            />
          </svg>
          <span
            style={{
              color: "#888",
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            SELECTED WORKS
          </span>
        </div>

        <p
          style={{
            color: "#ffffff",
            fontSize: title.length > 30 ? "72px" : "90px",
            fontWeight: 900,
            lineHeight: 0.9,
            margin: 0,
            letterSpacing: "-3px",
            textTransform: "uppercase",
          }}
        >
          {title.length > 40 ? title.slice(0, 38) + "…" : title}
        </p>
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: "rgba(163,230,53,0.12)",
                  border: "1px solid rgba(163,230,53,0.25)",
                  color: "#a3e635",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  padding: "5px 14px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>,
    { ...size }
  );
}
