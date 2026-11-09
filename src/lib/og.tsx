import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const avatar = (name: string) =>
  `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), "public", "avatar", `${name}.png`)).toString("base64")}`;

// Share image: dark background, green accents, the title, and the avatar on the right.
export function ogImage({ kicker, title, sub, pose = "hero-sitting" }: { kicker: string; title: string; sub?: string; pose?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1e2129", color: "#eef2ee", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", right: -120, bottom: -160, width: 640, height: 640, borderRadius: 9999, background: "#16a34a", opacity: 0.35, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 820 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#4ade80" }}>{kicker}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: title.length > 48 ? 58 : 70, fontWeight: 900, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
            {sub && <div style={{ marginTop: 22, fontSize: 30, color: "#aab3c0", lineHeight: 1.3 }}>{sub}</div>}
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 800 }}>
            Samuel <span style={{ color: "#4ade80", marginLeft: 10 }}>ETAH</span>
            <span style={{ color: "#ffe14d", marginLeft: 24 }}>Code. Secure. Create.</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar(pose)} alt="" height={560} style={{ position: "absolute", right: 30, bottom: 0 }} />
      </div>
    ),
    ogSize,
  );
}
