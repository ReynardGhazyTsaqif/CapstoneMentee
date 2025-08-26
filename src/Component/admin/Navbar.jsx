import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect ke halaman login setelah logout
  };

  return (
    <div className="bg-black text-white h-20 flex items-center justify-end pr-10 relative">
      {/* Avatar + Nama */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user?.avatar || "/default-avatar.png"}
          alt="FotoAdmin"
        />
        <div className="leading-tight">
          <p className="font-semibold text-sm">{user?.fullName || "Admin"}</p>
          <p className="text-xs text-gray-300">{user?.role || "Admin"}</p>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-16 right-10 bg-white text-black rounded-lg shadow-lg w-40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
