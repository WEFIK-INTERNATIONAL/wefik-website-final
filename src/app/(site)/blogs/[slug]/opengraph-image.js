/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getBlogBySlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SEO } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }) {
  const { slug } = params;

  let title = `${SEO.siteName} Blog`;
  let category = "Insights";
  let coverUrl = null;

  try {
    const post = await getBlogBySlug(slug);
    if (post) {
      title = post.title;
      category = post.categories?.[0]?.title ?? "Insights";
      if (post.coverImage?.asset) {
        coverUrl = urlFor(post.coverImage).width(1200).height(630).url();
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
            opacity: 0.35,
            filter: "blur(2px) saturate(0.7)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "56px 72px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
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
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            WEFIK
          </span>
          <span style={{ color: "#555", fontSize: "14px" }}>· Blog</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(163,230,53,0.15)",
            border: "1px solid rgba(163,230,53,0.3)",
            borderRadius: "100px",
            padding: "5px 16px",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#a3e635",
            }}
          />
          <span
            style={{
              color: "#a3e635",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
        </div>

        <p
          style={{
            color: "#ffffff",
            fontSize: title.length > 60 ? "42px" : "52px",
            fontWeight: 900,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-1.5px",
            maxWidth: "900px",
          }}
        >
          {title.length > 80 ? title.slice(0, 77) + "…" : title}
        </p>
      </div>
    </div>,
    { ...size }
  );
}
