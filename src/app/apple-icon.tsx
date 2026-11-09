import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e2129", color: "#4ade80", fontSize: 84, fontWeight: 900, letterSpacing: -4 }}>
        SE
      </div>
    ),
    size,
  );
}
