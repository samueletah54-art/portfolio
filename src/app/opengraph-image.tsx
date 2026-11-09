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
          background: "#0b0713",
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: "#ede9f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a39bb8", letterSpacing: 4, textTransform: "uppercase" }}>
          <span style={{ color: "#c084fc" }}>~/</span>samuel-etah · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 124, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            {site.name}
            <span style={{ color: "#c084fc" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#ede9f6" }}>
            <span style={{ color: "#c084fc", marginRight: 16 }}>$</span>
            {site.title.en}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a39bb8" }}>Websites · Security · Video editing · Ghostwriting</div>
      </div>
    ),
    size,
  );
}
