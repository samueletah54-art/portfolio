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
          background: "#0e2a2f",
          backgroundImage:
            "linear-gradient(rgba(238,247,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(238,247,245,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#eef7f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a8c4c0", letterSpacing: 4, textTransform: "uppercase" }}>
          <span style={{ color: "#ffb454" }}>~/</span>samuel-etah · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 124, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            {site.name}
            <span style={{ color: "#ffb454" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#eef7f5" }}>
            <span style={{ color: "#ffb454", marginRight: 16 }}>$</span>
            {site.title.en}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a8c4c0" }}>Websites · Security · Video editing · Ghostwriting</div>
      </div>
    ),
    size,
  );
}
