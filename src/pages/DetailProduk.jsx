import Navbar from "../components/Navbar";
import Card from "../components/CardShoes";
import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    description: "Running Sneaker",
    price: "$120",
    rating: "4.9",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    description: "Comfort & Style",
    price: "$180",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 3,
    name: "Puma Classic",
    description: "Suede Finish",
    price: "$65",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
  {
    id: 4,
    name: "New Balance 574",
    description: "Vintage Look",
    price: "$85",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1579338559194-a162d19bf842",
  },
  {
    id: 5,
    name: "Nike Air Max",
    description: "Running Sneaker",
    price: "$120",
    rating: "4.9",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 6,
    name: "Adidas Ultraboost",
    description: "Comfort & Style",
    price: "$180",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 7,
    name: "Puma Classic",
    description: "Suede Finish",
    price: "$65",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
  {
    id: 8,
    name: "New Balance 574",
    description: "Vintage Look",
    price: "$85",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1579338559194-a162d19bf842",
  },
];

export default function DetailProduk() {
  // 2. Gunakan useParams untuk mendapatkan parameter dari URL
  const { productId } = useParams();

  // 3. Cari produk yang cocok berdasarkan ID dari URL
  const product = products.find((p) => p.id === productId);

  // 4. Jika produk tidak ditemukan, tampilkan pesan
  if (!product) {
    return <div>Produk tidak ditemukan!</div>;
  }

  return (
    <>
      <div>
        <img src={product.imageUrl} alt={product.name} />
        <h1 className="text-4xl font-bold mt-4">{product.name}</h1>
        <p className="text-2xl text-gray-800 my-2">{product.price}</p>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-yellow-500 mt-2">Rating: {product.rating}</p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Tambah ke Keranjang
        </button>
      </div>
    </>
  );
}
