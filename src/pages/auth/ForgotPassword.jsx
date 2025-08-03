import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-950">
      {/* Left side - Dark background (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/3 bg-gray-950"></div>

      {/* Right side - Login form */}
      <div className="bg-white w-full lg:w-3/4 xl:w-2/3 min-h-screen lg:rounded-tl-2xl lg:rounded-bl-2xl">
        <div className="flex flex-col justify-center items-start px-4 sm:px-6 lg:px-20 pt-8 lg:pt-20">
          <h1 className="text-black text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Reset Password
          </h1>
          <p className="text-black text-sm sm:text-base lg:text-lg mb-5 pb-5 text-justify">
            Masukkan alamat email yang terkait dengan akun Anda dan kami akan
            mengirimkan tautan untuk memperbarui password Anda.
          </p>
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

            {/* Button Login */}
            <button
              type="submit"
              className="w-full bg-black text-white rounded-xl sm:rounded-2xl p-3 mt-6 hover:bg-gray-800 transition-colors font-medium"
            >
              Kirim Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
