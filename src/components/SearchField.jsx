import { useNavigate } from "react-router-dom";

export default function SearchField() {
  // 2. Inisialisasi hook navigate
  const navigate = useNavigate();

  // 3. Buat fungsi untuk menangani event submit form
  const handleSearchSubmit = (event) => {
    // 4. Mencegah form dari perilaku default (reload halaman)
    event.preventDefault();

    // Di sini Anda bisa mengambil nilai dari input jika perlu, contoh:
    // const searchTerm = event.target.elements.search.value;
    // console.log("Mencari:", searchTerm);

    // 5. Arahkan pengguna ke halaman /kategori
    navigate("/kategori");
  };
  return (
    <>
      <form
        onSubmit={handleSearchSubmit}
        className="w-full md:w-auto flex justify-center"
      >
        <input
          type="text"
          name="search" // tambahkan name untuk akses yang lebih mudah di handler
          placeholder="Search..."
          className="w-9/12 md:w-80 lg:w-150 bg-transparent border-gray-400 rounded-full border p-2 text-white placeholder-gray-300 focus:outline-none focus:border-white transition-all"
        />
      </form>
    </>
  );
}
