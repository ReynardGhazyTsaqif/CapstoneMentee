import AdminLayout from "../../Component/admin/AdminLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function DetailUser() {
  const { id } = useParams(); // ambil id user dari URL (/admin/detailusers/:id)
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setUser(res.data);
        setRole(res.data.role);
      } catch (err) {
        console.error("❌ Gagal ambil detail user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/users/${id}`, { role }); // pastikan ada endpoint update role di BE
      alert("✅ Role berhasil diperbarui");
    } catch (err) {
      console.error("❌ Gagal update role:", err);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center">Loading...</div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="p-10 text-center">User tidak ditemukan</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Detail User */}
          <div className="bg-white p-6 rounded-xl shadow-md relative">
            <h2 className="text-lg font-semibold mb-4">Detail User</h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Nama:</span> {user.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Tanggal Join:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString("id-ID")}
              </p>
              <div>
                <label className="font-medium mr-2">Role:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="absolute top-6 right-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Simpan
            </button>
          </div>

          {/* Riwayat Order */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Riwayat Order ({user.Orders?.length || 0})
            </h2>
            <table className="w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">ORDER ID</th>
                  <th className="px-4 py-2 border-b">TANGGAL</th>
                  <th className="px-4 py-2 border-b">STATUS</th>
                  <th className="px-4 py-2 border-b">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {user.Orders?.length > 0 ? (
                  user.Orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3">#{order.id}</td>
                      <td className="px-4 py-3">
                        {new Date(order.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        Rp{order.total_price.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Tidak ada riwayat order
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DetailUser;
