// import AdminLayout from "../../Component/admin/AdminLayout";
// import { Search, ChevronRight, ChevronLeft } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// function Orders() {
//   const allOrders = Array.from({ length: 50 }, (_, i) => {
//     // Tanggal acak
//     const start = new Date(2024, 0, 1);
//     const end = new Date(2024, 11, 31);
//     const randomDate = new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//     const formattedDate = randomDate.toLocaleDateString("id-ID", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });

//     // Status acak
//     const statusOptions = ["Pending", "Paid", "Packed", "Delivered", "Shipped"];
//     const status =
//       statusOptions[Math.floor(Math.random() * statusOptions.length)];

//     return {
//       id: i + 1,
//       nama: `Customer ${i + 1}`,
//       tanggal: formattedDate,
//       total: `Rp${(100000 + Math.floor(Math.random() * 900000)).toLocaleString(
//         "id-ID"
//       )}`,
//       status,
//     };
//   });

//   const itemsPerPage = 10;
//   const totalPages = Math.ceil(allOrders.length / itemsPerPage);

//   const [currentPage, setCurrentPage] = useState(1);

//   // Ambil data sesuai halaman
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = allOrders.slice(startIndex, startIndex + itemsPerPage);

//   const prevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const nextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const maxVisible = 5; // jumlah nomor yang terlihat
//   const startPage = Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
//   const endPage = Math.min(startPage + maxVisible - 1, totalPages);

//   const visiblePages = [];
//   for (let i = startPage; i <= endPage; i++) {
//     visiblePages.push(i);
//   }

  

//   return (
//     <AdminLayout>
//       <h1 className="shadow-md font-semibold py-5 pl-5  text-4xl">
//         Order Management
//       </h1>
//       <div className="flex items-center w-9/12 mt-16  ">
//         {/* Search */}
//         <div className="relative flex-grow text-black rounded-xl ml-5">
//           <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
//             <Search className="w-5 h-5" />
//           </div>
//           <input
//             type="text"
//             placeholder="Cari Produk"
//             className="w-full text-xl  pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
//           />
//         </div>
//       </div>

//       <div className="bg-white shadow-lg my-8 ml-5 mr-24 rounded-lg">
//         <div className="flex  pl-8 py-4 items-center">
//           <p className="font-semibold text-xl mr-16">Filter</p>
//           <div className="flex gap-6 font-semibold">
//             <button className="bg-black text-white rounded-3xl py-5 px-8">
//               All
//             </button>
//             <button className="border rounded-3xl py-5 px-8">Pending</button>
//             <button className="border rounded-3xl py-5 px-8">Paid</button>
//             <button className="border rounded-3xl py-5 px-8">Packed</button>
//             <button className="border rounded-3xl py-5 px-8">Shipped</button>
//             <button className="border rounded-3xl py-5 px-8">Delivered</button>
//           </div>
//         </div>
//       </div>

//       <div className="ml-5 mr-24 shadow-md">
//         <table className="w-full border-collapse border border-gray-200">
//           <thead className="bg-gray-200 uppercase">
//             <tr>
//               <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
//                 Order ID
//               </th>
//               <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
//                 Nama
//               </th>
//               <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
//                 Tanggal
//               </th>
//               <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
//                 Total
//               </th>
//               <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
//                 Status
//               </th>
//               <th className="border-b font-semibold border-gray-200 text-left px-8 py-3"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((order) => (
//               <tr key={order.id}>
//                 <td className="border-b border-gray-200 px-8 py-6">
//                   {order.id}
//                 </td>
//                 <td className="border-b border-gray-200 px-8 py-6">
//                   {order.nama}
//                 </td>
//                 <td className="border-b border-gray-200 px-8 py-6">
//                   {order.tanggal}
//                 </td>
//                 <td className="border-b border-gray-200 px-8 py-6">
//                   {order.total}
//                 </td>
//                 <td className="border-b border-gray-200 px-8 py-6">
//                   <span
//                     className={`px-3 py-1 rounded-full font-semibold ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-500"
//                         : order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-500"
//                         : order.status === "Shipped"
//                         ? "bg-blue-100 text-blue-500"
//                         : order.status === "Paid"
//                         ? "bg-blue-100 text-blue-300"
//                         : "bg-blue-100 text-blue-400"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="border-b border-gray-200 px-8 py-6 underline">
//                   <Link to={`/admin/editorder/${order.id}`}>Detail</Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination */}
//       <div className="flex justify-center mt-8 mb-16 space-x-4 ">
//         {/* Tombol Previous */}
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className={` rounded-md border p-8 text-gray-500 ${
//             currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
//           }`}
//         >
//           <ChevronLeft />
//         </button>

//         {/* Nomor Halaman */}
//         {visiblePages.map((num) => (
//           <button
//             key={num}
//             onClick={() => setCurrentPage(num)}
//             className={`w-24 h-24 flex items-center justify-center rounded-md border ${
//               num === currentPage
//                 ? "bg-black text-white"
//                 : "text-gray-500 hover:bg-gray-300"
//             }`}
//           >
//             {num}
//           </button>
//         ))}

//         {/* Tombol Next */}
//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className={`rounded-md border p-8 text-gray-500 ${
//             currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
//           }`}
//         >
//           <ChevronRight />
//         </button>
//       </div>
//     </AdminLayout>
//   );
// }

// export default Orders;

import AdminLayout from "../../Component/admin/AdminLayout";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Orders() {
  // Dummy data orders
  const allOrders = Array.from({ length: 50 }, (_, i) => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 11, 31);
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const formattedDate = randomDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const statusOptions = ["Pending", "Paid", "Packed", "Shipped", "Delivered"];
    const status =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    return {
      id: i + 1,
      nama: `Customer ${i + 1}`,
      tanggal: formattedDate,
      total: `Rp${(100000 + Math.floor(Math.random() * 900000)).toLocaleString(
        "id-ID"
      )}`,
      status,
    };
  });

  // Filter state
  const [filter, setFilter] = useState("All");

  // Data hasil filter
  const filteredOrders =
    filter === "All"
      ? allOrders
      : allOrders.filter((order) => order.status === filter);

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
  const startPage =
    Math.floor((currentPage - 1) / maxVisible) * maxVisible + 1;
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
            placeholder="Cari Produk"
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
      <div className="ml-5 mr-24 shadow-md">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Order ID
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Nama
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Tanggal
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Total
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3">
                Status
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-8 py-3"></th>
             
            </tr>
          </thead>
          <tbody>
            {currentData.map((order) => (
              <tr key={order.id}>
                <td className="border-b border-gray-200 px-8 py-6">{order.id}</td>
                <td className="border-b border-gray-200 px-8 py-6">{order.nama}</td>
                <td className="border-b border-gray-200 px-8 py-6">
                  {order.tanggal}
                </td>
                <td className="border-b border-gray-200 px-8 py-6">
                  {order.total}
                </td>
                <td className="border-b border-gray-200 px-8 py-6">
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
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border-b border-gray-200 px-8 py-6 underline">
                  <Link to={`/admin/detailorder`}>Detail</Link>
                  {/* /${order.id} */}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
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

