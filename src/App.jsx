import Homepage from "./pages/homepage";
import Kategori from "./pages/Kategori";
import DetailProduk from "./pages/DetailProduk";
import Layout from "./components/Layout";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      {/* === RUTE UNTUK HOMEPAGE (TIDAK PAKAI LAYOUT) === */}
      {/* Rute ini berdiri sendiri. Saat URL adalah "/", hanya komponen Homepage
          yang akan dirender, lengkap dengan navbar uniknya. */}
      <Route path="/" element={<Homepage />} />

      {/* === RUTE UNTUK HALAMAN LAIN (PAKAI LAYOUT) === */}
      {/* Ini adalah "Route Pembungkus". Semua rute di dalamnya akan
          secara otomatis dibungkus oleh komponen <Layout />. */}
      <Route element={<Layout />}>
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/produk/:productId" element={<DetailProduk />} />
        {/* Tambahkan rute lain yang butuh navbar standar di sini */}
      </Route>

      {/* Rute untuk halaman 404 bisa diletakkan di sini */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
