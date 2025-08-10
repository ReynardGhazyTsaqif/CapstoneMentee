import Sidebar from "./Sidebar";
import Navbar from "./navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}
