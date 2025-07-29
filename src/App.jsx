import { StrictMode } from "react";
import "./index.css";
import "./App.css";
import Register from "./pages/auth/register";

export default function App() {
  return (
    <>
      <StrictMode>
        <Register />
      </StrictMode>
    </>
  );
}
