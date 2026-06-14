import { ImageResponse } from "next/og";

export const alt = "Les Éditions Deeqsan — Librairie & Maison d'édition à Djibouti";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #0e2018 0%, #112a1f 55%, #1c5a45 130%)",
          color: "#f1ede1",
        }}
      >
        {/* Logo : trois livres dressés + courbe */}
        <svg width="140" height="140" viewBox="0 0 34 34" fill="none">
          <rect x="2" y="6" width="7" height="22" rx="1.5" fill="#27b892" />
          <rect x="11" y="3" width="7" height="25" rx="1.5" fill="#ef7d54" />
          <rect x="20" y="8" width="7" height="20" rx="1.5" fill="#f6b73c" />
          <path d="M5 28c4 3 18 3 24-3" stroke="#5eecc2" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 36, letterSpacing: -2 }}>
          Les Éditions Deeqsan
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 18, color: "#aebcad" }}>
          Librairie & maison d&apos;édition à Djibouti
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 42,
            fontSize: 24,
            color: "#5eecc2",
          }}
        >
          <span>Somali</span>
          <span style={{ color: "#aebcad" }}>·</span>
          <span>Afar</span>
          <span style={{ color: "#aebcad" }}>·</span>
          <span>Arabe</span>
          <span style={{ color: "#aebcad" }}>·</span>
          <span>Français</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
