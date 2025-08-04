// Card.js
// Card.js

// Membuat komponen menerima props agar datanya bisa dinamis
export default function Card({ imageUrl, name, description, price, rating }) {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
        {/* Konten utama dibuat flex agar gambar dan teks bisa sejajar */}
        <div className="flex items-center gap-4">
          {/* Gambar dengan ukuran yang konsisten */}
          <img
            src={imageUrl || "https://via.placeholder.com/150"}
            alt={name || "Product Image"}
            className="w-24 h-24 object-cover rounded-md flex-shrink-0" // DIUBAH
          />

          {/* Wrapper untuk semua teks */}
          <div className="flex-grow">
            <div className="flex justify-between gap-2">
              <div>
                <h2 className="font-bold text-lg">{name || "Shoes Name"}</h2>
                <p className="text-sm text-gray-600">
                  {description || "Description"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{price || "Price"}</p>
                <p className="text-sm text-yellow-500">
                  {rating ? `⭐ ${rating}` : "⭐"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="text-center mt-6">
          <button className="border-black border-2 text-black px-6 py-1.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Quick View
          </button>
        </div>
      </div>
    </>
  );
}
