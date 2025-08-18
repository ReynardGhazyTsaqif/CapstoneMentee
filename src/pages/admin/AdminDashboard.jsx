import AdminLayout from "../../Component/admin/AdminLayout";
import {
  ClipboardCheck,
  ChevronUp,
  Package,
  Users,
  ChartColumnIncreasing,
  MoveRight,
} from "lucide-react";
import { Link } from "react-router-dom";




export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5  text-4xl">Dashboard</h1>
      <div className="mt-10  flex flex-row  gap-12 ml-5 mr-20">
        <div className="w-3/12 bg-white shadow-md p-5 rounded-md font-semibold">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-400">Total Order</p>
              <p className="text-4xl">120</p>
            </div>
          </div>

          <div className="flex items-center">
            <ChevronUp className="text-green-500 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-400 ml-1">2,45%</p>
          </div>
        </div>

        <div className="w-3/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Produk</p>
              <p className="text-4xl font-bold">120</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-600 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-500 ml-1">2,45%</p>
          </div>
        </div>

        <div className="w-3/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-4xl font-bold">120</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-600 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-500 ml-1">2,45%</p>
          </div>
        </div>

        <div className="w-3/12 bg-white shadow-xl p-5 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <ChartColumnIncreasing className="w-6 h-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-4xl font-bold">120</p>
            </div>
          </div>
          <div className="flex items-center">
            <ChevronUp className="text-green-600 w-5 h-5 mt-1" />
            <p className="text-sm text-gray-500 ml-1">2,45%</p>
          </div>
        </div>
      </div>
      <p className="ml-5 my-5 font-semibold text-2xl">Aktivitas Terkini</p>
      <div className="flex gap-20">
        <div className="bg-white shadow-md p-4 ml-5 rounded-md">
          <p className="text-2xl font-medium mb-5">User Registration</p>
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200 uppercase">
              <tr>
                <th className="border-b border-gray-200 text-left px-8 py-2">
                  Nama
                </th>
                <th className="border-b border-gray-200 text-left px-8 py-2">
                  Email
                </th>
                <th className="border-b border-gray-200 text-left px-8 py-2">
                  Tanggal{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 px-8 py-5">Akmal</td>
                <td className="border-b border-gray-200 px-8 py-5">
                  akmal01@gmail.com
                </td>
                <td className="border-b border-gray-200 px-8 py-5">
                  11/04/2025
                </td>
              </tr>
            </tbody>
          </table>
          <div className="gap-2 flex justify-endflex justify-end items-center mt-4 cursor-pointer text-[#090C47] ">
            <Link to="/admin/users">Manage Users</Link>
            <MoveRight />
          </div>
        </div>
        <div className="bg-white shadow-md p-4 ml-5 rounded-md">
          <p className="text-2xl font-medium mb-5">Stok Produk Tersisa</p>
          <table className="w-full border-collapse border border-gray-200 px-36">
            <thead className="bg-gray-200 uppercase">
              <tr>
                <th className="border-b border-gray-200 text-left pl-6 pr-36  py-2">
                  Produk
                </th>
                <th className="border-b border-gray-200 text-left pl-6 pr-36 py-2">
                  Stok
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-200 pl-6 pr-36 py-5">
                  Converse
                </td>
                <td className="border-b border-gray-200 pl-6 pr-36 py-5 text-red-500">
                  100 Tersisa
                </td>
              </tr>
            </tbody>
          </table>
          <div className="gap-2 flex justify-endflex justify-end items-center mt-4 cursor-pointer text-[#090C47] ">
            <Link to="/admin/products">Tambah produk</Link>
            <MoveRight />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md p-4 ml-5 mr-16 rounded-md mt-10 mb-16">
        <p className="text-2xl font-medium mb-5">Order</p>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Order ID
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Nama
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Tanggal
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Total
              </th>
              <th className="border-b border-gray-200 text-left px-8 py-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-200 px-8 py-5">#308453</td>
              <td className="border-b border-gray-200 px-8 py-5">Akmal</td>
              <td className="border-b border-gray-200 px-8 py-5">11/04/2025</td>
              <td className="border-b border-gray-200 px-8 py-5">
                Rp4.500.000
              </td>
              <td className="border-b border-gray-200 px-8 py-5">
                <span className="px-3 py-1 rounded-full font-semibold bg-green-100 text-green-500">
                  Delivered
                </span>
              </td>
              {/*<td className="border-b border-gray-200 px-8 py-5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-300 text-orange-800">
                  Pending
                </span>
              </td>
              <td className="border-b border-gray-200 px-8 py-5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-300 text-blue-800">
                  Processing
                </span>
              </td> */}
            </tr>
          </tbody>
        </table>
        <div className="gap-2 flex justify-endflex justify-end items-center mt-4 cursor-pointer text-[#090C47] ">
          <Link to="/admin/orders">Lihat Semua Order</Link>
          <MoveRight />
        </div>
      </div>
    </AdminLayout>
  );
}
