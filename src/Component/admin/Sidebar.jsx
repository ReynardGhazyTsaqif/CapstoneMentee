import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  ChartColumnIncreasing,
  Package,
  PieChartIcon,
  Users,
  LayoutGrid
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
    { to: "/admin/category", icon: <LayoutGrid />, label: "Category Management" },
  ];

  return (
    <>
      {/* Toggle Button - Hanya muncul di layar kecil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#090C47] text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen bg-[#090C47] text-white overflow-y-auto z-40 transition-all duration-300 ease-in-out
          
          /* Desktop - tetap sama seperti sebelumnya */
          md:w-[20.8333%] md:p-5 md:space-y-4
          
          /* Mobile - width lebih kecil untuk mode tertutup dan terbuka */
          ${isOpen ? 'w-64 p-5 space-y-4' : 'w-16 p-2 space-y-2'}
        `}
      >
        {/* Header/Title */}
        <div className="flex justify-center mt-3 items-center gap-3 mb-8 uppercase">
          {/* Desktop: Tampilkan judul Shoezy */}
          <p className="hidden md:block text-3xl font-bold text-gray-300 tracking-wider">
            Shoezy
          </p>
          
          {/* Mobile: Tampilkan icon menu atau judul berdasarkan state */}
          <div className="md:hidden flex items-center justify-center w-full">
            {isOpen ? (
              <p className="text-xl font-bold text-gray-300 tracking-wider">
                Shoezy
              </p>
            ) : (
              <Menu size={20} className="text-gray-300" />
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className={`font-semibold ${isOpen ? 'space-y-4' : 'space-y-2'}`}>
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center transition-colors duration-300 rounded-lg ${
                  isActive ? "bg-black" : "hover:bg-black"
                } ${
                  isOpen 
                    ? 'space-x-3 px-4 py-4' 
                    : 'justify-center p-3 md:space-x-3 md:justify-start md:px-4 md:py-4'
                }`
              }
              title={!isOpen ? item.label : ''}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {/* Tampilkan label hanya jika terbuka di mobile atau selalu di desktop */}
              <span className={`truncate ${isOpen ? 'block' : 'hidden md:block'}`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}