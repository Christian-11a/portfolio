import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, projects } from "@/content/site";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The card shown when the site link is shared on LinkedIn, Messenger, Discord and so on. */
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", profile.photo));
  const photoSrc = `data:image/${profile.photo.endsWith(".png") ? "png" : "jpeg"};base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0b0c",
          color: "#ededee",
          padding: 72,
          fontFamily: "sans-serif",
          borderLeft: "1px solid #222226",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 28, fontFamily: "monospace", fontWeight: 700, letterSpacing: 4 }}>
            CE<span style={{ color: "#34d399" }}>_</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
            <div style={{ fontSize: 34, color: "#8d8d93", marginTop: 16 }}>{profile.role}</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#8d8d93", fontFamily: "monospace" }}>
            {projects.map((p) => p.name).join("  /  ")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 330,
            height: 412,
            alignSelf: "center",
            borderRadius: 28,
            border: "1px solid #34343a",
            padding: 10,
            background: "#111113",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
          <img src={photoSrc} alt="" width={310} height={392} style={{ borderRadius: 20, objectFit: "cover", objectPosition: "50% 35%" }} />
        </div>
      </div>
    ),
    size,
  );
}
