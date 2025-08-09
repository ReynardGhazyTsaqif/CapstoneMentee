import Homepage from "./pages/homepage";
import Kategori from "./pages/Kategori";
import DetailProduk from "./pages/DetailProduk";
import Layout from "./components/Layout";
import { Routes, Route, Link } from "react-router-dom";
import Whislist from "./pages/Wishlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route element={<Layout />}>
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/kategori/:productId" element={<DetailProduk />} />
        <Route path="/whislist" element={<Whislist />} />
      </Route>

      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
