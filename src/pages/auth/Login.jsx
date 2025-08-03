import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { withCredentials: true } // kalau backend pakai cookie/session
      );

      alert(response.data.message); // atau tampilkan di UI
      // Misal: simpan data user ke localStorage jika perlu
      // localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      const msg =
        error.response?.data?.message || "Terjadi kesalahan saat login";
      alert(msg);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950 font-sans">
      {/* Left side - Dark background (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Right side - Login form */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex justify-center lg:justify-start items-center pt-8 lg:pt-20">
          <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl xl:text-4xl mb-6 font-medium lg:pl-20">
            Login
          </h2>
        </div>

        <div className="px-6 sm:px-12 lg:px-20 max-w-md lg:max-w-none mx-auto lg:mx-0">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl p-3 focus:outline-none focus:border-gray-500 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl p-3 pr-12 focus:outline-none focus:border-gray-500 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Lupa password */}
            <div className="text-right">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Ingat saya
              </label>
            </div>

            {/* Button Login */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-xl sm:rounded-2xl p-3 mt-6 hover:bg-gray-800 transition-colors font-medium"
            >
              Login
            </button>

            {/* Register link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Tidak punya akun?{" "}
              <Link
                to="/register"
                className="font-semibold text-black hover:text-gray-700 transition-colors"
              >
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
