import Homepage from "./pages/Homepage";
import Kategori from "./pages/Kategori";
import DetailProduk from "./pages/DetailProduk";
import Layout from "./components/Layout";
import ShopCart from "./pages/ShopCart";
import { Routes, Route, Link } from "react-router-dom";
import Wishlist from "./pages/Wishlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route element={<Layout />}>
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/kategori/:productId" element={<DetailProduk />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shopcart" element={<ShopCart />} />
      </Route>

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
