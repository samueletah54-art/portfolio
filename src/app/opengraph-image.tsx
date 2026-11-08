import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.title.en}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0b0a",
          backgroundImage:
            "linear-gradient(rgba(237,237,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(237,237,234,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#ededea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#9a9f99", letterSpacing: 4, textTransform: "uppercase" }}>
          <span style={{ color: "#3ddc84" }}>~/</span>samuel-etah · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 124, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            {site.name}
            <span style={{ color: "#3ddc84" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#ededea" }}>
            <span style={{ color: "#3ddc84", marginRight: 16 }}>$</span>
            {site.title.en}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9a9f99" }}>Websites · Security · Video editing · Ghostwriting</div>
      </div>
    ),
    size,
  );
}
