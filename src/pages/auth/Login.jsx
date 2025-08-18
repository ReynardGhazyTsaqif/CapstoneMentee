import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../../api/axios.jsx";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", formData);

      if (response.data.token && response.data.user) {
        login(response.data.token, response.data.user);

        if (response.data.user.role === "admin") {
          navigate("/admin/productlist");
        } else {
          navigate("/");
        }
      } else {
        setError("Respons dari server tidak valid.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Email atau password salah. Silakan coba lagi.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950 font-sans">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Right side - Login form */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex justify-center lg:justify-start items-center pt-8 lg:pt-20">
          <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-medium lg:pl-20">
            Login
          </h2>
        </div>

        <div className="px-6 sm:px-12 lg:px-20 max-w-md mx-auto lg:mx-0">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl p-3 focus:outline-none focus:border-gray-500 transition-colors"
                value={formData.email}
                onChange={handleChange}
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
                  className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl p-3 pr-12 focus:outline-none focus:border-gray-500 transition-colors"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Error message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

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
              disabled={loading}
              className="w-full bg-black text-white rounded-xl sm:rounded-2xl p-3 mt-6 hover:bg-gray-800 transition-colors font-medium"
            >
              {loading ? "Loading..." : "Login"}
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
