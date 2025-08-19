import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  imageUrl,
  name,
  description,
  price,
  rating,
  isWishlisted,
  onWishlistToggle,
  linkTo,
}) {
  const handleWishlistClick = (e) => {
    console.log("Tombol HATI di dalam Card diklik!");

    e.preventDefault();

    e.stopPropagation();

    if (onWishlistToggle) {
      onWishlistToggle();
    }
  };

  const cardContent = (
    <div className="bg-white shadow-md rounded-lg overflow-hidden h-full flex flex-col group relative z-10">
      {/* --- Bagian Gambar --- */}
      <div className="w-full h-48 bg-gray-200 relative">
        <img
          src={imageUrl || "https://placehold.co/400x300/e2e8f0/333?text=Image"}
          alt={name || "Product Image"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Tombol Ikon Hati */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
          aria-label="Toggle Wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className={`w-5 h-5 transition-all duration-200 ${
              isWishlisted
                ? "fill-red-500 stroke-red-500"
                : "fill-none stroke-current"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.229 9 12 9 12s9-4.771 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* --- Bagian Konten --- */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between items-start gap-3">
            <h2 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
              {name || "Shoes Name"}
            </h2>
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
  );

  if (linkTo) {
    return <Link to={linkTo}>{cardContent}</Link>;
  }

  return cardContent;
}
