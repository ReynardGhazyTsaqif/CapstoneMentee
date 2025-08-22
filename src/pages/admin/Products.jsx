import AdminLayout from "../../Component/admin/AdminLayout";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Normalizer agar nama field konsisten (brand/name/price/description/color/materialAtas/materialSol/sku/tipe/status/images/sizes)
  const normalizeProduct = (raw) => {
    const imagesArr =
      Array.isArray(raw?.images)
        ? raw.images
        : raw?.images
        ? [raw.images]
        : [];

    const sizesArr =
      Array.isArray(raw?.sizes) ? raw.sizes : Array.isArray(raw?.variants) ? raw.variants : [];

    return {
      id: raw.id ?? raw._id ?? raw.productId,
      brand: raw.brand ?? "",
      name: raw.name ?? raw.nama ?? "",
      price: Number(raw.price ?? raw.harga ?? 0),
      description: raw.description ?? raw.deskripsi ?? "",
      color: raw.color ?? raw.warna ?? "",
      materialAtas: raw.materialAtas ?? raw.material_atas ?? "",
      materialSol: raw.materialSol ?? raw.material_sol ?? "",
      sku: raw.sku ?? raw.kodeSku ?? raw.kode_sku ?? "",
      tipe: raw.tipe ?? raw.type ?? raw.kategori ?? "",
      status: raw.status ?? "active",
      images: imagesArr,
      // dukung bentuk variants seperti: [{size:40, stock:10}, {size:41, stock:15}]
      sizes: sizesArr.map((v, i) => ({
        size: v.size ?? v.ukuran ?? v.label ?? `Var-${i + 1}`,
        stock: Number(v.stock ?? v.stok ?? 0),
        variantId: v.id ?? v.variantId ?? `${raw.id}-${i}`,
      })),
    };
  };


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log("🔄 Fetching products...");
        const res = await api.get("/products");
        const list = Array.isArray(res.data?.products) ? res.data.products : Array.isArray(res.data) ? res.data : [];
        if (!Array.isArray(list)) {
          setProducts([]);
          return;
        }

        // Jika /products sudah lengkap, cukup normalize sekali:
        // const detailedProducts = list.map(normalizeProduct);

        // Jika butuh detail per ID (mis. untuk sizes), merge & normalize:
        const detailedProducts = await Promise.all(
          list.map(async (p) => {
            try {
              const base = normalizeProduct(p);
              // (opsional) ambil detail
              const detRes = await api.get(`/products/${base.id}`);
              const merged = { ...base, ...normalizeProduct(detRes.data) };

              // Gabungkan images & sizes (unik)
              const images = [...(base.images || []), ...(merged.images || [])].filter(Boolean);
              const sizesMap = new Map();
              [...(base.sizes || []), ...(merged.sizes || [])].forEach((s) => {
                const key = `${s.size}`;
                if (!sizesMap.has(key)) sizesMap.set(key, s);
              });

              return { ...merged, images, sizes: Array.from(sizesMap.values()) };
            } catch (e) {
              console.warn(`ℹ️ Detail not available for product ${p.id}`, e);
              return normalizeProduct(p);
            }
          })
        );

        setProducts(detailedProducts);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const statusBadge = (status) => {
    const st = (status || "").toString().toLowerCase();
    if (st === "inactive" || st === "draft")
      return "bg-gray-100 text-gray-600";
    if (st === "archived")
      return "bg-zinc-100 text-zinc-700";
    // default active
    return "bg-green-100 text-green-600";
  };

  const totalStock = (p) => (Array.isArray(p.sizes) ? p.sizes.reduce((a, s) => a + (s.stock || 0), 0) : 0);

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = products.slice(startIndex, startIndex + itemsPerPage);

  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));



  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Produk Management
      </h1>

      <div className="flex items-center w-full my-16 ">
        {/* Search */}
        <div className="relative flex-grow text-black rounded-xl ml-5 mr-16">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari Produk"
            className="w-full text-xl  pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
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

      {loading ? (
        <p className="p-8">⏳ Loading products...</p>
      ) : (
        <div className="mx-5 shadow-md overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 min-w-[1200px]">
            <thead className="bg-gray-200 uppercase">
              <tr>
                <th className="border-b px-4 py-3">Foto</th>
                <th className="border-b px-4 py-3">Brand</th>
                <th className="border-b px-4 py-3">Nama</th>
                <th className="border-b px-4 py-3">Harga</th>
                <th className="border-b px-4 py-3">Warna</th>
                <th className="border-b px-4 py-3">SKU</th>
                <th className="border-b px-4 py-3">Tipe</th>
                <th className="border-b px-4 py-3">Material (Atas/Sol)</th>
                <th className="border-b px-4 py-3">Deskripsi</th>
                <th className="border-b px-4 py-3">Stok</th>
                <th className="border-b px-4 py-3">Status</th>
                <th className="border-b px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((p) => {
                  const imgSrc = Array.isArray(p.images) ? p.images[0] : p.images;
                  return (
                    <tr key={p.id}>
                      <td className="border-b px-4 py-4">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded" />
                        )}
                      </td>
                      <td className="border-b px-4 py-4">{p.brand}</td>
                      <td className="border-b px-4 py-4 font-medium">{p.name}</td>
                      <td className="border-b px-4 py-4">
                        Rp{Number(p.price || 0).toLocaleString("id-ID")}
                      </td>
                      <td className="border-b px-4 py-4">{p.color}</td>
                      <td className="border-b px-4 py-4">{p.sku}</td>
                      <td className="border-b px-4 py-4">{p.tipe}</td>
                      <td className="border-b px-4 py-4">
                        <div className="text-sm">
                          <div><span className="text-gray-500">Atas:</span> {p.materialAtas || "-"}</div>
                          <div><span className="text-gray-500">Sol:</span> {p.materialSol || "-"}</div>
                        </div>
                      </td>
                      <td className="border-b px-4 py-4 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap" title={p.description}>
                        {p.description || "-"}
                      </td>
                      <td className="border-b px-4 py-4">
                        {totalStock(p)}
                        {/* Nested sizes table (opsional): */}
                        {Array.isArray(p.sizes) && p.sizes.length > 0 && (
                          <div className="mt-2 border border-gray-200 rounded">
                            <table className="w-full text-xs">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="border px-2 py-1 text-left">Size</th>
                                  <th className="border px-2 py-1 text-left">Stock</th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.sizes.map((s) => (
                                  <tr key={s.variantId}>
                                    <td className="border px-2 py-1">{s.size}</td>
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
                      <td className="border-b px-4 py-4">
                        <span className={`px-3 py-1 rounded-full font-semibold ${statusBadge(p.status)}`}>
                          {String(p.status || "active").toUpperCase()}
                        </span>
                      </td>
                      <td className="border-b px-4 py-4 underline">
                        <Link to={`/admin/editproduct/${p.id}`}>Edit</Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-6">
                    Tidak ada produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-16 space-x-4">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <ChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`px-4 py-2 border rounded ${
              num === currentPage ? "bg-black text-white" : ""
            }`}
          >
            {num}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          <ChevronRight />
        </button>
      </div>
    </AdminLayout>
  );
}

export default Products;
