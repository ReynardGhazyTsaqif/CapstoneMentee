// src/App.jsx
import React from "react";
import { StrictMode } from "react";
import "./index.css";
import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./Pages/auth/forgotpassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProductForm from "./pages/admin/ProductForm";
import ProductList from "./pages/admin/ProductList";
import UserDashboard from "./pages/user/UserDashboard";
import ConfirmCode from "./pages/auth/ConfirmCode";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/confirmcode" element={<ConfirmCode />} />

      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/admin/productform" element={<ProductForm />} />
      <Route path="/admin/productlist" element={<ProductList />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
