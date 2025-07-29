import { StrictMode } from "react";
import "./index.css";
import "./App.css";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/ForgotPassword";

export default function App() {
  return (
    <>
      <StrictMode>
        <ForgotPassword />
      </StrictMode>
    </>
  );
}
