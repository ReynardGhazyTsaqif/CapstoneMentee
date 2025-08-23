import AdminLayout from "../../Component/admin/AdminLayout";
import {
  ClipboardCheck,
  ChevronUp,
  Package,
  Users,
  ChartColumnIncreasing,
  MoveRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]); // hanya 5 produk (untuk ditampilkan di card)
  const [allProducts, setAllProducts] = useState([]); // semua produk (untuk hitung total)

  const [loading, setLoading] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await api.get("/dashboard/recent-users");
        console.log("📌 Response:", res.data); // debug
        console.log("📌 Response full:", res.data);
        console.log("📌 Apakah array?:", Array.isArray(res.data));

        // ✅ langsung array
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setUsers([]); // fallback biar aman
      } finally {
        setLoadingUsers(false); // selesai loading user
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");
        console.log("📦 API Response:", res.data);

        const productList = res.data.products || res.data;
        console.log("📦 Product list:", productList);

        if (!Array.isArray(productList)) {
          console.error("❌ Product list is not an array:", productList);
          setProducts([]);
          setAllProducts([]);
          return;
        }

        // Ambil detail tiap produk
        const detailedProducts = await Promise.all(
          productList.map(async (product) => {
            try {
              const detailRes = await api.get(`/products/${product.id}`);
              console.log(`✅ Product ${product.id} detail:`, detailRes.data);

              return {
                ...product,
                sizes: Array.isArray(detailRes.data.sizes)
                  ? detailRes.data.sizes
                  : [],
              };
            } catch (error) {
              console.error(`❌ Error fetching product ${product.id}:`, error);
              return { ...product, sizes: [] };
            }
          })
        );

        // Simpan semua produk (untuk total)
        setAllProducts(detailedProducts);

        // Hitung stok total per produk
        const productsWithStock = detailedProducts.map((p) => {
          const totalStock = Array.isArray(p.sizes)
            ? p.sizes.reduce((acc, s) => acc + (s.stock || 0), 0)
            : 0;
          return { ...p, totalStock };
        });

        // Urutkan stok terkecil
        const sortedProducts = productsWithStock.sort(
          (a, b) => a.totalStock - b.totalStock
        );

        // Ambil 5 teratas
        const top5Products = sortedProducts.slice(0, 5);

        console.log("🎯 Top 5 products with lowest stock:", top5Products);
        setProducts(top5Products);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setProducts([]);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">Dashboard</h1>
      <div className="mt-10 flex flex-row gap-12 ml-5 mr-20">
        {/* Stats Cards - sama seperti sebelumnya */}
        <div className="w-3/12 bg-white shadow-md p-5 rounded-md font-semibold">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-400">Total Order</p>
              <p className="text-4xl">120</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-500 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-400 ml-1">2,45%</p>
          </div>
        </div>

        <div className="w-3/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Produk</p>
              <p className="text-4xl font-bold">{allProducts.length}</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-600 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-500 ml-1">2,45%</p>
          </div>
        </div>

        <div className="w-3/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-4xl font-bold">{users.length}</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-600 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-500 ml-1">2,45%</p>
          </div>
        </div>

        <div className="w-3/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <ChartColumnIncreasing className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-4xl font-bold">120</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-600 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-500 ml-1">2,45%</p>
          </div>
        </div>
      </div>

      <p className="ml-5 my-5 font-semibold text-2xl">Aktivitas Terkini</p>

      <div className="flex gap-20 items-start">
        {/* User Registration Table */}
        <div className="bg-white shadow-md p-4 ml-5 rounded-md">
          <p className="text-2xl font-medium mb-5">User Registration</p>
          {loadingUsers ? (
            <div className="text-center py-5">Loading users...</div>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200 uppercase">
                  <tr>
                    <th className="border-b border-gray-200 text-left px-8 py-2">
                      Nama
                    </th>
                    <th className="border-b border-gray-200 text-left px-8 py-2">
                      Email
                    </th>
                    <th className="border-b border-gray-200 text-left px-8 py-2">
                      Tanggal
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="border-b border-gray-200 px-4 py-5">
                          {user.fullName}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-5">
                          {user.email}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-5">
                          {new Date(user.createdAt).toLocaleDateString("id-ID")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-5">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="gap-2 flex justify-end items-center mt-4 cursor-pointer text-[#090C47]">
                <Link to="/admin/users">Manage Users</Link>
                <MoveRight />
              </div>
            </>
          )}
        </div>

        {/* Products Stock Table - DIPERBAIKI */}
        <div className="bg-white shadow-md p-4 ml-5 rounded-md">
          <p className="text-2xl font-medium mb-5">Stok Produk Tersisa</p>

          {loading ? (
            <div className="text-center py-5">Loading products...</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200 uppercase">
                  <tr>
                    <th className="border-b border-gray-200 text-left px-4 py-2">
                      Produk
                    </th>
                    <th className="border-b border-gray-200 text-left px-4 py-2">
                      Stok
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td className="border border-gray-300 px-4 py-2 align-top">
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {product.sizes && product.sizes.length > 0 ? (
                            <table className="w-full border border-gray-200 text-sm">
                              <thead className="bg-gray-100">
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
                                {product.sizes.map((sizeData) => (
                                  <tr
                                    key={
                                      sizeData.variantId ||
                                      `${product.id}-${sizeData.size}`
                                    }
                                  >
                                    <td className="border px-2 py-1">
                                      {sizeData.size}
                                    </td>
                                    <td className="border px-2 py-1">
                                      <span
                                        className={`px-2 py-1 rounded text-xs ${
                                          sizeData.stock > 10
                                            ? "bg-green-100 text-green-800"
                                            : sizeData.stock > 0
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                      >
                                        {sizeData.stock}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <span className="text-gray-500 text-sm">
                              Tidak ada data size
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-5">
                        {loading ? "Loading..." : "Tidak ada data produk"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="gap-2 flex justify-end items-center mt-4 cursor-pointer text-[#090C47]">
            <Link to="/admin/products">Tambah produk</Link>
            <MoveRight />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md p-4 ml-5 mr-16 rounded-md mt-10 mb-16">
        <p className="text-2xl font-medium mb-5">Order</p>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Order ID
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Nama
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Tanggal
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Total
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-200 px-8 py-5">#308453</td>
              <td className="border-b border-gray-200 px-8 py-5">Akmal</td>
              <td className="border-b border-gray-200 px-8 py-5">11/04/2025</td>
              <td className="border-b border-gray-200 px-8 py-5">
                Rp4.500.000
              </td>
              <td className="border-b border-gray-200 px-8 py-5">
                <span className="px-3 py-1 rounded-full font-semibold bg-green-100 text-green-500">
                  Delivered
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="gap-2 flex justify-end items-center mt-4 cursor-pointer text-[#090C47]">
          <Link to="/admin/orders">Lihat Semua Order</Link>
          <MoveRight />
        </div>
      </div>
    </AdminLayout>
  );
}
