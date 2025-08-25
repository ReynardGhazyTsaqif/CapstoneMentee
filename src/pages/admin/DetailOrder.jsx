import AdminLayout from "../../Component/admin/AdminLayout";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { useReactToPrint } from "react-to-print";

function DetailOrder() {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const shippingRef = useRef();
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/${id}/detail`);
        setOrderDetail(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error("❌ Error fetching order detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await api.put(`/orders/${id}/status`, { status: newStatus });
      setStatus(newStatus);
      alert(res.data.message);
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert("Gagal update status.");
    }
  };

  const handlePrintShipping = useReactToPrint({
    content: () => shippingRef.current,
  });

  const handlePrintInvoice = useReactToPrint({
    content: () => invoiceRef.current,
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-xl">Loading order detail...</div>
      </AdminLayout>
    );
  }

  if (!orderDetail) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-xl">Order tidak ditemukan</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Detail Order */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Detail Order</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Order ID:</span> #
                {orderDetail?.id}
              </p>
              <p>
                <span className="font-medium">Tanggal Order:</span>{" "}
                {new Date(orderDetail?.createdAt).toLocaleDateString("id-ID")}
              </p>
              <p>
                <span className="font-medium">Produk:</span>{" "}
                {orderDetail?.items
                  ?.map((i) => i.variantDetails.product.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-medium">Total:</span> Rp
                {Number(orderDetail?.total_price).toLocaleString("id-ID")}
              </p>
              <p>
                <span className="font-medium">Pembayaran:</span>{" "}
                {orderDetail?.payment_method}
              </p>
              <p>
                <span className="font-medium">Ekspedisi:</span>{" "}
                {orderDetail?.shipping_method}
              </p>
              <div>
                <label className="font-medium mr-2">Status:</label>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none"
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Packed</option>
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
                <span className="font-medium">Nama:</span>{" "}
                {orderDetail?.User?.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {orderDetail?.User?.email}
              </p>
              <p>
                <span className="font-medium">Alamat:</span>{" "}
                {orderDetail?.shipping_address}
              </p>
            </div>
          </div>

          {/* Shipping Label (hidden, hanya muncul saat print) */}
          <div className="hidden">
            <div ref={shippingRef} className="p-10">
              <h2 className="text-xl font-bold mb-4">Shipping Label</h2>
              <p>Order ID: #{orderDetail?.id}</p>
              <p>Nama: {orderDetail?.User?.fullName}</p>
              <p>Alamat: {orderDetail?.shipping_address}</p>
            </div>
          </div>

          {/* Invoice (hidden, hanya muncul saat print) */}
          <div className="hidden">
            <div ref={invoiceRef} className="p-10">
              <h2 className="text-xl font-bold mb-4">Invoice</h2>
              <p>Order ID: #{orderDetail?.id}</p>
              <p>
                Total: Rp
                {Number(orderDetail?.total_price).toLocaleString("id-ID")}
              </p>
              <p>Status: {status}</p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrintShipping}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Print Shipping Label
            </button>
            <button
              onClick={handlePrintInvoice}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default DetailOrder;
