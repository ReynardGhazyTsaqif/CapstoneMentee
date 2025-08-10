import { Heart, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-black text-white h-22 flex items-center justify-end px-6 space-x-6">
      <Heart className="w-5 h-5 cursor-pointer" />
      <ShoppingCart className="w-5 h-5 cursor-pointer" />
      <User className="w-5 h-5 cursor-pointer" />
    </div>
  );
}
