import AdminLayout from "../../Component/admin/AdminLayout";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  // Normalizer agar nama field konsisten
  const normalizeProduct = (raw) => {
    const imagesArr = Array.isArray(raw?.images)
      ? raw.images
      : Array.isArray(raw?.imageGallery)
      ? raw.imageGallery
      : raw?.image
      ? [raw.image]
      : [];

    const fixedImages = imagesArr
      .map((img) => {
        if (!img) return null;

        // kalau sudah absolute http(s)
        if (img.startsWith("http")) {
          try {
            const url = new URL(img);
            // selalu pakai host dari .env
            return `${import.meta.env.VITE_API_BASE_URL}${url.pathname.replace(
              /\\/g,
              "/"
            )}`;
          } catch {
            return img;
          }
        }

        // kalau relative path
        return `${import.meta.env.VITE_API_BASE_URL}/${img
          .replace(/^\/+/, "")
          .replace(/\\/g, "/")}`;
      })
      .filter(Boolean);

    const sizesArr = Array.isArray(raw?.sizes)
      ? raw.sizes
      : Array.isArray(raw?.variants)
      ? raw.variants
      : [];

    let specs = {};
    try {
      if (raw.specifications && typeof raw.specifications === "string") {
        specs = JSON.parse(raw.specifications);
      } else if (typeof raw.specifications === "object") {
        specs = raw.specifications;
      }
    } catch (e) {
      console.warn("❌ Gagal parse specifications:", e);
    }

    return {
      id: raw.id ?? raw._id ?? raw.productId,
      brand: raw.brand ?? "",
      name: raw.name ?? raw.nama ?? "",
      price: Number(raw.price ?? raw.harga ?? 0),
      description: raw.description ?? raw.deskripsi ?? "",
      color: raw.color ?? raw.warna ?? specs["Warna"] ?? "",
      materialAtas:
        raw.materialAtas ?? raw.material_atas ?? specs["Material Atas"] ?? "",
      materialSol:
        raw.materialSol ?? raw.material_sol ?? specs["Material Sol"] ?? "",
      sku: raw.sku ?? raw.kodeSku ?? raw.kode_sku ?? specs["Kode SKU"] ?? "",
      tipe: raw.type?.name ?? raw.tipe ?? raw.kategori ?? "",
      status: raw.status ?? "active",
      images: fixedImages,
      sizes: sizesArr.map((v, i) => ({
        size: v.size ?? v.ukuran ?? v.label ?? `Var-${i + 1}`,
        stock: Number(v.stock ?? v.stok ?? 0),
        variantId: v.id ?? v.variantId ?? `${raw.id}-${i}`,
      })),
    };
  };

  // Fetch products dengan pagination
  const fetchProducts = async (page = 1, search = "") => {
    setLoading(true);
    try {
      console.log(`🔄 Fetching products - Page: ${page}, Search: ${search}`);

      // Kirim parameter pagination dan search ke backend
      const params = {
        page: page,
        limit: itemsPerPage,
      };

      if (search) {
        params.search = search;
      }

      const res = await api.get("/products/all", { params });
      console.log("Raw API Response:", res.data);

      // Backend sudah mengirim format yang benar
      const {
        products: productList = [],
        totalPages,
        totalItems,
        currentPage,
      } = res.data;

      // Ambil detail untuk setiap product secara parallel (lebih cepat)
      const detailedProducts = await Promise.all(
        productList.map(async (p) => {
          try {
            const base = normalizeProduct(p);
            // Ambil detail untuk sizes/variants
            const detRes = await api.get(`/products/${base.id}`);
            const detailed = normalizeProduct(detRes.data);

            // Merge sizes biar unik
            const sizesMap = new Map();
            (detailed.sizes || []).forEach((s) => {
              const key = `${s.size}`;
              if (!sizesMap.has(key)) sizesMap.set(key, s);
            });

            return {
              ...base,
              ...detailed,
              sizes: Array.from(sizesMap.values()),
            };
          } catch (e) {
            console.warn(`ℹ️ Detail not available for product ${p.id}`, e);
            return normalizeProduct(p);
          }
        })
      );

      setProducts(detailedProducts);
      setTotalPages(totalPages || 1);
      setTotalItems(totalItems || 0);
      setCurrentPage(currentPage || page);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setProducts([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage]);

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Reset ke halaman 1 saat search
    setCurrentPage(1);

    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchProducts(1, value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const statusBadge = (status) => {
    const st = (status || "").toString().toLowerCase();
    if (st === "inactive" || st === "draft") return "bg-gray-100 text-gray-600";
    if (st === "archived") return "bg-zinc-100 text-zinc-700";
    // default active
    return "bg-green-100 text-green-600";
  };

  const totalStock = (p) =>
    Array.isArray(p.sizes)
      ? p.sizes.reduce((a, s) => a + (s.stock || 0), 0)
      : 0;

  // Pagination handlers
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (num) => {
    setCurrentPage(num);
  };

  const getPageRange = () => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Produk Management
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full my-8 px-5 ">
        {/* Search */}
        <div className="relative flex-grow text-black rounded-xl ml-5 mr-16">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari Produk"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full text-xl pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
          />
        </div>

        {/* Button */}
        <Link
          to="/admin/addproduct"
          className="bg-black text-white px-6 py-4 text-xl rounded-3xl mx-5"
        >
          Tambah Produk
        </Link>
      </div>

      {/* Info pagination */}
      <div className="mx-5 mb-4 text-gray-600">
        Menampilkan {products.length} dari {totalItems} produk (Halaman{" "}
        {currentPage} dari {totalPages})
      </div>

      {loading ? (
        <p className="p-8">⏳ Loading products...</p>
      ) : (
        <div className="mx-5 shadow-md overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 min-w-[1200px]">
            <thead className="bg-gray-200 uppercase">
              <tr>
                <th className="border-b px-24 py-3">Foto</th>
                <th className="border-b px-8 py-3">Brand</th>
                <th className="border-b px-8 py-3">Nama</th>
                <th className="border-b px-8 py-3">Harga</th>
                <th className="border-b px-8 py-3">Warna</th>
                <th className="border-b px-8 py-3">SKU</th>
                <th className="border-b px-8 py-3">Tipe</th>
                <th className="border-b px-8 py-3">Material (Atas/Sol)</th>
                <th className="border-b px-8 py-3">Deskripsi</th>
                <th className="border-b px-8 py-3">Stok</th>
                <th className="border-b px-8 py-3">Status</th>
                <th className="border-b px-8 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => {
                  return (
                    <tr key={p.id}>
                      <td className="border-b px-8 py-4">
                        {p.images && p.images.length > 0 ? (
                          <div className="flex gap-2">
                            {p.images.map((img, index) => (
                              <img
                                key={index}
                                src={img}
                                alt={`${p.name} ${index + 1}`}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400">Tidak ada gambar</p>
                        )}
                      </td>

                      <td className="border-b px-8 py-4">{p.brand}</td>
                      <td className="border-b px-8 py-4 font-medium">
                        {p.name}
                      </td>
                      <td className="border-b px-8 py-4">
                        Rp{Number(p.price || 0).toLocaleString("id-ID")}
                      </td>
                      <td className="border-b px-8 py-4">{p.color}</td>
                      <td className="border-b px-8 py-4">{p.sku}</td>
                      <td className="border-b px-8 py-4">{p.tipe}</td>
                      <td className="border-b px-8 py-4">
                        <div className="text-sm">
                          <div>
                            <span className="text-gray-500">Atas:</span>{" "}
                            {p.materialAtas || "-"}
                          </div>
                          <div>
                            <span className="text-gray-500">Sol:</span>{" "}
                            {p.materialSol || "-"}
                          </div>
                        </div>
                      </td>
                      <td
                        className="border-b px-8 py-4 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap"
                        title={p.description}
                      >
                        {p.description || "-"}
                      </td>
                      <td className="border-b px-8 py-4">
                        {totalStock(p)}
                        {/* Nested sizes table (opsional): */}
                        {Array.isArray(p.sizes) && p.sizes.length > 0 && (
                          <div className="mt-2 border border-gray-200 rounded">
                            <table className="w-full text-xs">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="border px-2 py-1 text-left">
                                    Size
                                  </th>
                                  <th className="border px-2 py-1 text-left">
                                    Stock
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.sizes.map((s) => (
                                  <tr key={s.variantId}>
                                    <td className="border px-2 py-1">
                                      {s.size}
                                    </td>
                                    <td className="border px-2 py-1">
                                      <span
                                        className={`px-2 py-0.5 rounded text-[11px] ${
                                          s.stock > 10
                                            ? "bg-green-100 text-green-700"
                                            : s.stock > 0
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                      >
                                        {s.stock}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </td>
                      <td className="border-b px-8 py-4">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold ${statusBadge(
                            p.status
                          )}`}
                        >
                          {String(p.status || "active").toUpperCase()}
                        </span>
                      </td>
                      <td className="border-b px-8 py-4 underline">
                        <Link to={`/admin/editproduct/${p.id}`}>Edit</Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-6">
                    {searchTerm
                      ? `Tidak ada produk dengan kata kunci "${searchTerm}"`
                      : "Tidak ada produk"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-8 mb-16 gap-2 sm:space-x-4">
          {/* Tombol Previous */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`rounded-md border text-gray-500 flex items-center justify-center 
        w-16 h-16 sm:w-12 sm:h-12 ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-200"
        }`}
          >
            <ChevronLeft />
          </button>

          {/* Nomor Halaman */}
          {getPageRange().map((num) => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`flex items-center justify-center rounded-md border
          w-16 h-16 sm:w-12 sm:h-12 ${
            num === currentPage
              ? "bg-black text-white"
              : "text-gray-500 hover:bg-gray-300"
          }`}
            >
              {num}
            </button>
          ))}

          {/* Tombol Next */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center rounded-md border
          w-16 h-16 sm:w-12 sm:h-12 ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-gray-200"
          }`}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </AdminLayout>
  );
}

export default Products;
