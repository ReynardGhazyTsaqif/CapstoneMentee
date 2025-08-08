import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../../api/axios.jsx"; // Menggunakan instance axios yang sudah dikonfigurasi

export default function Login() {
  // STATE MANAGEMENT (dari Versi 2)
  // Menggabungkan form input ke dalam satu state object untuk kemudahan pengelolaan
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  // State untuk UI feedback (dari Versi 2)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // FUNGSI HANDLE CHANGE (dari Versi 2)
  // Fungsi tunggal untuk menangani semua perubahan input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FUNGSI HANDLE LOGIN (Gabungan Terbaik dari Keduanya)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Menggunakan endpoint dari Versi 2, lebih umum
      const response = await api.post("/auth/login", formData);

      // Mengambil data user dan token (jika ada) dari respons
      const { token, user } = response.data;

      // PRAKTIK TERBAIK: Simpan token di localStorage untuk sesi pengguna
      // Backend harus mengirimkan token untuk autentikasi di request selanjutnya
      if (token) {
        localStorage.setItem("authToken", token);
      }

      // Simpan data user jika diperlukan di halaman lain
      localStorage.setItem("user", JSON.stringify(user));

      // LOGIKA ROLE-BASED NAVIGATION (dari Versi 1)
      // Mengarahkan pengguna berdasarkan role yang diterima dari backend
      if (user.role === "admin") {
        navigate("/admin/dashboard"); // Arahkan admin ke dashboard khusus
      } else {
        navigate("/dashboard"); // Arahkan user biasa ke dashboard umum
      }
    } catch (err) {
      // PENANGANAN ERROR (dari Versi 2)
      // Memberikan pesan error yang jelas di UI
      const errorMessage =
        err.response?.data?.message ||
        "Email atau password salah. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      // Selalu matikan loading state setelah proses selesai
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Bagian Kiri (Sisi Gelap) */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Bagian Kanan (Formulir) - Menggunakan struktur layout dari Versi 2 */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 pt-12 lg:pt-20">
          <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            Login ke Akun Anda
          </h1>
        </div>

        <div className="px-6 sm:px-12 lg:px-20 max-w-md lg:max-w-none mx-auto lg:mx-0">
          <form onSubmit={handleLogin} className="space-y-5 mt-6">
            {/* Tampilkan pesan error jika ada */}
            {error && (
              <div className="p-3 text-center bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Input Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:border-gray-600 transition-colors"
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password Anda"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 pr-12 focus:outline-none focus:border-gray-600 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Opsi "Ingat Saya" & "Lupa Password" */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Ingat saya
                </label>
              </div>
              <Link
                to="/forgotpassword" // Menggunakan path yang lebih umum
                className="text-sm font-semibold text-black hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Tombol Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-xl p-3 font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Login"}
              </button>
            </div>
          </form>

          {/* Link ke halaman Register */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Tidak punya akun?{" "}
            <Link
              to="/register"
              className="font-semibold text-black hover:underline"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
