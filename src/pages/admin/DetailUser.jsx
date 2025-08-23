import AdminLayout from "../../Component/admin/AdminLayout"
import { useState } from "react";


function DetailUser (){
    const [role, setRole] = useState("Admin");

  const orders = [
    { id: "#348053", tanggal: "11/04/2025", status: "Delivered", total: "Rp4.545.000" },
    { id: "#943496", tanggal: "12/04/2025", status: "Delivered", total: "Rp4.545.000" },
    { id: "#204769", tanggal: "13/04/2025", status: "Delivered", total: "Rp4.545.000" },
  ];
    return(
        <AdminLayout>
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Detail User */}
        <div className="bg-white p-6 rounded-xl shadow-md relative">
          <h2 className="text-lg font-semibold mb-4">Detail User</h2>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Nama:</span> Akmal
            </p>
            <p>
              <span className="font-medium">Email:</span> Akmal01@gmail.com
            </p>
            <p>
              <span className="font-medium">Tanggal Join:</span> 11/04/2025
            </p>
            <div>
              <label className="font-medium mr-2">Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
              >
                <option>Admin</option>
                <option>Customer</option>
              </select>
            </div>
          </div>

          <button className="absolute top-6 right-6 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Simpan
          </button>
        </div>

        {/* Riwayat Order */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Riwayat Order</h2>
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
              {orders.map((order, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.tanggal}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </AdminLayout>
    )
}

export default DetailUser