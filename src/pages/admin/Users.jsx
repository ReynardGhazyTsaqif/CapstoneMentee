import AdminLayout from "../../Component/admin/AdminLayout";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/dashboard/recent-users");
        console.log("📌 Response:", res.data);

        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        User Management
      </h1>

      {/* Search + Button */}
      <div className="flex items-center w-full my-16">
        <div className="relative flex-grow text-black rounded-xl ml-5">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari User"
            className="w-8/12 text-xl pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
          />
        </div>

        
      </div>

      {/* Table */}
      <div className="ml-5 mr-24 shadow-md">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b font-semibold text-left px-8 py-3">Nama</th>
              <th className="border-b font-semibold text-left px-8 py-3">Email</th>
              <th className="border-b font-semibold text-left px-8 py-3">Tanggal Join</th>
              <th className="border-b font-semibold text-left px-8 py-3">Total Order</th>
              <th className="border-b font-semibold text-left px-8 py-3"></th>
              
              <th className="border-b font-semibold text-left px-8 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-gray-200 px-8 py-6">
                    {user.fullName}
                  </td>
                  <td className="border-b border-gray-200 px-8 py-6">
                    {user.email}
                  </td>
                  <td className="border-b border-gray-200 px-8 py-6">
                    {new Date(user.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="border-b border-gray-200 px-8 py-6">-</td>
                  <td className="border-b border-gray-200 px-8 py-6">-</td>
                  
                  <td className="border-b border-gray-200 px-8 py-6 underline">
                    <Link to="/admin/editproduct">Detail</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (sementara statis) */}
      <div className="flex justify-center mt-8 mb-16 space-x-4">
        <button className="rounded-md border p-4 text-gray-500">
          <ChevronLeft />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-md border bg-black text-white">
          1
        </button>
        <button className="rounded-md border p-4 text-gray-500">
          <ChevronRight />
        </button>
      </div>
    </AdminLayout>
  );
}

export default Users;
