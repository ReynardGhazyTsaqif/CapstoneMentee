import AdminLayout from "../../Component/admin/AdminLayout";
import React, { useRef, useState, useEffect } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    tipe: "",
    status: "Active",
    specifications: [],
    sizes: [],
  });

  // Load product data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct({
          name: data.name || "",
          brand: data.brand || "",
          description: data.description || "",
          price: data.price || "",
          tipe: data.tipe || "",
          status: data.status || "Active",
          specifications: data.specifications
            ? Object.entries(data.specifications).map(([key, value]) => ({
                key,
                value,
              }))
            : [],
          sizes: data.sizes || [],
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Specifications handlers
  const handleSpecChange = (index, field, value) => {
    const updated = [...product.specifications];
    updated[index][field] = value;
    setProduct({ ...product, specifications: updated });
  };

  const addSpecification = () => {
    setProduct({
      ...product,
      specifications: [...product.specifications, { key: "", value: "" }],
    });
  };

  const removeSpecification = (index) => {
    const updated = product.specifications.filter((_, i) => i !== index);
    setProduct({ ...product, specifications: updated });
  };

  // Sizes handlers
  const handleSizeChange = (index, field, value) => {
    const updated = [...product.sizes];
    updated[index][field] = value;
    setProduct({ ...product, sizes: updated });
  };

  const addSize = () => {
    setProduct({
      ...product,
      sizes: [
        ...product.sizes,
        { variantId: product.sizes.length + 1, size: "", stock: "" },
      ],
    });
  };

  const removeSize = (index) => {
    const updated = product.sizes.filter((_, i) => i !== index);
    setProduct({ ...product, sizes: updated });
  };

  // File handlers
  const handleClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filteredFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/png" || file.type === "image/jpeg") &&
        selectedFiles.length <= 3
    );
    setFiles(filteredFiles);
  };

  // Submit
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("tipe", product.tipe);
      formData.append("status", product.status);
      formData.append(
        "specifications",
        JSON.stringify(
          product.specifications.reduce((acc, curr) => {
            if (curr.key && curr.value) acc[curr.key] = curr.value;
            return acc;
          }, {})
        )
      );
      formData.append("sizes", JSON.stringify(product.sizes));

      files.forEach((file) => {
        formData.append("images", file);
      });

      await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Produk berhasil diperbarui!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Gagal update produk!");
    }
  };

  // Delete
  const handleDelete = async () => {
    if (window.confirm("Yakin hapus produk ini?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
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
          <label className="block text-xl font-semibold mb-3">
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan nama produk"
          />

          <label className="block text-xl font-semibold mb-3">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan brand produk"
          />

          <label className="block text-xl font-semibold mb-3">Deskripsi</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan deskripsi produk"
          />

          <label className="block text-xl font-semibold mb-3">Harga</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
            placeholder="Masukkan harga produk"
          />

          <label className="block text-xl font-semibold mb-3">Kategori</label>
          <select
            name="tipe"
            value={product.tipe}
            onChange={handleInputChange}
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="sneakers">Sneakers</option>
            <option value="sandals">Sandals</option>
            <option value="boots">Boots</option>
          </select>

          <label className="block text-xl font-semibold mb-3">Stok</label>
          <input
            type="text"
            name="stock"
            value={product.sizes.reduce(
              (acc, s) => acc + Number(s.stock || 0),
              0
            )}
            readOnly
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border rounded-3xl bg-gray-100"
          />

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

          {/* Specifications */}
          <label className="block text-xl font-semibold mb-3">
            Spesifikasi
          </label>
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex gap-3 mb-4 items-center w-8/12">
              <input
                type="text"
                placeholder="Nama Spesifikasi"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                className="flex-1 text-xl pl-4 py-3 border rounded-2xl"
              />
              <input
                type="text"
                placeholder="Isi Spesifikasi"
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
                className="flex-1 text-xl pl-4 py-3 border rounded-2xl"
              />
              <button
                onClick={() => removeSpecification(index)}
                className="p-2 text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
            onClick={addSpecification}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Spesifikasi
          </button>

          {/* Sizes */}
          <label className="block text-xl font-semibold mb-3">
            Sizes & Stock
          </label>
          {product.sizes.map((s, index) => (
            <div key={index} className="flex gap-3 mb-4 items-center w-8/12">
              <input
                type="number"
                placeholder="Ukuran"
                value={s.size}
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                className="flex-1 text-xl pl-4 py-3 border rounded-2xl"
              />
              <input
                type="number"
                placeholder="Stok"
                value={s.stock}
                onChange={(e) =>
                  handleSizeChange(index, "stock", e.target.value)
                }
                className="flex-1 text-xl pl-4 py-3 border rounded-2xl"
              />
              <button
                onClick={() => removeSize(index)}
                className="p-2 text-red-500"
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <button
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
              <FileText className="w-8 h-8 " />
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
          <button
            onClick={() => navigate("/admin/products")}
            className="w-4/12 px-6 py-4 text-xl border rounded-2xl"
          >
            Batalkan
          </button>
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


