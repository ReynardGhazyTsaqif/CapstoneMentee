import AdminLayout from "../../Component/admin/AdminLayout";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Products() {
  const allProducts = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    foto: "",
    nama: `Nike Air Force 1 '07 - ${i + 1}`,
    kategori: "Sneakers",
    harga: `Rp${(700000 + i * 5000).toLocaleString()}`,
    stok: 100 - i,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  // Ambil data sesuai halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = allProducts.slice(startIndex, startIndex + itemsPerPage);

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const maxVisible = 5; // jumlah nomor yang terlihat
  const startPage = Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
  const endPage = Math.min(startPage + maxVisible - 1, totalPages);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5  text-4xl">
        Produk Management
      </h1>
      <div className="flex items-center w-full my-16 ">
        {/* Search */}
        <div className="relative flex-grow text-black rounded-xl ml-5">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari Produk"
            className="w-full text-xl  pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
          />
        </div>

        {/* Button */}
        <Link
          to="/admin/addproduct"
          className="bg-black text-white px-6 py-4 text-xl rounded-3xl mx-24"
        >
          Tambah Produk
        </Link>
      </div>

      <div className="ml-5 mr-24 shadow-md">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Foto
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Nama Produk
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Kategori
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Harga
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Stok
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Status
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((product) => (
              <tr key={product.id}>
                <td className="border-b border-gray-200 px-8 py-10">
                  <div className="w-12 h-12 bg-gray-300 rounded" />
                </td>
                <td className="border-b border-gray-200 px-8 py-10">
                  {product.nama}
                </td>
                <td className="border-b border-gray-200 px-8 py-10">
                  {product.kategori}
                </td>
                <td className="border-b border-gray-200 px-8 py-10">
                  {product.harga}
                </td>
                <td className="border-b border-gray-200 px-8 py-10">
                  {product.stok}
                </td>
                <td className="border-b border-gray-200 px-8 py-10">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      product.status === "Active"
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="border-b border-gray-200 px-8 py-10 underline">
                  <Link to="/admin/editproduct">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-16 space-x-4 ">
        {/* Tombol Previous */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={` rounded-md border p-8 text-gray-500 ${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Nomor Halaman */}
        {visiblePages.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-24 h-24 flex items-center justify-center rounded-md border ${
              num === currentPage
                ? "bg-black text-white"
                : "text-gray-500 hover:bg-gray-300"
            }`}
          >
            {num}
          </button>
        ))}

        {/* Tombol Next */}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`rounded-md border p-8 text-gray-500 ${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </AdminLayout>
  );
}

export default Products;
