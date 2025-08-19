import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DynamicBreadcrumb from "../../components/DynamicBreadcrumb";
import Card from "../../components/CardShoes";
import api from "../../api/axios";
import { Heart } from "lucide-react";

export default function DetailProduk() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengambil data produk utama
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products/${productId}`);

        const fetchedProduct = response.data;
        if (typeof fetchedProduct.specifications === "string") {
          fetchedProduct.specifications = JSON.parse(
            fetchedProduct.specifications
          );
        }

        setProduct(fetchedProduct);

        // Atur gambar aktif pertama kali
        if (
          fetchedProduct.imageGallery &&
          fetchedProduct.imageGallery.length > 0
        ) {
          setActiveImage(fetchedProduct.imageGallery[0]);
        }
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
        setError("Produk tidak dapat ditemukan atau terjadi kesalahan server.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await api.get(`/products/${productId}/rekomendasi`);
        setRecommendations(response.data);
      } catch (err) {
        console.error("Gagal mengambil rekomendasi:", err);
      }
    };

    fetchProductData();
    fetchRecommendations();
  }, [productId]); // Efek yang akan berjalan lagi jika productId berubah

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center py-20">Produk tidak ditemukan!</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Silakan pilih ukuran terlebih dahulu!");
      return;
    }
    console.log(
      `Menambahkan ${quantity} buah ${product.name} ukuran ${selectedSize} ke keranjang.`
    );
  };

  const handleWishlistToggle = async () => {
    const originalWishlistStatus = isWishlisted;

    setIsWishlisted(!originalWishlistStatus);

    try {
      if (!originalWishlistStatus) {
        // Jika sebelumnya tidak ada di wishlist, maka TAMBAHKAN
        await api.post("/wishlist", { productId: product.id });
      } else {
        // Jika sebelumnya sudah ada di wishlist, maka HAPUS
        await api.delete(`/wishlist/${product.id}`);
      }
    } catch (err) {
      console.error("Gagal update wishlist:", err);
      // Jika API gagal, kembalikan UI ke state semula
      setIsWishlisted(originalWishlistStatus);
      alert("Gagal memperbarui wishlist. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <DynamicBreadcrumb />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* KOLOM KIRI: GALERI GAMBAR */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-2 justify-center">
              {product.imageGallery.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                    activeImage === imgUrl
                      ? "border-black"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* KOLOM KANAN: DETAIL INFO PRODUK */}
          <div className="flex flex-col">
            <h2 className="text-sm uppercase text-gray-500">{product.brand}</h2>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>
            <div className="flex items-center mt-3 text-sm">
              <span>⭐ {product.rating.toFixed(1)}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>{product.reviewCount} Penilaian</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>{product.sold} Terjual</span>
            </div>
            <p className="text-4xl font-light text-gray-900 my-6">
              Rp{product.price.toLocaleString("id-ID")}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Pilih Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                      selectedSize === s.size
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    } ${
                      s.stock === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <p>Jumlah:</p>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-l border-r"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8">
              {/* Tombol Wishlist */}
              <button
                onClick={handleWishlistToggle}
                className="p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isWishlisted
                      ? "fill-red-500 stroke-red-500"
                      : "text-gray-800"
                  }`}
                />
              </button>

              {/* Tombol Tambah ke Keranjang */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>

        {/* BAGIAN DESKRIPSI & SPESIFIKASI */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4">
            Deskripsi & Spesifikasi
          </h3>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Pastikan specifications adalah objek sebelum di-map */}
            {typeof product.specifications === "object" &&
              Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b py-2">
                  <span className="w-1/3 text-gray-500">{key}</span>
                  <span className="w-2/3 font-medium text-gray-800">
                    {value}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* BAGIAN REKOMENDASI PRODUK */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4">
            Rekomendasi Produk Serupa
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((p) => (
              <Link key={p.id} to={`/produk/${p.id}`}>
                <Card
                  name={p.name}
                  price={`Rp${p.price.toLocaleString("id-ID")}`}
                  rating={p.rating || "N/A"}
                  imageUrl={
                    p.images && p.images.length > 0 ? p.images[0].image_url : ""
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
