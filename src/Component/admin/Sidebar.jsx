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
      "
    >
      {/* Profile */}
      <div className="flex justify-center mt-3 items-center gap-3 mb-8 uppercase">
        <p className="text-3xl font-bold text-gray-300 tracking-wider">
          Shoezy
        </p>
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
