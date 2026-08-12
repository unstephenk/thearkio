import { ImageResponse } from "next/og";

export const alt = "The Ark — Websites built to move businesses forward.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "62px 70px",
          color: "#f2efe8",
          background:
            "radial-gradient(circle at 78% 20%, #765f46 0%, #2b2824 18%, #111311 48%, #080908 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="52" height="52" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M10.5 52 29.2 17.2c1.2-2.2 4.4-2.2 5.6 0L53.5 52" fill="none" stroke="#f2efe8" strokeWidth="6" />
              <path d="M21.5 40.3h21" fill="none" stroke="#c8a46a" strokeWidth="5" />
            </svg>
            <strong style={{ letterSpacing: "0.04em" }}>The Ark</strong>
          </div>
          <span style={{ color: "#bab7af" }}>Dallas–Fort Worth</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 78, lineHeight: 0.98, maxWidth: 920 }}>
            Websites built to move businesses forward.
          </div>
          <div style={{ fontSize: 24, color: "#cbc8c0" }}>
            Custom landing pages for small businesses.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
