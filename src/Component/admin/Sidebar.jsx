import { NavLink } from "react-router-dom";
import {
  Search,
  Home,
  ChartColumnIncreasing,
  Package,
  PieChartIcon,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { to: "/admin/dashboard", icon: <Home />, label: "Dashboard" },
    {
      to: "/admin/products",
      icon: <ChartColumnIncreasing />,
      label: "Produk Management",
    },
    { to: "/admin/orders", icon: <Package />, label: "Order Management" },
    { to: "/admin/analytics", icon: <PieChartIcon />, label: "Analytics" },
    { to: "/admin/users", icon: <Users />, label: "Users Management" },
  ];

  return (
    <nav
      className="
        fixed top-0 left-0 h-screen 
        w-[20.8333%] bg-[#090C47] 
        text-white p-5 space-y-4
        overflow-y-auto
        md:relative md:h-auto
      "
    >
      {/* Profile */}
      <div className="flex flex-row mt-3 items-center gap-3 mb-8">
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

      {/* Search */}
      <div className="relative w-full text-black rounded-xl pr-4 mb-8">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-15 pr-4 py-4 border bg-white placeholder-gray-400 rounded-2xl focus:outline-none"
        />
      </div>

      {/* Menu */}
      <div className="space-y-4 font-semibold">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-2 pl-5 py-5 p-2 rounded transition-colors duration-300 ${
                isActive ? "bg-black" : "hover:bg-black"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
