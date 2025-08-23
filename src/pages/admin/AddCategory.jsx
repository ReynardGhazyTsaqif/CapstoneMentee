import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../Component/admin/AdminLayout";
import { useState } from "react";
import api from "../../api/axios";

function AddCategory() {
    const navigate = useNavigate();

  // State form
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input perubahan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!formData.name || !formData.status) {
      alert("Harap isi semua field");
      return;
    }

    try {
      setLoading(true);
      await api.post("/types", formData); // ✅ POST ke BE
      alert("Kategori berhasil ditambahkan");
      navigate("/admin/category"); // ✅ redirect setelah tambah
    } catch (err) {
      console.error("❌ Gagal tambah kategori:", err);
      alert("Terjadi kesalahan saat menambah kategori");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Category Management
      </h1>
      <div className="my-14 ml-5 mr-28 border rounded-md shadow-md">
        <p className="text-center pt-4 pb-8 text-2xl font-bold">
          Tambah kategori Produk
        </p>
        <div className="pl-12">
          {/* Nama Produk */}
          <label className="block text-xl font-semibold mb-3">
            Nama kategori Produk
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl focus:outline-none"
            placeholder="Masukkan kategori produk"
          />

          {/* Status */}
          <label className="block text-xl font-semibold mb-3">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl focus:outline-none"
          >
            <option value="">-- Pilih Status --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Tombol */}
        <div className="my-6 flex justify-between px-32">
          <Link
            to="/admin/category"
            className="w-4/12 py-4 px-6 text-xl border rounded-2xl"
          >
            Batalkan
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-4/12 px-6 py-4 bg-black text-white text-xl rounded-2xl disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddCategory;
