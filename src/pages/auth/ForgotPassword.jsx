export default function ForgotPassword() {
  return (
    <>
      <div className="flex flex-row-reverse w-full h-screen bg-gray-950 ">
        <div className=" bg-white w-3/4 md:w-2/3 h-full rounded-tl-2xl rounded-bl-2xl">
          <div className="flex mx-auto items-center mt-20">
            <h1 className="text-black pl-20 text-4xl mb-6 md:text-2xl font-medium">
              Reset Password
            </h1>
          </div>
          <div>
            <form>
              <h2 className="pr-2 mt-4 ml-20 font-medium">Password Baru</h2>
              <input
                type="text"
                placeholder="masukan password"
                className="w-3/5 border-2 border-gray-300 rounded-2xl p-2 mt-2 ml-20"
              ></input>
              <h2 className="pr-2 mt-4 ml-20 font-medium">
                Konfirmasi Password
              </h2>
              <input
                type="text"
                placeholder="masukan konfirmasi password"
                className="w-3/5 border-2 border-gray-300 rounded-2xl p-2 mt-2 ml-20 block"
              ></input>

              <br />
              <button className="bg-black text-white w-3/5 rounded-2xl p-2 mt-4 ml-20 cursor-pointer">
                Simpan Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
