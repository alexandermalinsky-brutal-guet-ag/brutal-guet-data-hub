import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { DataIn } from "../pages/DataIn";
import { Manage } from "../pages/Manage";
import { DataOut } from "../pages/DataOut";
import { Projekt } from "../pages/Projekt";
import { TableDetails } from "../pages/TableDetails";
import { Settings } from "../pages/Settings";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/data-in" replace />} />
        <Route path="/data-in" element={<DataIn />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/data-out" element={<DataOut />} />
        <Route path="/projekt" element={<Projekt />} />
        <Route path="/table/:name" element={<TableDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
