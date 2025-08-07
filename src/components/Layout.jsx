import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Mengimpor Navbar yang sudah kita buat
import DynamicBreadcrumb from "./DynamicBreadcrumb"; // Mengimpor komponen breadcrumb dinamis

// Komponen Footer opsional sebagai contoh
const Footer = () => (
  <footer className="bg-black text-white text-center p-4">
    © 2025 BrandName. All rights reserved.
  </footer>
);

export default function Layout() {
  return (
    // 'flex flex-col min-h-screen' adalah trik agar footer menempel di bawah
    // jika konten halaman pendek.
    <div className="flex bg-black flex-col min-h-screen">
      {/* Navbar akan selalu tampil di bagian atas halaman */}
      <div className="mt-4 px-4 bg-black  shadow">
        <Navbar />
      </div>

      {/* <main> akan mengisi sisa ruang yang tersedia */}
      <main className="flex-grow">
        {/* Di sinilah konten halaman (Kategori, DetailProduk, dll) akan dirender */}
        <div className="flex flex-col ">
          <header className="py-2 px-4 hidden md:block">
            <DynamicBreadcrumb />
          </header>
          <div className="mt-4 md:mt-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
