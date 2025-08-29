
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090C47] text-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold">404</h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold">
          Halaman Tidak Ditemukan
        </p>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <Link
          to="/homepage"
          className="mt-6 inline-block px-6 py-3 bg-white text-[#023246] font-medium rounded-2xl shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
