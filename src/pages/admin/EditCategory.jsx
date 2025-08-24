import AdminLayout from "../../Component/admin/AdminLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

function EditCategory() {
  const { id } = useParams(); // ✅ ambil id dari URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Ambil data kategori berdasarkan id
  const fetchCategory = async () => {
    try {
      const res = await api.get(`/types/${id}`); // ✅ GET /api/types/:id
      setFormData({
        name: res.data.name,
        status: res.data.status,
      });
    } catch (err) {
      console.error("❌ Gagal fetch kategori:", err);
      alert("Kategori tidak ditemukan");
      navigate("/admin/category");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Handle input perubahan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit update
  const handleSubmit = async () => {
    if (!formData.name || !formData.status) {
      alert("Harap isi semua field");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/types/${id}`, formData); // ✅ PUT /api/types/:id
      alert("Kategori berhasil diperbarui");
      navigate("/admin/category");
    } catch (err) {
      console.error("❌ Gagal update kategori:", err);
      alert("Terjadi kesalahan saat update kategori");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <h1 className="p-5 text-2xl">Loading...</h1>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Category Management
      </h1>
      <div className="my-14 ml-5 mr-28 border rounded-md shadow-md">
        <p className="text-center pt-4 pb-8 text-2xl font-bold">
          Edit Kategori Produk
        </p>
        <div className="pl-12">
          {/* Nama Kategori */}
          <label className="block text-xl font-semibold mb-3">
            Nama Kategori
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl focus:outline-none"
            placeholder="Masukkan nama kategori"
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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

export default EditCategory;
