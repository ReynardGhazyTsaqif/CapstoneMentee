import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios.jsx";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  // State untuk UI feedback (loading, error, pesan sukses)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fungsi untuk menangani submit form
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Ganti dengan endpoint API reset password Anda
      await api.post("/auth/forgot-password", { email });

      setSuccess(true);
      setEmail(""); // Kosongkan input setelah berhasil
    } catch (err) {
      console.error("Error saat mengirim email reset:", err.response);
      const errorMessage =
        err.response?.data?.message ||
        "Gagal mengirim email. Pastikan email Anda benar.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-950 flex justify-center items-center md:justify-start md:flex-row-reverse w-full h-screen">
        <div className="bg-white w-11/12 md:w-3/4 md:h-screen rounded-2xl md:rounded-tl-2xl md:rounded-bl-2xl md:rounded-tr-none md:rounded-br-none m-2 mr-0">
          <div className="pt-10 px-6 md:pt-16 md:px-20">
            <h1 className="text-2xl md:text-3xl text-black font-medium text-center md:text-left">
              Reset Password
            </h1>
          </div>

          <div className="p-6 md:px-20">
            <p className="text-gray-600 text-center md:text-left mb-6 -mt-4">
              Masukkan email Anda dan kami akan mengirimkan tautan untuk reset
              password.
            </p>

            <form onSubmit={handleResetPassword} className="mt-6 space-y-5">
              {error && (
                <div className="p-3 text-center bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-center bg-green-100 text-green-700 rounded-lg">
                  Tautan reset password telah dikirim ke email Anda!
                </div>
              )}

              {/* Grup Email */}
              <div className="flex flex-col items-center md:items-start">
                <label
                  htmlFor="email"
                  className="mb-1 self-stretch text-center md:text-left"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-200 md:w-3/4 w-5/6 border-2 rounded-2xl p-2 focus:outline-none focus:border-gray-500"
                  required
                />
              </div>

              {/* Tombol Submit */}
              <div className="pt-4 flex justify-center md:justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white md:w-3/4 w-5/6 rounded-2xl p-2.5 font-semibold cursor-pointer hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                  {loading ? "Mengirim..." : "Kirim Tautan Reset"}
                </button>
              </div>
            </form>

            <p className="pr-10 text-sm text-center md:text-start mt-4">
              Kembali ke halaman{" "}
              <Link
                to="/login"
                className="font-semibold text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
