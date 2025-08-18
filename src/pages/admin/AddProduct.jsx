import AdminLayout from "../../Component/admin/AdminLayout";
import React, { useRef, useState } from "react";
import { FileText } from "lucide-react";

function AddProduct() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Filter maksimal 3 file dan hanya PNG/JPG
    const filteredFiles = selectedFiles.filter(
      (file) =>
        (file.type === "image/png" || file.type === "image/jpeg") &&
        selectedFiles.length <= 3
    );

    setFiles(filteredFiles);
  };

  return (
    <AdminLayout>
      <h1 className="shadow-md font-semibold py-5 pl-5  text-4xl">
        Produk Management
      </h1>
      <div className="my-14 ml-5 mr-28 border rounded-md shadow-md">
        <p className="text-center pt-4 pb-8 text-2xl font-bold">
          Tambah Produk
        </p>
        <div className="pl-12">
          <label className="block text-xl font-semibold mb-3">
            Nama Produk
          </label>
          <input
            type="text"
            name=""
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
            placeholder="Masukkan nama produk"
          />
          <label className="block text-xl font-semibold mb-3">Deskripsi</label>
          <input
            type="text"
            name=""
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
            placeholder="Masukkan deskripsi produk"
          />
          <label className="block text-xl font-semibold mb-3">Harga</label>
          <input
            type="text"
            name=""
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
            placeholder="Masukkan harga produk"
          />
          <label className="block text-xl font-semibold mb-3">Kategori</label>

          <select
            name=""
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border  placeholder-gray-400 rounded-3xl focus:outline-none"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="sneakers">Sneakers</option>
            <option value="sandals">Sandals</option>
            <option value="boots">Boots</option>
          </select>

          <label className="block text-xl font-semibold mb-3">Stok</label>
          <input
            type="text"
            name=""
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
            placeholder="Masukkan stok produk"
          />
          <label className="block text-xl font-semibold mb-3">Status</label>
          <select
            name=""
            className="w-8/12 text-xl mb-6 pl-6 pr-4 py-4 border placeholder-gray-400 rounded-3xl focus:outline-none"
          >
            <option value="">-- Pilih Status --</option>
            <option value="sneakers">Active</option>
            <option value="sandals">Inactive</option>
          </select>
        </div>
        <div className="p-y-4 px-8 flex flex-col items-center">
          {/* Input file hidden */}
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg"
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />

          {/* Area Upload */}
          <div
            onClick={handleClick}
            className="w-full h-64 border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8 " />
            </div>
            <p className=" text-gray-800 font-medium text-xl mt-4">
              Klik disini untuk upload foto produk
            </p>
            <p className="text-xl text-gray-400">
              Maksimal upload 3 file foto produk (PNG/JPG)
            </p>
          </div>

          {/* Preview file */}
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
          <button className="w-4/12 px-6 py-4 text-xl border rounded-2xl">Batalkan</button>
          <button className="w-4/12 px-6 py-4 bg-black text-white text-xl rounded-2xl">
            Simpan
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;
