import Navbar from "../components/Navbar";
import heroimage from "../assets/img/heroimage.jpg";
import FilterSidebar from "../components/FilterSideBar";
import SortingBar from "../components/SortingBar";
import Card from "../components/CardShoes";
import React, { useState } from "react";

export default function Kategori() {
  //test card
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
  //End test card

  // Daftar kategori bisa didapat dari API atau didefinisikan secara statis
  const availableCategories = ["Sneakers", "Sepatu Formal", "Boots", "Sandals"];

  // State untuk menampung semua filter yang aktif
  const [filters, setFilters] = useState({
    categories: ["Sneakers"], // Contoh nilai awal
    rating: 4,
    price: {
      min: 200000,
      max: 5000000,
    },
  });

  // Fungsi ini akan menerima state baru dari komponen anak
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Di sini Anda bisa memanggil API untuk fetch data baru berdasarkan filter
    console.log("Filters updated:", newFilters);
  };

  return (
    <>
      <div className="bg-black w-full max-h-full ">
        <div className="bg-gray-100 w-full min-h-screen flex flex-col">
          <Navbar />
          {/*herosection */}
          <div
            className="relative w-full h-[40vh] bg-cover bg-center mx-auto"
            style={{ backgroundImage: `url(${heroimage})` }}
          >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="flex items-end justify-start h-full p-10">
              <h1 className="text-white text-4xl font-bold">
                Lorem Ipsum Dolor Sit Amet
              </h1>
            </div>
          </div>
          {/*end-herosection */}

          {/*content-section*/}
          <div className="flex flex-col md:flex-row  px-6">
            {/* Deskripsi Kategori, filter section */}

            <div className="flex justify-start items-center md:items-start">
              <FilterSidebar
                categories={availableCategories}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/*end deskripsi kategori, filter section*/}

            {/*hasil Pencarian*/}
            <div className="flex flex-col w-full py-4 md:px-10 md:py-6">
              {/*header pencarian*/}
              <div className="flex items-center gap-4 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>

                <h2 className="md:text-2xl text-lg font-semibold text-black">
                  Hasil Pencarian Untuk{" "}
                  <span className="text-gray-700">Sepatu Nike</span>
                </h2>
              </div>

              <h2 className="text-lg text-gray-600 mb-4">
                <span className="text-gray-600 mx-2">x</span>Hasil Pencarian
              </h2>

              {/*end header pencarian*/}

              {/* Sorting Bar */}
              <div className=" mb-6">
                <SortingBar />
              </div>
              {/*end Sorting Bar*/}

              {/* Card Section */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    imageUrl={product.imageUrl}
                    name={product.name}
                    description={product.description}
                    rating={product.rating}
                    price={product.price}
                  />
                ))}
              </div>

              {/* End card section */}
            </div>
            {/*end hasil Pencarian*/}
          </div>

          <div className="flex justify-center items-center py-20">
            <button className="border-black border-2 font-medium w-3/5 md:w-1/4 text-black px-6 py-2.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
              Lihat Hasil Lainnya
            </button>
          </div>
          {/* End of content-section */}
          {/* Footer Section */}
          <div className="bg-gray-800 text-white py-6 mt-10 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Company Name. All rights
              reserved.
            </p>
          </div>
          {/* End of Footer Section */}
        </div>
      </div>
    </>
  );
}
