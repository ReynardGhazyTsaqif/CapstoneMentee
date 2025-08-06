import "./index.css";
import "./App.css";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}
