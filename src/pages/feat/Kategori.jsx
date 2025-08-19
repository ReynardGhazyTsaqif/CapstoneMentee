import React, { useState, useEffect } from "react";
import heroimage from "../../assets/img/heroimage.jpg";
import FilterSidebar from "../../components/FilterSidebar";
import SortingBar from "../../components/SortingBar";
import Card from "../../components/CardShoes";
import DynamicBreadcrumb from "../../components/DynamicBreadcrumb";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

export default function Kategori() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk metadata pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const [availableCategories, setAvailableCategories] = useState([]);

  const [filters, setFilters] = useState({
    categories: [],
    rating: null,
    price: { min: 0, max: 10000000 },
    sortBy: "createdAt",
    order: "DESC",
  });

  const [searchParams] = useSearchParams();
  const searchTermFromURL = searchParams.get("search");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/types");

        setAvailableCategories(response.data);
      } catch (err) {
        console.error("Gagal mengambil data kategori:", err);

        setAvailableCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (searchTermFromURL) {
        params.append("search", searchTermFromURL);
      }

      if (filters.categories.length > 0) {
        filters.categories.forEach((cat) => params.append("tipe", cat));
      }
      if (filters.rating) {
        params.append("rating", filters.rating);
      }
      params.append("minPrice", filters.price.min);
      params.append("maxPrice", filters.price.max);

      params.append("sortBy", filters.sortBy);
      params.append("order", filters.order);

      try {
        const response = await api.get(`/products?${params.toString()}`);

        setProducts(response.data.products);
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems,
        });
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
        setError("Gagal memuat produk. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchTermFromURL]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy, order) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: sortBy,
      order: order,
    }));
  };

  const renderProductContent = () => {
    if (loading) {
      return <div className="text-center col-span-full py-10">Loading...</div>;
    }
    if (error) {
      return (
        <div className="text-center col-span-full py-10 text-red-500">
          {error}
        </div>
      );
    }
    if (products.length === 0) {
      return (
        <div className="text-center col-span-full py-10">
          Tidak ada produk yang cocok dengan filter Anda.
        </div>
      );
    }

    return products.map((product) => {
      const imageUrl =
        product.image ||
        "https://placehold.co/400x300/e2e8f0/333?text=No+Image";

      return (
        <Link key={product.id} to={`/kategori/${product.id}`}>
          <Card
            imageUrl={imageUrl}
            name={product.name}
            description={product.description}
            rating={product.rating || "N/A"}
            price={`Rp${product.price.toLocaleString("id-ID")}`}
          />
        </Link>
      );
    });
  };
  return (
    <>
      <div className="bg-gray-100 w-full min-h-screen flex flex-col">
        {/* herosection */}
        <div
          className="relative w-full h-[50vh] bg-cover bg-center mx-auto"
          style={{ backgroundImage: `url(${heroimage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="flex items-end justify-start h-full p-10">
            <h1 className="text-white text-4xl font-bold">Temukan Gaya Anda</h1>
          </div>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row px-6">
          {/* Kolom Kiri - Wrapper untuk Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5 py-6">
            <div className="sticky top-6">
              <FilterSidebar
                categories={availableCategories}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Kolom Kanan - Hasil Pencarian */}
          <div className="w-full md:w-3/4 lg:w-4/5 py-4 md:px-10 md:py-6">
            <div className="hidden md:block my-2">
              <DynamicBreadcrumb />
            </div>
            <div className="mb-6">
              <SortingBar
                onSortChange={handleSortChange}
                currentSort={{ sortBy: filters.sortBy, order: filters.order }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderProductContent()}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-20">
          <button className="border-black border-2 font-medium w-3/5 md:w-1/4 text-black px-6 py-2.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Lihat Hasil Lainnya
          </button>
        </div>
      </div>
    </>
  );
}
