import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function TableDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const decodedName = name ? decodeURIComponent(name) : "Unknown";
  const [status, setStatus] = useState<"Draft" | "Saved">("Draft");
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [isRemoveColumnOpen, setIsRemoveColumnOpen] = useState(false);
  const [isRemoveRowOpen, setIsRemoveRowOpen] = useState(false);
  const presets = ["Basic", "Inventory", "Sales", "Customer", "Events"];
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [rowNames, setRowNames] = useState<string[]>([]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      if (isRemoveColumnOpen) {
        event.preventDefault();
        setIsRemoveColumnOpen(false);
        setColumns((prev) => prev.slice(0, -1));
        setRows((prev) => prev.map((r) => r.slice(0, -1)));
      }
      if (isRemoveRowOpen) {
        event.preventDefault();
        setIsRemoveRowOpen(false);
        setRows((prev) => prev.slice(0, -1));
        setRowNames((prev) => prev.slice(0, -1));
      }
    };
    if (isRemoveColumnOpen || isRemoveRowOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
    return undefined;
  }, [isRemoveColumnOpen, isRemoveRowOpen]);

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 900 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
          Manage Data / {decodedName}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button>
          <h1 style={{ margin: 0 }}>{decodedName}</h1>
          <div style={{ position: "relative", marginLeft: "auto" }}>
            <button
              type="button"
              onClick={() => setIsPresetOpen((prev) => !prev)}
              style={{
                background: "#3a2e0a",
                borderColor: "#6a5212",
                color: "#f7e4a2",
              }}
            >
              Load Structure
            </button>
            {isPresetOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "var(--bg-elev)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 6,
                  minWidth: 180,
                  display: "grid",
                  gap: 4,
                  zIndex: 20,
                }}
              >
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setIsPresetOpen(false);
                      setStatus("Draft");
                      if (preset === "Basic") {
                        setColumns(["Column 1", "Column 2", "Column 3"]);
                        setRows([
                          ["", "", ""],
                          ["", "", ""],
                          ["", "", ""],
                        ]);
                        setRowNames(["Row 1", "Row 2", "Row 3"]);
                      }
                    }}
                    style={{
                      textAlign: "left",
                      width: "100%",
                      background: "transparent",
                      border: "1px solid transparent",
                      padding: "8px 10px",
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setStatus("Saved")}
            style={{
              background: "#0f2418",
              borderColor: "#1a3b28",
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 18,
          background: "var(--bg-elev)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Name</div>
            <div style={{ fontWeight: 600 }}>{decodedName}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Status</div>
            <div
              style={{
                fontWeight: 600,
                color: status === "Saved" ? "#4cc98a" : "var(--text)",
              }}
            >
              {status}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Rows</div>
            <div style={{ fontWeight: 600 }}>{rows.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Last Updated</div>
            <div style={{ fontWeight: 600 }}>Not yet synced</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <button
          type="button"
          onClick={() => {
            if (columns.length === 0) return;
            setRows((prev) => [...prev, Array.from({ length: columns.length }, () => "")]);
            setRowNames((prev) => [...prev, `Row ${prev.length + 1}`]);
          }}
          style={{ background: "#0f2418", borderColor: "#1a3b28" }}
        >
          Add Row
        </button>
        <button
          type="button"
          onClick={() => {
            if (rows.length === 0) return;
            setIsRemoveRowOpen(true);
          }}
          style={{ background: "#2a0f12", borderColor: "#4a1a1f" }}
        >
          Remove Row
        </button>
        <button
          type="button"
          onClick={() => {
            const nextIndex = columns.length + 1;
            setColumns((prev) => [...prev, `Column ${nextIndex}`]);
            setRows((prev) => prev.map((r) => [...r, ""]));
          }}
          style={{ background: "#0f2418", borderColor: "#1a3b28" }}
        >
          Add Column
        </button>
        <button
          type="button"
          onClick={() => {
            if (columns.length === 0) return;
            setIsRemoveColumnOpen(true);
          }}
          style={{ background: "#2a0f12", borderColor: "#4a1a1f" }}
        >
          Remove Column
        </button>
        <button
          type="button"
          style={{
            background: "#0f1b2e",
            borderColor: "#1b2f4a",
            marginLeft: "auto",
          }}
        >
          Link Data
        </button>
      </div>

      {isRemoveColumnOpen && (
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
              width: "min(480px, 92vw)",
              background: "var(--bg-elev)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 20,
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>Remove Column</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              This will remove the last column and its data. Are you sure?
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => setIsRemoveColumnOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRemoveColumnOpen(false);
                  setColumns((prev) => prev.slice(0, -1));
                  setRows((prev) => prev.map((r) => r.slice(0, -1)));
                }}
              >
                Confirm [Enter]
              </button>
            </div>
          </div>
        </div>
      )}

      {isRemoveRowOpen && (
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
              width: "min(480px, 92vw)",
              background: "var(--bg-elev)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 20,
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>Remove Row</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              This will remove the last row and its data. Are you sure?
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button type="button" onClick={() => setIsRemoveRowOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRemoveRowOpen(false);
                  setRows((prev) => prev.slice(0, -1));
                  setRowNames((prev) => prev.slice(0, -1));
                }}
              >
                Confirm [Enter]
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          border: "1px dashed var(--border)",
          borderRadius: 16,
          padding: 18,
          color: "var(--muted)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        {columns.length === 0 ? (
          "Field editor, permissions, and ingest rules will appear here."
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 520,
                  background: "#0b0b0b",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        fontSize: 11,
                        color: "var(--muted)",
                        borderBottom: "1px solid var(--border)",
                        padding: "6px",
                        background: "#101010",
                        width: 48,
                      }}
                    >
                      
                    </th>
                    {columns.map((col, colIndex) => (
                      <th
                        key={`col-${colIndex}`}
                        style={{
                          textAlign: "left",
                          fontSize: 12,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--muted)",
                          borderBottom: "1px solid var(--border)",
                          padding: "6px",
                          background: "#101010",
                        }}
                      >
                        <input
                          value={col}
                          onChange={(event) => {
                            const value = event.target.value;
                            setColumns((prev) => prev.map((c, i) => (i === colIndex ? value : c)));
                          }}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            color: "var(--muted)",
                            fontSize: 12,
                            outline: "none",
                            textAlign: "center",
                            padding: "6px 0",
                          }}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                      <td
                        style={{
                          padding: "0 6px",
                          borderBottom: "1px solid var(--border)",
                          borderRight: "1px solid var(--border)",
                          color: "var(--muted)",
                          fontSize: 12,
                          background: "#0f0f0f",
                          width: 48,
                          textAlign: "center",
                        }}
                      >
                        <input
                          value={rowNames[rowIndex] ?? `Row ${rowIndex + 1}`}
                          onChange={(event) => {
                            const value = event.target.value;
                            setRowNames((prev) => {
                              const next = [...prev];
                              next[rowIndex] = value;
                              return next;
                            });
                          }}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            color: "var(--muted)",
                            textAlign: "center",
                            fontSize: 12,
                            outline: "none",
                            padding: "6px 0",
                          }}
                        />
                      </td>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`cell-${rowIndex}-${cellIndex}`}
                          style={{
                            padding: 0,
                            borderBottom: "1px solid var(--border)",
                            borderRight: "1px solid var(--border)",
                            color: "var(--text)",
                            fontSize: 13,
                          }}
                        >
                          <input
                            value={cell}
                            placeholder=""
                            onChange={(event) => {
                              const value = event.target.value;
                              setRows((prev) =>
                                prev.map((r, rIndex) =>
                                  rIndex === rowIndex
                                    ? r.map((c, cIndex) => (cIndex === cellIndex ? value : c))
                                    : r
                                )
                              );
                            }}
                            style={{
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              color: "var(--text)",
                              padding: "8px 6px",
                              fontSize: 13,
                              outline: "none",
                            }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
