import AdminLayout from "../../Component/admin/AdminLayout";
import api from "../../api/axios";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await api.get("/orders"); // endpoint getAllOrders
        const data = Array.isArray(res.data) ? res.data : [];
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  
  // Filter + Search
  const filteredOrders = orders
    .filter((order) => (filter === "All" ? true : order.status === filter))
    .filter((order) => {
      const query = searchQuery.toLowerCase();
      return (
        order.User?.fullName?.toLowerCase().includes(query) ||
        order.id.toString().includes(query) ||
        new Date(order.createdAt).toLocaleDateString("id-ID").includes(query)
      );
    });

  // Pagination state
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Ambil data sesuai halaman setelah difilter
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Pagination controls
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Hitung halaman yang terlihat
  const maxVisible = 5;
  const startPage = Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
  const endPage = Math.min(startPage + maxVisible - 1, totalPages);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5  text-4xl">
        Order Management
      </h1>

      {/* Search Bar */}
      <div className="flex items-center w-9/12 mt-16">
        <div className="relative flex-grow text-black rounded-xl ml-5">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari Order (nama/id/tanggal)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset ke page 1 kalau search berubah
            }}
            className="w-full text-xl pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white shadow-lg my-8 ml-5 mr-24 rounded-lg">
        <div className="flex pl-8 py-4 items-center">
          <p className="font-semibold text-xl mr-16">Filter</p>
          <div className="flex gap-6 font-semibold">
            {["All", "Pending", "Paid", "Packed", "Shipped", "Delivered"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    setCurrentPage(1); // Reset ke halaman 1 kalau filter berubah
                  }}
                  className={`rounded-3xl py-5 px-8 ${
                    filter === status
                      ? "bg-black text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md p-4 ml-5 mr-16 rounded-md mt-10 mb-16">
        <p className="text-2xl font-medium mb-5">Semua Orders</p>
        {loadingOrders ? (
          <div className="text-center py-5">Loading orders...</div>
        ) : (
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-200 uppercase">
                <tr>
                  <th className="border-b border-gray-200 text-left px-4 py-2">
                    Order ID
                  </th>
                  <th className="border-b border-gray-200 text-left px-4 py-2">
                    Nama Pemesan
                  </th>
                  <th className="border-b border-gray-200 text-left px-4 py-2">
                    Tanggal
                  </th>
                  <th className="border-b border-gray-200 text-left px-4 py-2">
                    Total Harga
                  </th>
                  <th className="border-b border-gray-200 text-left px-4 py-2">
                    Status
                  </th>
                  <th className="border-b border-gray-200 text-left px-4 py-2">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((order) => (
                      <tr key={order.id}>
                        <td className="border-b border-gray-200 px-4 py-2">
                          #{order.id}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2">
                          {order.User?.fullName || "N/A"}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2">
                          {new Date(order.createdAt).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2">
                          Rp{Number(order.total_price).toLocaleString("id-ID")}
                        </td>
                        <td className="border-b border-gray-200 px-4 py-2">
                          <span
                            className={`px-3 py-1 rounded-full font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-500"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-500"
                                : order.status === "Paid"
                                ? "bg-purple-100 text-purple-500"
                                : order.status === "Packed"
                                ? "bg-yellow-100 text-yellow-500"
                                : order.status === "Pending"
                                ? "bg-gray-100 text-gray-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-500"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="border-b border-gray-200 px-8 py-6 underline">
                          <Link to={`/admin/detailorder/${order.id}`}>
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      Tidak ada data order
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 mb-16 space-x-4">
        {/* Tombol Previous */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`rounded-md border p-8 text-gray-500 ${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Nomor Halaman */}
        {visiblePages.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-24 h-24 flex items-center justify-center rounded-md border ${
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
          className={`rounded-md border p-8 text-gray-500 ${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </AdminLayout>
  );
}

export default Orders;
