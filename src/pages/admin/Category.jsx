import AdminLayout from "../../Component/admin/AdminLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

function Category() {
  const [isOpen, setIsOpen] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ state untuk modal konfirmasi hapus
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const statusBadge = (status) => {
    const st = (status || "").toString().toLowerCase();
    if (st === "inactive" || st === "draft") return "bg-red-300 text-red-600";
    if (st === "archived") return "bg-zinc-100 text-zinc-700";

    return "bg-green-100 text-green-600";
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/types/all");
      setCategories(res.data);
    } catch (err) {
      console.error("❌ Gagal fetch kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-menu")) {
        setIsOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <h1 className="p-5 text-2xl">Loading...</h1>
      </AdminLayout>
    );
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/types/${selectedId}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== selectedId));
      setShowConfirm(false);
      setSelectedId(null);
    } catch (err) {
      console.error("❌ Gagal hapus kategori:", err);
      alert("Terjadi kesalahan saat menghapus kategori");
    }
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Category Management
      </h1>
      <div className="flex flex-col md:flex-row items-start md:items-center w-full my-8 px-4 justify-between gap-4">
        <p className="font-semibold text-xl md:text-2xl">Kategori Produk</p>
        <Link
          to="/admin/addcategory"
          className="bg-black text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg rounded-2xl"
        >
          Tambah Kategori
        </Link>
      </div>

      <div className="shadow-md mx-4 mb-16 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b font-semibold border-gray-200 text-left px-4 md:px-8 py-3">
                Kategori
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-4 md:px-8 py-3">
                Status
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-4 md:px-8 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="border-b border-gray-200 px-4 md:px-8 py-3 md:py-6">
                  {cat.name}
                </td>
                <td className="border-b border-gray-200 px-4 md:px-8 py-3 md:py-6">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold ${statusBadge(
                            cat.status
                          )}`}
                        >
                          {String(cat.status || "active").toUpperCase()}
                        </span>
                      </td>
                <td className="border-b border-gray-200 px-4 md:px-8 py-3 md:py-6">
                  <div className="relative flex justify-end dropdown-menu">
                    <button
                      onClick={() =>
                        setIsOpen(isOpen === cat.id ? null : cat.id)
                      }
                      className="px-4 py-1 md:px-6 md:py-2 border rounded-2xl text-sm md:text-base focus:outline-none"
                    >
                      Edit
                    </button>

                    {isOpen === cat.id && (
                      <ul className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <li>
                          <Link
                            to={`/admin/editcategory/${cat.id}`}
                            className="block px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-t-lg"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setSelectedId(cat.id);
                              setShowConfirm(true);
                              setIsOpen(null);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 rounded-b-lg"
                          >
                            Hapus
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowConfirm(false)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-2">
              Apa kamu yakin ingin menghapus kategori ini?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Aksi ini tidak bisa dibatalkan kembali.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Batalkan
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-black text-white rounded-xl"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Category;
