import { ImageResponse } from "next/og";

export const alt = "League Tac Toe — League of Legends champion tic-tac-toe quiz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "72px",
                    background: "linear-gradient(160deg, #0a1428 0%, #1e2328 55%, #091428 100%)",
                    color: "#f0e6d2",
                    fontFamily: "Georgia, serif",
                }}
            >
                <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#c8aa6e" }}>
                    Free browser game
                </div>
                <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1.05 }}>League Tac Toe</div>
                <div style={{ fontSize: 32, marginTop: 20, color: "#a09b8c", maxWidth: 900 }}>
                    Name League of Legends champions that match two categories. Three in a row wins.
                </div>
            </div>
        ),
        { ...size }
    );
}
