import AdminLayout from "../../Component/admin/AdminLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

function Category() {
  const [isOpen, setIsOpen] = useState(null); // bedakan dropdown tiap row

  const [categories, setCategories] = useState([]); // ✅ state kategori
  const [loading, setLoading] = useState(true);

  // Ambil data kategori dari BE
  const fetchCategories = async () => {
    try {
      const res = await api.get("/types/all"); // ✅ GET /api/types
      console.log("📌 Data kategori:", res.data);
      setCategories(res.data); // sesuaikan dengan format BE kamu
    } catch (err) {
      console.error("❌ Gagal fetch kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Tutup dropdown kalau klik di luar
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

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;

    try {
      await api.delete(`/types/${id}`); // ✅ DELETE /api/types/:id
      alert("Kategori berhasil dihapus");
      // Refresh data
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
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
      <div className="flex items-center w-full my-16 px-5 justify-between">
        <p className="ml-5 my-5 font-semibold text-2xl">Kategori Produk</p>
        <Link
          to="/admin/addcategory"
          className="bg-black text-white px-6 py-4 text-xl rounded-3xl mx-5"
        >
          Tambah Kategori
        </Link>
      </div>

      <div className="shadow-md mx-8 mb-24">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200 uppercase">
            <tr>
              <th className="border-b font-semibold border-gray-200 text-left px-16 py-3">
                Kategori
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-16 py-3">
                Status
              </th>
              <th className="border-b font-semibold border-gray-200 text-left px-16 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="border-b border-gray-200 px-16 py-6">
                  {cat.name}
                </td>
                <td className="border-b border-gray-200 px-16 py-6">
                  {cat.status}
                </td>
                <td className="border-b border-gray-200 px-16 py-6">
                  <div className="relative flex justify-end dropdown-menu">
                    <button
                      onClick={() =>
                        setIsOpen(isOpen === cat.id ? null : cat.id)
                      }
                      className="px-8 py-2 border rounded-3xl focus:outline-none"
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
                            onClick={() => handleDelete(cat.id)}
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
    </AdminLayout>
  );
}

export default Category;
