import AdminLayout from "../../Component/admin/AdminLayout";
import React, { useRef, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  
  const [sizes, setSizes] = useState([{ variantId: 1, size: "", stock: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    tipe: "",
    status: "",
    color: "",
    sku: "",
    materialAtas: "",
    materialSol: "",
  });

  const handleClick = () => fileInputRef.current.click();

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3); // maksimal 3 file
    const filteredFiles = selectedFiles.filter(
      (file) => file.type === "image/png" || file.type === "image/jpeg"
    );
    setFiles(filteredFiles);
  };

  // Input handler
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Specifications
  

  // Sizes
  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };
  const addSize = () =>
    setSizes([...sizes, { variantId: sizes.length + 1, size: "", stock: "" }]);
  const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));

  // Submit
  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();

      // field utama
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      // specifications → JSON
      

      // sizes
      sizes.forEach((s, i) => {
        dataToSend.append(`sizes[${i}][variantId]`, s.variantId);
        dataToSend.append(`sizes[${i}][size]`, s.size);
        dataToSend.append(`sizes[${i}][stock]`, s.stock);
      });

      // images
      files.forEach((file) => dataToSend.append("images", file));

      // POST ke backend
      const res = await api.post("/products", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Produk berhasil ditambahkan:", res.data);
      alert("Produk berhasil ditambahkan!");
      navigate("/admin/products");
    } catch (error) {
      console.error("❌ Gagal menambahkan produk:", error);
      alert("Gagal menambahkan produk!");
    }
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Produk Management
      </h1>
      <div className="my-14 ml-5 mr-28 border rounded-md shadow-md">
        <p className="text-center pt-4 pb-8 text-2xl font-bold">Tambah Produk</p>
        <div className="pl-12">
          {/* Nama Produk */}
          <label className="block text-xl font-semibold mb-3">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan nama produk"
          />

          {/* Brand */}
          <label className="block text-xl font-semibold mb-3">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan brand produk"
          />

          {/* SKU */}
          <label className="block text-xl font-semibold mb-3">Kode SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan kode SKU produk"
          />

          {/* Warna */}
          <label className="block text-xl font-semibold mb-3">Warna</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan warna produk"
          />

          {/* Material Atas */}
          <label className="block text-xl font-semibold mb-3">Material Atas</label>
          <input
            type="text"
            name="materialAtas"
            value={formData.materialAtas}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan material atas"
          />

          {/* Material Sol */}
          <label className="block text-xl font-semibold mb-3">Material Sol</label>
          <input
            type="text"
            name="materialSol"
            value={formData.materialSol}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan material sol"
          />

          {/* Deskripsi */}
          <label className="block text-xl font-semibold mb-3">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan deskripsi produk"
          />

          {/* Harga */}
          <label className="block text-xl font-semibold mb-3">Harga</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan harga produk"
          />

          {/* Kategori */}
          <label className="block text-xl font-semibold mb-3">Kategori</label>
          <select
            name="tipe"
            value={formData.tipe}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="sneakers">Sneakers</option>
            <option value="running">Running</option>
          </select>

          {/* Status */}
          <label className="block text-xl font-semibold mb-3">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          >
            <option value="">-- Pilih Status --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          

          {/* Sizes */}
          <label className="block text-xl font-semibold mb-3">Size & Stok</label>
          {sizes.map((s, index) => (
            <div key={index} className="flex gap-3 mb-4 items-center w-8/12">
              <input
                type="number"
                placeholder="Ukuran"
                value={s.size}
                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                className="flex-1 text-xl pl-4 py-3 border rounded-2xl"
              />
              <input
                type="number"
                placeholder="Stok"
                value={s.stock}
                onChange={(e) => handleSizeChange(index, "stock", e.target.value)}
                className="flex-1 text-xl pl-4 py-3 border rounded-2xl"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="p-2 text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Size
          </button>
        </div>

        {/* Upload Gambar */}
        <div className="p-y-4 px-8 flex flex-col items-center">
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
          <div
            onClick={handleClick}
            className="w-full h-64 border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <p className=" text-gray-800 font-medium text-xl mt-4">
              Klik disini untuk upload foto produk
            </p>
            <p className="text-xl text-gray-400">
              Maksimal upload 3 file foto produk (PNG/JPG)
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 flex gap-3">
              {files.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="my-6 flex justify-between px-32">
          <Link
            to="/admin/products"
            className="w-4/12 py-4 px-6 text-xl border rounded-2xl text-center"
          >
            Batalkan
          </Link>
          <button
            onClick={handleSubmit}
            className="w-4/12 px-6 py-4 bg-black text-white text-xl rounded-2xl"
          >
            Simpan
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
