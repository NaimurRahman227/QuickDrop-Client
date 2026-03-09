import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MobileMenu from "./components/MobileMenu";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;