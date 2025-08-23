import AdminLayout from "../../Component/admin/AdminLayout"
import { useState } from "react";


function DetailOrder (){
    const [status, setStatus] = useState("Delivered");
    return(
        <AdminLayout>
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Detail Order */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Detail Order</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Order ID:</span> #348053
            </p>
            <p>
              <span className="font-medium">Tanggal Order:</span> 11/04/2025
            </p>
            <p>
              <span className="font-medium">Produk:</span> Longines Master
            </p>
            <p>
              <span className="font-medium">Total:</span> Rp4.545.000
            </p>
            <p>
              <span className="font-medium">Pembayaran:</span> COD
            </p>
            <p>
              <span className="font-medium">Ekspedisi:</span> TIKI
            </p>
            <div>
              <label className="font-medium mr-2">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info Customer */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Info Customer</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Nama:</span> Akmal
            </p>
            <p>
              <span className="font-medium">Email:</span> akmal01@gmail.com
            </p>
            <p>
              <span className="font-medium">No HP:</span> 08482461265
            </p>
            <p>
              <span className="font-medium">Alamat:</span> Jln. Raya Kampung
              Baru, Kelurahan Kampung Baru, Lubuk Kilangan, (disamping kedai
              buah) KOTA PADANG
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Print Shipping Label
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
        </AdminLayout>
    )
}

export default DetailOrder