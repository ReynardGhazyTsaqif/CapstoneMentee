import AdminLayout from "../../Component/admin/AdminLayout";
import React, { useRef, useState, useEffect } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  

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
  const [sizes, setSizes] = useState([]);
  const [types, setTypes] = useState([]);
  const [files, setFiles] = useState([]); // gambar baru
  const [existingImages, setExistingImages] = useState([]); // gambar lama dari BE
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch tipe produk
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

  // Fetch product by id
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;

        setFormData({
          name: data.name || "",
          brand: data.brand || "",
          description: data.description || "",
          price: data.price || "",
          tipe: data.typeId || "",
          status: data.status || "",
          color: data.color || "",
          sku: data.kodeSKU || "",
          materialAtas: data.materialAtas || "",
          materialSol: data.materialSol || "",
        });

        // sizes / variants
        setSizes(data.variants?.map((v, index) => ({
          variantId: index + 1,
          size: v.size,
          stock: v.stock,
        })) || []);

        // existing images
        setExistingImages(data.images || []);

      } catch (err) {
        console.error("❌ Gagal fetch product:", err);
        alert("Produk tidak ditemukan");
        navigate("/admin/products");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Sizes
  const handleSizeChange = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };
  const addSize = () => setSizes([...sizes, { variantId: sizes.length + 1, size: "", stock: "" }]);
  const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));

  // File upload
  const handleClick = () => fileInputRef.current.click();
  const handleChangeFiles = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3);
    const filteredFiles = selectedFiles.filter(f => f.type === "image/png" || f.type === "image/jpeg");
    setFiles(filteredFiles);
  };
  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const dataToSend = new FormData();

      dataToSend.append("name", formData.name);
      dataToSend.append("brand", formData.brand);
      dataToSend.append("description", formData.description);
      dataToSend.append("price", formData.price);
      dataToSend.append("typeId", formData.tipe);
      dataToSend.append("status", formData.status);
      dataToSend.append("color", formData.color);
      dataToSend.append("Material Atas", formData.materialAtas);
      dataToSend.append("Material Sol", formData.materialSol);
      dataToSend.append("Kode SKU", formData.sku);

      // Variants
      dataToSend.append("variants", JSON.stringify(
        sizes.map(s => ({ size: s.size, stock: s.stock }))
      ));

      // New images
      files.forEach(f => dataToSend.append("images", f));

      // Existing images (beberapa BE mungkin perlu dikirim sebagai array URL untuk mempertahankan gambar lama)
      dataToSend.append("existingImages", JSON.stringify(existingImages));

      await api.put(`/products/${id}`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Produk berhasil diperbarui!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Gagal update product:", err);
      alert("Terjadi kesalahan saat update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <AdminLayout><h1 className="p-5 text-2xl">Loading...</h1></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5 text-4xl">
        Product Management
      </h1>
      <div className="my-14 ml-5 mr-28 border rounded-md shadow-md">
        <p className="text-center pt-4 pb-8 text-2xl font-bold">Edit Produk</p>
        <div className="pl-12">
          {/* Nama, Brand, SKU, Warna, Material, Deskripsi, Harga */}
          <label className="block text-xl font-semibold mb-3">Nama Produk</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Brand</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Kode SKU</label>
          <input type="text" name="sku" value={formData.sku} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Warna</label>
          <input type="text" name="color" value={formData.color} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Material Atas</label>
          <input type="text" name="materialAtas" value={formData.materialAtas} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Material Sol</label>
          <input type="text" name="materialSol" value={formData.materialSol} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Deskripsi</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />
          <label className="block text-xl font-semibold mb-3">Harga</label>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl" />

          {/* Tipe */}
          <label className="block text-xl font-semibold mb-3">Tipe</label>
          <select name="tipe" value={formData.tipe} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl">
            <option value="">-- Pilih tipe --</option>
            {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>

          {/* Status */}
          <label className="block text-xl font-semibold mb-3">Status</label>
          <select name="status" value={formData.status} onChange={handleInputChange} className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl">
            <option value="">-- Pilih Status --</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Sizes */}
          <label className="block text-xl font-semibold mb-3">Size & Stok</label>
          {sizes.map((s, index) => (
            <div key={index} className="flex gap-3 mb-4 items-center w-8/12">
              <input type="number" placeholder="Ukuran" value={s.size} onChange={e => handleSizeChange(index, "size", e.target.value)} className="flex-1 text-xl pl-4 py-3 border rounded-2xl" />
              <input type="number" placeholder="Stok" value={s.stock} onChange={e => handleSizeChange(index, "stock", e.target.value)} className="flex-1 text-xl pl-4 py-3 border rounded-2xl" />
              <button type="button" onClick={() => removeSize(index)} className="p-2 text-red-500"><Trash2 /></button>
            </div>
          ))}
          <button type="button" onClick={addSize} className="mb-6 px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Tambah Size</button>

        </div>

        {/* Upload Gambar */}
        <div className="p-y-4 px-8 flex flex-col items-center">
          <input type="file" multiple accept="image/png,image/jpeg" ref={fileInputRef} onChange={handleChangeFiles} className="hidden" />
          <div onClick={handleClick} className="w-full h-64 border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center"><FileText className="w-8 h-8" /></div>
            <p className="text-gray-800 font-medium text-xl mt-4">Klik disini untuk upload foto produk</p>
            <p className="text-xl text-gray-400">Maksimal upload 3 file foto produk (PNG/JPG)</p>
          </div>

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div className="mt-4 flex gap-3">
              {existingImages.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img} alt="existing" className="w-20 h-20 object-cover rounded-lg border" />
                  <button type="button" onClick={() => removeExistingImage(index)} className="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1"><Trash2 /></button>
                </div>
              ))}
            </div>
          )}

          {/* New files preview */}
          {files.length > 0 && (
            <div className="mt-4 flex gap-3">
              {files.map((file, index) => (
                <img key={index} src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="my-6 flex justify-between px-32">
          <Link to="/admin/products" className="w-4/12 py-4 px-6 text-xl border rounded-2xl">Batalkan</Link>
          <button onClick={handleSubmit} disabled={loading} className="w-4/12 px-6 py-4 bg-black text-white text-xl rounded-2xl disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EditProduct;
