import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg, for iPhone home screens.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e2129" }}>
        <svg viewBox="0 0 64 64" width="150" height="150">
          <path d="M32 4C50 3 61 14 60 32C59 50 48 61 31 60C14 59 3 48 4 31C5 14 15 5 32 4Z" fill="#166534" />
          <path d="M41.5 21.5C37.5 15 24.5 15.5 23.5 23.5C22.5 31 41 29.5 41 40C41 49 26.5 50.5 21 43" fill="none" stroke="#bbf7d0" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="46.5" r="4" fill="#ffe14d" />
        </svg>
      </div>
    ),
    size,
  );
}
