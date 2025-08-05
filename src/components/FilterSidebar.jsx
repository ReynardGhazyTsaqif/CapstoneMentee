import React from "react";
import { Range, getTrackBackground } from "react-range";

// Helper component untuk Ikon
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 mr-3 text-gray-800"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-5.414 5.414a1 1 0 00-.293.707V19l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-black" : "text-gray-300"}`}
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="1.5"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

// Helper untuk format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const FilterSidebar = ({ categories = [], filters, onFilterChange }) => {
  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleRatingChange = (rating) => {
    const newRating = filters.rating === rating ? 0 : rating;
    onFilterChange({ ...filters, rating: newRating });
  };

  const handlePriceChange = (values) => {
    onFilterChange({ ...filters, price: { min: values[0], max: values[1] } });
  };

  const PRICE_MIN = 0;
  const PRICE_MAX = 10000000;

  return (
    <>
      <div className="bg-gray-100 w-full max-w-xs p-6 rounded-lg hidden md:block   font-sans">
        {/* Header */}
        <div className="flex items-center mb-6 pb-4 border-b border-gray-200 ">
          <FilterIcon />
          <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
            Filter
          </h1>
        </div>

        {/* Kategori Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Kategori</h2>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-400 text-black focus:ring-black focus:ring-offset-0"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="ml-3 text-gray-700">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200" />

        {/* Penilaian Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Penilaian
          </h2>
          <ul className="space-y-3">
            {[5, 4, 3, 2, 1].map((starValue) => (
              <li
                key={starValue}
                onClick={() => handleRatingChange(starValue)}
                className={`flex items-center cursor-pointer p-1 rounded ${
                  filters.rating === starValue ? "bg-gray-200" : ""
                }`}
              >
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < starValue} />
                ))}
                {starValue < 5 && (
                  <span className="ml-2 text-sm text-gray-500">ke atas</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200" />

        {/* Range Harga Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Range Harga
          </h2>
          <div className="px-2 flex items-center h-8">
            <Range
              values={[filters.price.min, filters.price.max]}
              step={50000}
              min={PRICE_MIN}
              max={PRICE_MAX}
              onChange={handlePriceChange}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{ ...props.style }}
                  className="h-full w-full flex"
                >
                  <div
                    ref={props.ref}
                    className="h-1 w-full rounded-full self-center"
                    style={{
                      background: getTrackBackground({
                        values: [filters.price.min, filters.price.max],
                        colors: ["#E5E7EB", "#1F2937", "#E5E7EB"],
                        min: PRICE_MIN,
                        max: PRICE_MAX,
                      }),
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{ ...props.style }}
                  className="h-5 w-5 bg-white border-2 border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                ></div>
              )}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-4">
            <span>
              Dari{" "}
              <span className="font-semibold text-gray-800">
                {formatRupiah(filters.price.min)}
              </span>
            </span>
            <span>
              sampai{" "}
              <span className="font-semibold text-gray-800">
                {formatRupiah(filters.price.max)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden p-4 flex items-center justify-center  bg-gray-100 rounded-lg">
        <div className=" items-center  mb-6 pb-4 border-b border-gray-200 ">
          <FilterIcon />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
