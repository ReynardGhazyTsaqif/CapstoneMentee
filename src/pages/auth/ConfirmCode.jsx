import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmCode() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ambil email dari halaman sebelumnya (misal: ForgotPassword)
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // Kalau user masuk langsung ke halaman ini tanpa email, redirect balik
      navigate("/forgotpassword");
    }
  }, [location, navigate]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      // Kirim ke backend: verifikasi email + kode
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      // Redirect ke halaman reset password, bawa email sebagai parameter
      navigate("/resetpassword", { state: { email } });
    } catch (error) {
      alert(error.message || "Kode verifikasi salah");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Left side - Dark background (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Right side - Form */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex flex-col justify-center items-start px-4 sm:px-6 lg:px-20 pt-8 lg:pt-20">
          <h1 className="text-black text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Verifikasi Kode
          </h1>
          <p className="text-black text-sm sm:text-base lg:text-lg mb-5 pb-5 text-justify">
            Masukkan kode verifikasi yang telah kami kirimkan ke email <strong>{email}</strong>
          </p>
        </div>

        <div className="px-6 sm:px-12 lg:px-20 max-w-md lg:max-w-none mx-auto lg:mx-0">
          <form onSubmit={handleVerifyCode} className="space-y-4">
            {/* Kode Verifikasi */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Kode Verifikasi
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl p-3 focus:outline-none focus:border-gray-500 transition-colors"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-xl sm:rounded-2xl p-3 mt-6 hover:bg-gray-800 transition-colors font-medium"
            >
              Verifikasi Kode
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCode;
