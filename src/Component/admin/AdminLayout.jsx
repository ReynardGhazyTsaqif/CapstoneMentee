import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
        </div>
      </div>

      
      <Footer />
    </div>
  );
}
