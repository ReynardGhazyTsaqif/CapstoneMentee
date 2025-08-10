// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './Pages/auth/forgotpassword';
import ResetPassword from './pages/auth/ResetPassword';
import UserDashboard from './pages/user/UserDashboard';
import ConfirmCode from './pages/auth/ConfirmCode';
import AdminDashboard from './pages/admin/AdminDashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import Analytics from './pages/admin/Analytics';
import Orders from './pages/admin/Orders';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';

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
      
      
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/addproduct" element={<AddProduct />} />
      <Route path="/admin/editproduct" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
