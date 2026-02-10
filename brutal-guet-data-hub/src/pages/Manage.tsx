import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let tableCache: string[] = [];
let feedCache: string[] = [];

export function Manage() {
  const navigate = useNavigate();
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isEditTableModalOpen, setIsEditTableModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [editTableName, setEditTableName] = useState("");
  const [editingTable, setEditingTable] = useState<string | null>(null);
  const [feedName, setFeedName] = useState("");
  const [tables, setTables] = useState<string[]>(() => tableCache);
  const [feeds, setFeeds] = useState<string[]>(() => feedCache);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bgdh.tables");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter((item) => typeof item === "string");
        tableCache = clean;
        setTables(clean);
      }
    } catch {
      // ignore invalid cache or unavailable storage
    }
  }, []);

  useEffect(() => {
    tableCache = tables;
    try {
      localStorage.setItem("bgdh.tables", JSON.stringify(tables));
    } catch {
      // ignore unavailable storage
    }
  }, [tables]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bgdh.feeds");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const clean = parsed.filter((item) => typeof item === "string");
        feedCache = clean;
        setFeeds(clean);
      }
    } catch {
      // ignore invalid cache or unavailable storage
    }
  }, []);

  useEffect(() => {
    feedCache = feeds;
    try {
      localStorage.setItem("bgdh.feeds", JSON.stringify(feeds));
    } catch {
      // ignore unavailable storage
    }
  }, [feeds]);

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 980 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
          Manage Data
        </div>
        <h1 style={{ margin: 0, fontSize: 32 }}>Tables + Live Data Feeds</h1>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
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
            <div style={{ fontSize: 20, fontWeight: 600 }}>Tables</div>
            <button type="button" onClick={() => setIsTableModalOpen(true)} style={{ marginLeft: "auto" }}>
              Create Table
            </button>
          </div>

          {tables.length > 0 && (
            <div style={{ display: "grid", gap: 10 }}>
              {tables.map((name) => (
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
                    gap: 10,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{name}</div>
                  <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTable(name);
                        setEditTableName(name);
                        setIsEditTableModalOpen(true);
                      }}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/table/${encodeURIComponent(name)}`)}
                      style={{
                        background: "#0f2418",
                        borderColor: "#1a3b28",
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            <div style={{ fontSize: 20, fontWeight: 600 }}>Live Data Feeds</div>
            <button type="button" onClick={() => setIsFeedModalOpen(true)} style={{ marginLeft: "auto" }}>
              Create Data Feed
            </button>
          </div>

          {feeds.length > 0 && (
            <div style={{ display: "grid", gap: 10 }}>
              {feeds.map((name) => (
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
      </div>

      <div
        style={{
          border: "1px dashed var(--border)",
          borderRadius: 16,
          padding: 18,
          color: "var(--muted)",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>Nothing configured yet</div>
        Create a table to define your schema, then connect a live data feed to start syncing.
      </div>

      {isTableModalOpen && (
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
            <div style={{ fontSize: 18, fontWeight: 600 }}>Create Table</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Add a name to get started. You can configure fields later.
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
              placeholder="Table name"
              value={tableName}
              onChange={(event) => setTableName(event.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsTableModalOpen(false);
                  setTableName("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!tableName.trim()}
                onClick={() => {
                  const trimmed = tableName.trim();
                  if (!trimmed) return;
                  setTables((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                  setTableName("");
                  setIsTableModalOpen(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditTableModalOpen && (
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
            <div style={{ fontSize: 18, fontWeight: 600 }}>Edit Table Name</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Update the name. This only changes the label for now.
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
              placeholder="Table name"
              value={editTableName}
              onChange={(event) => setEditTableName(event.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsEditTableModalOpen(false);
                  setEditTableName("");
                  setEditingTable(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!editTableName.trim()}
                onClick={() => {
                  if (!editingTable) return;
                  const trimmed = editTableName.trim();
                  if (!trimmed || trimmed === editingTable) {
                    setIsEditTableModalOpen(false);
                    setEditTableName("");
                    setEditingTable(null);
                    return;
                  }
                  setTables((prev) => prev.map((t) => (t === editingTable ? trimmed : t)));
                  setIsEditTableModalOpen(false);
                  setEditTableName("");
                  setEditingTable(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isFeedModalOpen && (
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
            <div style={{ fontSize: 18, fontWeight: 600 }}>Create Data Feed</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              Add a name to get started. You can configure the feed later.
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
              placeholder="Data feed name"
              value={feedName}
              onChange={(event) => setFeedName(event.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => {
                  setIsFeedModalOpen(false);
                  setFeedName("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!feedName.trim()}
                onClick={() => {
                  const trimmed = feedName.trim();
                  if (!trimmed) return;
                  setFeeds((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                  setFeedName("");
                  setIsFeedModalOpen(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
