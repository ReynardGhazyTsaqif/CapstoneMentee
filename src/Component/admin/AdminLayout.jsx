import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama */}
      <div className="md:ml-[20.8333%] ml-16 flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Body */}
        <div className="flex-1">{children}</div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
