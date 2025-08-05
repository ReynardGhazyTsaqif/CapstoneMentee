import SearchField from "./SearchField";
import MenuIcons from "./menuicons";

export default function Navbar() {
  return (
    <>
      <nav className="flex flex-row justify-between items-center bg-black p-4">
        <h1 className="text-white text-2xl hidden md:flex">BrandName</h1>
        <SearchField />
        <MenuIcons />
      </nav>
    </>
  );
}
