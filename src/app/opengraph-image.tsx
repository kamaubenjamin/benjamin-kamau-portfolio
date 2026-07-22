import { ImageResponse } from "next/og";

export const alt = "Benjamin Kamau — Data Engineer, Workflow Automation and Document Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#0a0a0a",
          color: "#f1f5f9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ color: "#10b981", display: "flex", fontSize: 30, fontWeight: 700 }}>
          BK PORTFOLIO
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, marginTop: 28 }}>
          Benjamin Kamau
        </div>
        <div style={{ color: "#a3e635", display: "flex", fontSize: 38, marginTop: 20 }}>
          Data Engineer | Workflow Automation | Document Intelligence
        </div>
        <div style={{ background: "#10b981", display: "flex", height: 8, marginTop: 48, width: 260 }} />
      </div>
    ),
    size
  );
}