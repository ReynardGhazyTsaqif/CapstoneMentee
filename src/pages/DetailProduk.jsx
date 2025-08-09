import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import Card from "../components/CardShoes";

// --- PERUBAHAN 1: Gunakan data spesifik untuk sepatu ---
const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Nike Air Force 1 '07",
    price: "Rp1.729.000",
    rating: 4.9,
    reviewCount: "8,5RB",
    sold: "12RB",
    description:
      "Kenyamanan legendaris dan gaya ikonik. Nike Air Force 1 '07 memiliki semua yang Anda kenal baik: lapisan kulit yang tegas, warna serba putih yang bersih, dan kilau yang sempurna untuk membuat Anda bersinar.",
    imageGallery: [
      "https://i.imgur.com/8a2t6h9.png", // Ganti dengan URL gambar sepatu
      "https://i.imgur.com/R3b1CAb.png",
      "https://i.imgur.com/T0a36G2.png",
    ],
    specifications: {
      Warna: "Putih/Putih",
      Tipe: "Sneakers Kasual",
      "Material Atas": "Kulit",
      "Material Sol": "Karet",
      "Kode SKU": "CW2288-111",
    },
    sizes: [
      { size: "40", stock: 12 },
      { size: "41", stock: 8 },
      { size: "42", stock: 0 },
      { size: "43", stock: 5 },
      { size: "44", stock: 11 },
    ],
  },
  // Produk rekomendasi
  {
    id: 2,
    name: "Adidas Samba OG",
    price: "Rp2.100.000",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 3,
    name: "New Balance 550",
    price: "Rp2.599.000",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
];

export default function DetailProduk() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  // State untuk gambar aktif, kuantitas, dan ukuran yang dipilih
  const [activeImage, setActiveImage] = useState(product?.imageGallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return <div>Produk tidak ditemukan!</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Silakan pilih ukuran terlebih dahulu!");
      return;
    }
    // Logika tambah ke keranjang...
    console.log(
      `Menambahkan ${quantity} buah ${product.name} ukuran ${selectedSize} ke keranjang.`
    );
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
              {product.price}
            </p>

            {/* --- PERUBAHAN 2: PEMILIH UKURAN --- */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Pilih Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`px-4 py-2 border rounded-md text-sm transition-colors
                                ${
                                  selectedSize === s.size
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                                }
                                ${
                                  s.stock === 0
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                                    : "hover:bg-gray-600"
                                }
                            `}
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

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>

        {/* BAGIAN DESKRIPSI & SPESIFIKASI */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-4">
            Deskripsi & Spesifikasi
          </h3>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b py-2">
                <span className="w-1/3 text-gray-500">{key}</span>
                <span className="w-2/3 font-medium text-gray-800">{value}</span>
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
            {products.slice(1, 5).map((p) => (
              <Link key={p.id} to={`/produk/${p.id}`}>
                <Card
                  name={p.name}
                  price={p.price}
                  rating={p.rating}
                  imageUrl={p.imageUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
