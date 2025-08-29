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

  const shippingRef = useRef(null);
  const invoiceRef = useRef(null);

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

  // SOLUSI 1: Menggunakan useReactToPrint dengan reactToPrintContent
  const handlePrintShipping = useReactToPrint({
    contentRef: shippingRef, // Gunakan contentRef untuk versi terbaru
    documentTitle: `ShippingLabel-${id}`,
    onAfterPrint: () => console.log("Shipping label printed successfully"),
    onPrintError: (error) => console.error("Print shipping error:", error),
  });

  const handlePrintInvoice = useReactToPrint({
    contentRef: invoiceRef, // Gunakan contentRef untuk versi terbaru
    documentTitle: `Invoice-${id}`,
    onAfterPrint: () => console.log("Invoice printed successfully"),
    onPrintError: (error) => console.error("Print invoice error:", error),
  });

  // SOLUSI 2: Manual print function sebagai backup
  const printShippingManual = () => {
    if (!shippingRef.current) {
      alert("Shipping content not found!");
      return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    const content = shippingRef.current.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Shipping Label - ${id}</title>
          <style>
            body { 
              font-family: monospace; 
              margin: 0; 
              padding: 20px;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 100);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const printInvoiceManual = () => {
    if (!invoiceRef.current) {
      alert("Invoice content not found!");
      return;
    }

    const printWindow = window.open('', '', 'width=800,height=600');
    const content = invoiceRef.current.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${id}</title>
          <style>
            body { 
              font-family: sans-serif; 
              margin: 0; 
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 100);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const ShippingLabel = ({ order }) => (
    <div className="w-[400px] border border-black p-4 font-mono text-xs bg-white">
      {/* Header */}
      <div className="text-center font-bold text-lg mb-2">
        USPS PRIORITY MAIL
      </div>
      <div className="flex justify-between text-sm border-b border-black pb-2 mb-2">
        <span>From: {order.User?.fullName}</span>
        <span>Order #{order.id}</span>
      </div>

      {/* Address */}
      <div className="mb-4">
        <p className="font-bold">To:</p>
        <p>{order.User?.fullName}</p>
        <p>{order.shipping_address}</p>
      </div>

      {/* Barcode */}
      <div className="mt-6 text-center">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x50&data=Order${order.id}`}
          alt="barcode"
          className="mx-auto"
        />
      </div>

      {/* Footer */}
      <div className="text-center text-xs mt-2">
        Shipping: {order.shipping_method || "Standard"}
      </div>
    </div>
  );

  const Invoice = ({ order, status }) => (
    <div className="w-[600px] border border-black p-6 font-sans text-sm bg-white">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-4">INVOICE</h2>
      <div className="mb-4">
        <p>
          <strong>Order ID:</strong> #{order.id}
        </p>
        <p>
          <strong>Nama:</strong> {order.User?.fullName}
        </p>
        <p>
          <strong>Email:</strong> {order.User?.email}
        </p>
        <p>
          <strong>Alamat:</strong> {order.shipping_address}
        </p>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-black text-sm mb-4">
        <thead>
          <tr className="bg-gray-200 border-b border-black">
            <th className="text-left p-2 border border-black">Produk</th>
            <th className="text-right p-2 border border-black">Harga</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx} className="border-b border-black">
              <td className="p-2 border border-black">
                {item.variantDetails.product.name}
              </td>
              <td className="p-2 text-right border border-black">
                Rp{Number(item.price).toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right font-bold text-lg mb-2">
        Total: Rp{Number(order.total_price).toLocaleString("id-ID")}
      </div>
      <p>
        <strong>Status:</strong> {status}
      </p>
    </div>
  );

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
        <div className=" mx-auto space-y-6">
          {/* Detail Order */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Detail Order</h2>
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

          {/* Print Elements - Hidden but accessible */}
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
            <div ref={shippingRef}>
              {orderDetail && <ShippingLabel order={orderDetail} />}
            </div>
          </div>

          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
            <div ref={invoiceRef}>
              {orderDetail && <Invoice order={orderDetail} status={status} />}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                console.log("Shipping ref:", shippingRef.current);
                if (shippingRef.current) {
                  handlePrintShipping();
                } else {
                  printShippingManual();
                }
              }}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Print Shipping Label
            </button>
            <button
              onClick={() => {
                console.log("Invoice ref:", invoiceRef.current);
                if (invoiceRef.current) {
                  handlePrintInvoice();
                } else {
                  printInvoiceManual();
                }
              }}
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