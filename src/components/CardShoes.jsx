export default function Card({ imageUrl, name, description, price, rating }) {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col">
        {/* --- Bagian Gambar --- */}
        <div className="w-full h-48 bg-gray-200">
          <img
            src={
              imageUrl || "https://placehold.co/400x300/e2e8f0/333?text=Image"
            }
            alt={name || "Product Image"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- Bagian Konten --- */}

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <div className="flex justify-between items-start gap-3">
              <h2 className="font-bold text-lg mb-1">{name || "Shoes Name"}</h2>

              <div className="text-sm text-yellow-500 flex items-center gap-1 flex-shrink-0">
                <span>⭐</span>
                <span>{rating || "N/A"}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {description || "Description"}
            </p>
            <p className="font-bold text-xl mt-3">{price || "$0.00"}</p>
          </div>

          {/* --- Bagian Tombol --- */}

          <div className="text-center mt-4">
            <button className="border-black border-2 text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white transition-colors w-full font-semibold">
              Quick View
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
