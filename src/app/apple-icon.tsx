import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the SE mark on the site's deep purple.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e2a2f",
          color: "#ffffff",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -4,
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ backgroundImage: "linear-gradient(135deg, #ffb454, #ff7a59)", backgroundClip: "text", color: "transparent" }}>SE</span>
      </div>
    ),
    size,
  );
}
