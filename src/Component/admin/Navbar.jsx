import { Heart, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-black text-white h-20 flex items-center justify-end pr-10">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="d"
          alt="FotoAdmin"
        />
        <div className="leading-tight">
          <p className="font-semibold text-sm">Nama Admin</p>
          <p className="text-xs text-gray-300">Admin Shoezy</p>
        </div>
      </div>
    </div>
  );
}
