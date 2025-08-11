import Homepage from "./pages/feat/Homepage";
import Kategori from "./pages/feat/Kategori";
import DetailProduk from "./pages/feat/DetailProduk";
import Layout from "./components/Layout";
import ShopCart from "./pages/feat/ShopCart";
import ConfirmCode from "./pages/auth/ConfirmCode";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import { Routes, Route, Link } from "react-router-dom";
import Wishlist from "./pages/feat/Wishlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route element={<Layout />}>
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/kategori/:productId" element={<DetailProduk />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shopcart" element={<ShopCart />} />
      </Route>

      <Route path="/confirmcode" element={<ConfirmCode />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/resetpassword" element={<ResetPassword />}></Route>

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
