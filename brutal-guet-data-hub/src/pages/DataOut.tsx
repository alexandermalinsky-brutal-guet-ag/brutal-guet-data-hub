export function DataOut() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
        Data Out
      </div>
      <h1 style={{ margin: 0 }}>Data Out</h1>
      <div>
        <button
          type="button"
          style={{
            background: "#0f1b2e",
            borderColor: "#1b2f4a",
          }}
        >
          Connect Data Source
        </button>
      </div>
    </div>
  );
}
