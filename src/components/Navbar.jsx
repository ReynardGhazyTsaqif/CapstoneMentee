import SearchField from "./SearchField";
import MenuIcons from "./menuicons";

export default function Navbar() {
  return (
    // Ini adalah pembungkus utama dari navbar di Homepage Anda
    // Kita gunakan <nav> untuk semantik yang lebih baik
    <nav className="flex justify-between items-center w-full">
      {/* Bagian Kiri: Nama Brand */}
      <div className="hidden md:block">
        <h1 className="text-white text-4xl font-bold">SHOEZY</h1>
      </div>

      {/* Bagian Tengah: SearchField */}
      <SearchField />

      {/* Bagian Kanan: MenuIcons */}
      <MenuIcons />
    </nav>
  );
}
