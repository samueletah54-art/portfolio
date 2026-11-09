import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg, for iPhone home screens.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e2129" }}>
        <svg viewBox="0 0 64 64" width="180" height="180">
          <rect width="64" height="64" fill="#14532d" />
          <g transform="translate(5 14) scale(1.42)" fill="none" stroke="#dcfce7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 4.6C11 2.2 4.3 2.4 4.2 7.2C4.1 12.4 14.2 10.9 14 17.3C13.8 23.1 6.3 23.9 2.6 20.3" />
            <path d="M31.5 3.8C27.6 3.2 23.4 3.4 20.9 4.3C20 10 20.1 15.8 21.1 21.6C24.6 22.4 28.1 22.3 31.4 21.5" />
            <path d="M20.6 12.6C23.3 12.2 26 12.3 28.4 12.9" />
          </g>
          <circle cx="54" cy="47" r="3.6" fill="#ffe14d" />
        </svg>
      </div>
    ),
    size,
  );
}
