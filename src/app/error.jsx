"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("[Error]", error);
  }, [error]);

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        margin: 0,
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>
        Something went wrong
      </h1>
      <p style={{ color: "#888", marginBottom: "2rem", maxWidth: "400px" }}>
        We hit an unexpected error. Please try again — if it keeps happening,
        contact us at info@wefik.in.
      </p>
      <button
        onClick={() => reset()}
        style={{
          backgroundColor: "#a3e635",
          color: "#000",
          border: "none",
          padding: "14px 32px",
          borderRadius: "100px",
          fontWeight: 700,
          fontSize: "14px",
          cursor: "pointer",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
