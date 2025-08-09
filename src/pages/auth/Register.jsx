import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }

    console.log("Data yang dikirim:", {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      alert(response.data.message || "Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
      alert(msg);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Kiri - hanya tampil di layar besar */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Kanan - Form register */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex justify-center lg:justify-start items-center pt-8 lg:pt-20">
          <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl xl:text-4xl mb-6 font-medium lg:pl-20">
            Buat Akun Saya
          </h2>
        </div>

        <div className="px-6 sm:px-12 lg:px-20 max-w-md lg:max-w-none mx-auto lg:mx-0">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* fullName */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Nama Pengguna
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama"
                className="w-full border-2 border-gray-300 rounded-2xl p-3 focus:outline-none focus:border-gray-500 transition-colors"
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

            {/* Password */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="w-full border-2 border-gray-300 rounded-2xl p-3 pr-12 focus:outline-none focus:border-gray-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Masukkan konfirmasi password"
                  className="w-full border-2 border-gray-300 rounded-2xl p-3 pr-12 focus:outline-none focus:border-gray-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                Saya setuju dengan{" "}
                <span className="font-semibold text-black">
                  <a href="#">syarat dan ketentuan</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-2xl p-3 mt-6 hover:bg-gray-800 transition-colors font-medium"
            >
              Daftar
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-semibold text-black hover:text-gray-700 transition-colors"
              >
                Log in di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
