import AdminLayout from "../../Component/admin/AdminLayout";
import React, { useRef, useEffect, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import api from "../../api/axios";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [types, setTypes] = useState([]);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    typeId: "",
    status: "Active",
    color: "",
    sku: "",
    materialAtas: "",
    materialSol: "",
    sizes: [],
  });

  // Fetch all types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await api.get("/types");
        setTypes(res.data);
      } catch (err) {
        console.error("❌ Gagal fetch types:", err);
      }
    };
    fetchTypes();
  }, []);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        console.log("Fetched product:", res.data);
        const data = res.data;
        

        setProduct({
          name: data.name || "",
          brand: data.brand || "",
          description: data.description || "",
          price: data.price || "",
          typeId: data.type?.id || "",
          status: data.status || "Active",
          color: data.specifications?.["Warna"] || "",
          sku: data.specifications?.["Kode SKU"] || "",
          materialAtas: data.specifications?.["Material Atas"] || "",
          materialSol: data.specifications?.["Material Sol"] || "",
          sizes: data.sizes || [],
        });

        // Jika mau menampilkan gambar awal, bisa masukkan ke files atau state khusus preview
      } catch (err) {
        console.error("❌ Gagal fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Size handlers
  const handleSizeChange = (index, field, value) => {
    const updated = [...product.sizes];
    updated[index][field] = value;
    setProduct({ ...product, sizes: updated });
  };

  const addSize = () => {
    setProduct({
      ...product,
      sizes: [...product.sizes, { variantId: product.sizes.length + 1, size: "", stock: "" }],
    });
  };

  const removeSize = (index) => {
    const updated = product.sizes.filter((_, i) => i !== index);
    setProduct({ ...product, sizes: updated });
  };

  // File handlers
  const handleClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3);
    const filteredFiles = selectedFiles.filter(
      (file) => file.type === "image/png" || file.type === "image/jpeg"
    );
    setFiles(filteredFiles);
  };

  // Submit update
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("price", product.price);
      
      formData.append("typeId", product.typeId);
      formData.append("status", product.status);

      // Masukkan specifications
      const specificationsObject = {
        Warna: product.color,
        "Kode SKU": product.sku,
        "Material Atas": product.materialAtas,
        "Material Sol": product.materialSol,
      };
      formData.append("specifications", JSON.stringify(specificationsObject));

      // Variants
      formData.append("variants", JSON.stringify(product.sizes));

      // Images
      files.forEach((file) => formData.append("images", file));

      await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Produk berhasil diperbarui!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Gagal update produk!");
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (window.confirm("Yakin hapus produk ini?")) {
      try {
        await api.delete(`/products/${id}`);
        alert("Produk berhasil dihapus!");
        navigate("/admin/products");
      } catch (error) {
        console.error(error);
        alert("Gagal hapus produk!");
      }
    }
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Produk Management
      </h1>

      <div className="my-14 ml-5 mr-28 border rounded-md shadow-md">
        <p className="text-center pt-4 pb-8 text-2xl font-bold">Edit Produk</p>

        <button
          onClick={handleDelete}
          className="ml-12 mb-6 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Hapus Produk
        </button>

        <div className="pl-12">
          {/* Nama Produk */}
          <label className="block text-xl font-semibold mb-3">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Brand */}
          <label className="block text-xl font-semibold mb-3">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Warna */}
          <label className="block text-xl font-semibold mb-3">Warna</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan warna produk"
          />

          {/* SKU */}
          <label className="block text-xl font-semibold mb-3">Kode SKU</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Material Atas */}
          <label className="block text-xl font-semibold mb-3">Material Atas</label>
          <input
            type="text"
            name="materialAtas"
            value={product.materialAtas}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Material Sol */}
          <label className="block text-xl font-semibold mb-3">Material Sol</label>
          <input
            type="text"
            name="materialSol"
            value={product.materialSol}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Deskripsi */}
          <label className="block text-xl font-semibold mb-3">Deskripsi</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Harga */}
          <label className="block text-xl font-semibold mb-3">Harga</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          />

          {/* Tipe */}
          <label className="block text-xl font-semibold mb-3">Tipe</label>
          <select
            name="typeId"
            value={product.typeId}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          >
            <option value="">-- Pilih tipe --</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <label className="block text-xl font-semibold mb-3">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Sizes */}
          <label className="block text-xl font-semibold mb-3">Size & Stok</label>
          {product.sizes.map((s, index) => (
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
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={handleClick}
            className="w-full h-64 border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <p className="text-gray-800 font-medium text-xl mt-4">
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

export default EditProduct;
