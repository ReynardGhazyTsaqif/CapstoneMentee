import heroimage from "../assets/img/heroimage.jpg";
import { useState } from "react";

// Helper untuk format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// Data Awal (nantinya ini akan datang dari API)
const initialCartItems = [
  {
    id: 1,
    name: "Longines Master AC 6570 Silver Stainless Steel Strap",
    imageUrl: "https://i.imgur.com/8a2t6h9.png",
    price: 4545000,
    quantity: 1,
  },
  // Tambahkan item lain di sini jika perlu untuk testing
];

export default function ShopCart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Fungsi untuk mengubah kuantitas
  const handleQuantityChange = (itemId, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Fungsi untuk menghapus item
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Kalkulasi Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 25000; // Contoh ongkir
  const grandTotal = subtotal + shippingCost;

  return (
    <>
      {/*hero section */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center mx-auto"
        style={{ backgroundImage: `url(${heroimage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="flex items-end justify-start h-full p-10">
          <h1 className="text-white text-4xl font-bold">Temukan Gaya Anda</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col bg-gray-50 mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header Tabel */}
          <div className="hidden md:grid grid-cols-6 gap-4 border-b pb-4 mb-4 font-semibold text-gray-600">
            <div className="col-span-3">Produk</div>
            <div className="text-center">Harga Satuan</div>
            <div className="text-center">Kuantitas</div>
            <div className="text-right">Total Harga</div>
          </div>

          {/* Daftar Item Keranjang */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b pb-4"
              >
                {/* Kolom Produk */}
                <div className="col-span-1 md:col-span-3 flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                  </div>
                </div>

                {/* Kolom Harga Satuan */}
                <div className="text-center">
                  <span className="md:hidden font-semibold mr-2">Harga:</span>
                  {formatRupiah(item.price)}
                </div>

                {/* Kolom Kuantitas */}
                <div className="flex justify-center items-center">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-3 py-1 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border-l border-r"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-3 py-1 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Kolom Total Harga & Hapus */}
                <div className="flex justify-between items-center md:justify-end">
                  <div className="md:hidden font-semibold">Total:</div>
                  <div className="text-right font-semibold">
                    {formatRupiah(item.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.033C6.913 3.75 6 4.704 6 5.884v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 ml-auto mt-6">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Estimasi Ongkir</span>
              <span>{formatRupiah(shippingCost)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Grand Total</span>
              <span>{formatRupiah(grandTotal)}</span>
            </div>
            <button className="w-full bg-black text-white py-3 mt-4 rounded-lg font-semibold hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
