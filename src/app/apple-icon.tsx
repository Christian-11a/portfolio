import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the same "CE_" mark as the favicon and nav. */
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
          background: "#0b0b0c",
          color: "#ededee",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: 4,
          fontFamily: "monospace",
        }}
      >
        CE
        <div style={{ width: 30, height: 10, background: "#34d399", borderRadius: 3, marginTop: 44, marginLeft: 6 }} />
      </div>
    ),
    size,
  );
}
