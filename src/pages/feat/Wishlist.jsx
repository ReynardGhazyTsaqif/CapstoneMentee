import React, { useState, useEffect } from "react";
import heroimage from "../../assets/img/heroimage.jpg";
import Card from "../../components/CardShoes";
import { Link } from "react-router-dom";
import api from "../../api/axios"; // Menggunakan instance axios

export default function Wishlist() {
  // 1. Siapkan state untuk item wishlist, loading, dan error
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Gunakan useEffect untuk mengambil data wishlist saat halaman dimuat
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        // Panggil endpoint untuk mengambil data wishlist pengguna yang sedang login
        const response = await api.get("/wishlist");
        setWishlistItems(response.data); // Asumsikan API mengembalikan array produk
      } catch (err) {
        console.error("Gagal mengambil data wishlist:", err);
        // Cek jika error karena tidak login (401 Unauthorized)
        if (err.response && err.response.status === 401) {
          setError("Anda harus login untuk melihat wishlist.");
        } else {
          setError("Gagal memuat wishlist. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []); // Array kosong agar hanya berjalan sekali

  const renderWishlistContent = () => {
    if (loading) {
      return <p className="text-center py-10">Memuat wishlist...</p>;
    }
    if (error) {
      return <p className="text-center py-10 text-red-500">{error}</p>;
    }
    // 3. Tambahkan kondisi jika wishlist kosong
    if (wishlistItems.length === 0) {
      return (
        <div className="text-center col-span-full py-10">
          <h2 className="text-2xl font-semibold mb-2">Wishlist Anda Kosong</h2>
          <p className="text-gray-600 mb-4">Ayo cari produk yang Anda sukai!</p>
          <Link
            to="/kategori"
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Mulai Belanja
          </Link>
        </div>
      );
    }
    // Jika ada isinya, tampilkan produk
    return wishlistItems.map((product) => (
      <Link key={product.id} to={`/produk/${product.id}`}>
        <Card
          // imageUrl={/* Proses URL gambar jika perlu */}
          name={product.name}
          description={product.description}
          rating={product.rating || "N/A"}
          price={`Rp${product.price.toLocaleString("id-ID")}`}
        />
      </Link>
    ));
  };

  return (
    <>
      <div className="flex flex-col">
        {/* hero section */}
        <div
          className="relative w-full h-[50vh] bg-cover bg-center mx-auto"
          style={{ backgroundImage: `url(${heroimage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="flex items-end justify-start h-full p-10">
            <h1 className="text-white text-4xl font-bold">Wishlist Saya</h1>
          </div>
        </div>

        <div className="w-full bg-white min-h-[50vh]">
          <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {renderWishlistContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
