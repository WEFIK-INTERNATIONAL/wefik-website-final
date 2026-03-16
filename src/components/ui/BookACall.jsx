"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookACall({ children }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#23a818" },
          dark: { "cal-brand": "#28ab36" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <button
      data-cal-namespace="30min"
      data-cal-link="wefik/30min"
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}
