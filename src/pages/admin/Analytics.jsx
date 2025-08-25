import AdminLayout from "../../Component/admin/AdminLayout";
import { CircleDollarSign } from "lucide-react";
import { Bar } from "react-chartjs-2";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function Analytics() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeImageUrl = (img) => {
    if (!img) return null;

    // kalau sudah absolute http(s)
    if (img.startsWith("http")) {
      try {
        const url = new URL(img);
        return `${import.meta.env.VITE_API_BASE_URL}${url.pathname.replace(/\\/g, "/")}`;
      } catch {
        return img;
      }
    }

    // kalau relative path
    return `${import.meta.env.VITE_API_BASE_URL}/${img
      .replace(/^\/+/, "")
      .replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics"); 
        console.log("📊 Data Analytics dari BE:", res.data);
        setAnalytics(res.data);
      } catch (error) {
        console.error("Gagal ambil data analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p className="p-10">Loading...</p>
      </AdminLayout>
    );
  }

  if (!analytics) {
    return (
      <AdminLayout>
        <p className="p-10 text-red-500">Gagal memuat data</p>
      </AdminLayout>
    );
  }

  // --- Chart Data ---
  const data = {
    labels: analytics.monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Total Penjualan (Rp)",
        data: analytics.monthlySales.map((item) => item.revenue / 1_000_000), // tampil dalam juta
        backgroundColor: "#3B2F1D",
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw * 1_000_000;
            return `Rp${value.toLocaleString("id-ID")}`;
          },
        },
      },
      title: {
        display: true,
        text: "Total Penjualan (Juta IDR)",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} jt`,
        },
      },
    },
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">Analytics</h1>

      {/* --- Cards --- */}
      <div className="mt-10 flex flex-row gap-12 ml-5 mr-20">
        <div className="w-4/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Penjualan Hari ini</p>
              <p className="text-4xl font-bold">
                Rp{analytics.todayRevenue.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="w-4/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Penjualan Bulan ini</p>
              <p className="text-4xl font-bold">
                Rp{analytics.monthRevenue.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="w-2/12 bg-white shadow-xl space-y-4 rounded-xl flex items-center justify-center text-center text-orange-400">
          <div>
            <p className="text-sm leading-relaxed">Order Pending</p>
            <p className="text-4xl font-bold leading-relaxed">
              {analytics.pendingOrders} Order
            </p>
          </div>
        </div>
      </div>

      {/* --- Chart --- */}
      <div className="w-8/12 ml-5 mt-10 h-96 bg-white shadow-xl rounded-xl p-6">
        <Bar data={data} options={options} />
      </div>

      {/* --- Top Products --- */}
      <p className="ml-5 my-10 font-semibold text-2xl">Top Selling Produk</p>
      <div className="w-full px-5 rounded-md mb-16">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b border-gray-200 text-left px-8 py-2">Foto</th>
              <th className="border-b border-gray-200 text-left px-8 py-2">Nama Produk</th>
              <th className="border-b border-gray-200 text-left px-8 py-2">Kategori</th>
              <th className="border-b border-gray-200 text-left px-8 py-2">Total Terjual</th>
            </tr>
          </thead>
          <tbody>
            {analytics.topProducts.map((prod) => (
              <tr key={prod.id}>
                <td className="border-b border-gray-200 px-8 py-5">
                  <img
                    src={normalizeImageUrl(prod.image)}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border-b border-gray-200 px-8 py-5">{prod.name}</td>
                <td className="border-b border-gray-200 px-8 py-5">{prod.type}</td>
                <td className="border-b border-gray-200 px-8 py-5">
                  {prod.sold}x Terjual
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Analytics;
