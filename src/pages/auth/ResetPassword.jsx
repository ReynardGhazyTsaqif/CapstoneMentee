import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
  if (!email) {
    alert("Email tidak tersedia. Silakan ulangi proses reset.");
    navigate("/forgotpassword");
  }
}, [email, navigate]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        {
          email,
          newPassword,
        }
      );

      alert(response.data.message || "Password berhasil diubah");
      navigate("/login"); // redirect ke login
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal reset password";
      alert(msg);

    }
  };

  return (

    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Kiri (kosong, background gelap untuk layar besar) */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Kanan (form reset password) */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex justify-center lg:justify-start items-center pt-8 lg:pt-20">
          <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl xl:text-4xl mb-6 font-medium lg:pl-20">
            Reset Password
          </h2>
        </div>

        <div className="px-6 sm:px-12 lg:px-20 max-w-md lg:max-w-none mx-auto lg:mx-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Baru */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  className="w-full border-2 border-gray-300 rounded-2xl p-3 pr-12 focus:outline-none focus:border-gray-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* Tombol Simpan */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-2xl p-3 mt-6 hover:bg-gray-800 transition-colors font-medium"
            >
              Simpan Password
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}
