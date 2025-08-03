export default function ForgotPassword() {
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
            <form className="mt-6 space-y-5">
              {/* Grup Password */}
              <div className="flex flex-col items-center md:items-start">
                <label
                  htmlFor="password"
                  className="mb-1 self-stretch text-center md:text-left"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="border-slate-200 md:w-3/4 w-5/6 border-2 rounded-2xl p-2"
                />
              </div>

              {/* Grup Konfirmasi Password */}
              <div className="flex flex-col items-center md:items-start">
                <label
                  htmlFor="confirm-password"
                  className="mb-1 self-stretch text-center md:text-left"
                >
                  Konfirmasi Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Masukkan konfirmasi password"
                  className="border-slate-200 md:w-3/4 w-5/6 border-2 rounded-2xl p-2"
                />
              </div>

              {/* Tombol Simpan */}
              <div className="pt-4 flex justify-center md:justify-start">
                <button
                  type="submit"
                  className="bg-black text-white md:w-3/4 w-5/6 rounded-2xl p-2.5 font-semibold cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  Simpan Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
