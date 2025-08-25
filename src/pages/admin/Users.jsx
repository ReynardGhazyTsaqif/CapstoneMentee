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
        const res = await api.get("/users/all");
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const toggleBlockUser = async (userId) => {
    try {
      await api.put(`/users/${userId}/toggle-block`); // ✅ sesuai BE
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_blocked: !u.is_blocked } : u
        )
      );
    } catch (err) {
      console.error(
        "❌ Gagal update status user:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        User Management
      </h1>

      {/* Search */}
      <div className="flex items-center w-full my-16">
        <div className="relative flex-grow text-black rounded-xl ml-5">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Cari Order ID atau nama customer"
            className="w-8/12 text-xl pl-16 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="ml-5 mr-24 shadow-md overflow-hidden rounded-xl">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b font-semibold text-left px-8 py-3">
                Nama
              </th>
              <th className="border-b font-semibold text-left px-8 py-3">
                Email
              </th>
              <th className="border-b font-semibold text-left px-8 py-3">
                Tanggal Join
              </th>

              <th className="border-b font-semibold text-left px-8 py-3">
                Status
              </th>
              <th className="border-b font-semibold text-left px-8 py-3">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 px-8 py-6">
                    {user.fullName}
                  </td>
                  <td className="border-b border-gray-200 px-8 py-6">
                    {user.email}
                  </td>
                  <td className="border-b border-gray-200 px-8 py-6">
                    {new Date(user.createdAt).toLocaleDateString("id-ID")}
                  </td>

                  <td className="border-b border-gray-200 px-8 py-6">
                    {/* Toggle Switch */}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!user.is_blocked}
                        onChange={() => toggleBlockUser(user.id)}
                        className="sr-only peer"
                      />

                      <div className="relative w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition">
                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-7"></span>
                      </div>
                      <span className="ml-3 text-sm">
                        {user.is_blocked ? "Blocked" : "Active"}
                      </span>
                    </label>
                  </td>
                  <td className="border-b border-gray-200 px-8 py-6 underline text-blue-600">
                    <Link to={`/admin/detailusers/${user.id}`}>Detail</Link>
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
