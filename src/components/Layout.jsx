import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import DynamicBreadcrumb from "./DynamicBreadcrumb";

// Komponen Footer opsional sebagai contoh
const Footer = () => (
  <footer className="bg-black text-white text-center p-4">
    © 2025 BrandName. All rights reserved.
  </footer>
);

export default function Layout() {
  return (
    <div className="flex bg-black flex-col min-h-screen">
      <div className="mt-4 px-4 bg-black  shadow">
        <Navbar />
      </div>

      <main className="flex-grow">
        {/*konten halaman (Kategori, DetailProduk, dll) dirender */}
        <div className="flex flex-col ">
          <header className="py-2 px-4 hidden md:block"></header>
          <div className="mt-4 md:mt-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
