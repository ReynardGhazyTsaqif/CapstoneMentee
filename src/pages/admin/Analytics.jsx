import AdminLayout from "../../Component/admin/AdminLayout";
import { CircleDollarSign } from "lucide-react";
import { Bar } from "react-chartjs-2";
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
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Penjualan (Juta IDR)",
        data: [12.5, 10, 18.75, 26.45, 22.3, 24.1],
        backgroundColor: "#3B2F1D",
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // sembunyikan legend biar clean
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw * 1_000_000; // balik ke rupiah penuh
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
          callback: (value) => `${value} jt`, // tampilkan dalam juta
        },
      },
    },
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">Analytics</h1>
      <div className="mt-10 flex flex-row gap-12 ml-5 mr-20">
        {/* Stats Cards - sama seperti sebelumnya */}

        <div className="w-4/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Penjualan Hari ini</p>
              <p className="text-4xl font-bold">Rp7.500.000</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 ml-1">
              Diperbarui 10 menit lalu
            </p>
          </div>
        </div>

        <div className="w-4/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <CircleDollarSign className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Penjualan Bulan ini</p>
              <p className="text-4xl font-bold">Rp26.450.000</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 ml-1">
              Diperbarui 10 menit lalu
            </p>
          </div>
        </div>

        <div className="w-2/12 bg-white shadow-xl  space-y-4 rounded-xl flex items-center justify-center text-center text-orange-400">
          <div>
            <p className="text-sm  leading-relaxed">Order Pending</p>
            <p className="text-4xl font-bold leading-relaxed">12 Order</p>
          </div>
        </div>
      </div>

      <div className="w-8/12 ml-5 mt-10 h-96 bg-white shadow-xl rounded-xl p-6">
        <Bar data={data} options={options} />
      </div>

      <p className="ml-5 my-10 font-semibold text-2xl">Top Selling Porduk</p>

      <div className="w-full px-5  rounded-md  mb-16">
        
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Foto
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Nama Produk
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Kategori
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Total Terjual
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-200 px-8 py-5">
                <div className="w-12 h-12 bg-gray-300 rounded" />
              </td>
              <td className="border-b border-gray-200 px-8 py-5">Adidas</td>

              <td className="border-b border-gray-200 px-8 py-5">Sneaker</td>
              <td className="border-b border-gray-200 px-8 py-5">
                100X Terjual
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Analytics;
