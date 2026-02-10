import { useEffect, useState } from "react";

let dataInCache: string[] = [];

export function DataIn() {
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [sourceQuery, setSourceQuery] = useState("");
  const [sources, setSources] = useState<string[]>(() => dataInCache);
  const sourcePresets = ["JSON API", "Serial RS 422", "Excel", "SIHF Scraper"];

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bgdh.data_in_sources");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter((item) => typeof item === "string");
        dataInCache = clean;
        setSources(clean);
      }
    } catch {
      // ignore invalid cache or unavailable storage
    }
  }, []);

  useEffect(() => {
    dataInCache = sources;
    try {
      localStorage.setItem("bgdh.data_in_sources", JSON.stringify(sources));
    } catch {
      // ignore unavailable storage
    }
  }, [sources]);

  return (
    <div style={{ display: "grid", gap: 20, maxWidth: 980 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
          Data In
        </div>
        <h1 style={{ margin: 0 }}>Data Connections Input</h1>
      </div>

      <div
        style={{
          background: "var(--bg-elev)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 18,
          display: "grid",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Data Sources</div>
          <button
            type="button"
            onClick={() => setIsSourceModalOpen(true)}
            style={{ marginLeft: "auto", background: "#0f1b2e", borderColor: "#1b2f4a" }}
          >
            Connect Data Source
          </button>
        </div>

        {sources.length > 0 && (
          <div style={{ display: "grid", gap: 10 }}>
            {sources.map((name) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  background: "var(--bg)",
                }}
              >
                <div style={{ fontWeight: 600 }}>{name}</div>
                <button type="button" style={{ background: "#0f2418", borderColor: "#1a3b28" }}>
                  Configure
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isSourceModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "grid",
            placeItems: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "min(520px, 92vw)",
              background: "var(--bg-elev)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 20,
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>Connect Data Source</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Search and choose a preset data connection type.
            </div>
            <input
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text)",
              }}
              placeholder="Search presets"
              value={sourceQuery}
              onChange={(event) => setSourceQuery(event.target.value)}
            />
            <div style={{ display: "grid", gap: 8, maxHeight: 220, overflowY: "auto" }}>
              {sourcePresets
                .filter((preset) => preset.toLowerCase().includes(sourceQuery.trim().toLowerCase()))
                .map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setSources((prev) => (prev.includes(preset) ? prev : [...prev, preset]));
                      setSourceQuery("");
                      setIsSourceModalOpen(false);
                    }}
                    style={{
                      textAlign: "left",
                      width: "100%",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      padding: "10px 12px",
                    }}
                  >
                    {preset}
                  </button>
                ))}
              {sourcePresets.filter((preset) =>
                preset.toLowerCase().includes(sourceQuery.trim().toLowerCase())
              ).length === 0 && (
                <div style={{ color: "var(--muted)", fontSize: 12 }}>No presets found.</div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsSourceModalOpen(false);
                  setSourceQuery("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
