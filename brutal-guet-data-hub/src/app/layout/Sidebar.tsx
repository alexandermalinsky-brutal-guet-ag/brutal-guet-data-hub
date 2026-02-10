import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  display: "block",
  padding: "9px 12px",
  borderRadius: 6,
  textDecoration: "none",
  color: isActive ? "var(--accent)" : "inherit",
  background: "transparent",
  border: isActive ? "1px solid var(--accent)" : "1px solid transparent",
  fontWeight: isActive ? 700 : 600,
});

export function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
        padding: 16,
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)",
        borderRight: "1px solid var(--sidebar-border)",
        boxShadow: "inset -1px 0 0 rgba(255, 255, 255, 0.03)",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          marginBottom: 14,
          letterSpacing: "0.02em",
          background: "var(--accent)",
          color: "#000000",
          padding: "12px 10px 8px",
          borderRadius: 0,
          marginLeft: -16,
          marginRight: -16,
          marginTop: -16,
        }}
      >
        Brutal Güet AG -  Data Hub
      </div>
      <nav style={{ display: "grid", gap: 8 }}>
        <NavLink to="/data-in" style={linkStyle}>Data In</NavLink>
        <NavLink to="/manage" style={linkStyle}>Manage Data</NavLink>
        <NavLink to="/data-out" style={linkStyle}>Data Out</NavLink>
        <NavLink to="/projekt" style={linkStyle}>Projekt</NavLink>
        <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
      </nav>
    </aside>
  );
}
