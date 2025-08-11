import { useLocation } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";

export default function DynamicBreadcrumb() {
  const location = useLocation();

  // Jangan tampilkan breadcrumb di halaman utama
  if (location.pathname === "/") {
    return null;
  }

  // Memecah path URL menjadi segmen-segmen
  // Contoh: "/products/shoes" -> ["products", "shoes"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  let currentLink = "";
  const crumbs = [
    // Tambahkan "Home" sebagai crumb pertama
    { label: "Home", path: "/" },
    // Buat crumb untuk setiap segmen path
    ...pathnames.map((name) => {
      currentLink += `/${name}`;
      // Ubah nama path menjadi judul yang lebih rapi (misal: "running-shoes" -> "Running Shoes")
      const formattedName = name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        label: formattedName,
        path: currentLink,
      };
    }),
  ];

  return <Breadcrumb crumbs={crumbs} />;
}
