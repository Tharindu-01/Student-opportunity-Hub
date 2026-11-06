
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      {/* Existing WayaLink V6 Homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Student Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Unknown routes return to homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
