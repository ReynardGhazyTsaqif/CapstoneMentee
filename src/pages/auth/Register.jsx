import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios.jsx";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //state untuk mengontrol visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // 4. Fungsi untuk menangani perubahan pada input

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 5. Fungsi untuk menangani submit form
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = formData;

      await api.post("/auth/register", formData);

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Full error response:", err.response);
      const errorMessage =
        err.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Kiri - hanya tampil di layar besar */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Formulir pendaftaran */}
      <div className="p-6 md:px-20">
        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          {error && (
            <div className="p-3 text-center bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-center bg-green-100 text-green-700 rounded-lg">
              Registrasi berhasil! Mengarahkan ke halaman login...
            </div>
          )}

          {/* Grup Nama Pengguna */}
          <div className="flex flex-col items-center md:items-start">
            <label
              htmlFor="fullName"
              className="mb-1 self-stretch text-center md:text-left"
            >
              Nama Pengguna
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Masukkan nama"
              value={formData.fullName}
              onChange={handleChange}
              className="border-slate-200 md:w-3/4 w-5/6 border-2 rounded-2xl p-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email"
              className="w-full border-2 border-gray-300 rounded-2xl p-3 focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
          </div>

          {/* Grup Password */}
          <div className="flex flex-col items-center md:items-start">
            <label
              htmlFor="password"
              className="mb-1 self-stretch text-center md:text-left"
            >
              Password
            </label>
            <div className="relative w-full md:w-3/4">
              {" "}
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                className="border-slate-200 w-full border-2 rounded-2xl p-2 pr-10"
                required
              />
              <button
                type="button" // Penting agar tidak submit form
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {/* 7. Tampilkan ikon yang sesuai */}
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Grup Konfirmasi Password */}
          <div className="flex flex-col items-center md:items-start">
            <label
              htmlFor="confirm-password"
              className="mb-1 self-stretch text-center md:text-left"
            >
              Konfirmasi Password
            </label>
            <div className="relative w-full md:w-3/4">
              {" "}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Masukkan konfirmasi password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-slate-200 w-full border-2 rounded-2xl p-2 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Grup Checkbox */}
          <div className="flex items-center justify-center md:justify-start pt-2">
            <input id="terms" type="checkbox" className="mr-2" required />
            <label htmlFor="terms" className="text-sm">
              Saya setuju dengan{" "}
              <a href="#" className="font-semibold text-black hover:underline">
                syarat dan ketentuan
              </a>
            </label>
          </div>

          {/* Tombol Submit */}
          <div className="pt-4 flex justify-center md:justify-start">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </div>
        </form>
        <p className="pr-10 text-sm  text-center md:text-start mt-4">
          Sudah Punya Akun ?{" "}
          <span className="font-semibold">
            <Link to="/login" className="text-black hover:underline">
              Login Di Sini
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
