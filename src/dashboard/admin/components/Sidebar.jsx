import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Bike, Package, LogOut } from "lucide-react";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-black text-white p-6 flex flex-col justify-between">

      {/* TOP PART */}
      <div>

        <h1 className="text-2xl font-bold mb-8 card-hover">
          QuickDrop Admin
        </h1>

        <nav className="space-y-4">

          <NavLink
            to="/dashboard/admin"
            className="flex items-center gap-2 hover:text-yellow-400 card-hover"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className="flex items-center gap-2 hover:text-yellow-400 card-hover"
          >
            <Users size={18} />
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/riders"
            className="flex items-center gap-2 hover:text-yellow-400 card-hover"
          >
            <Bike size={18} />
            Manage Riders
          </NavLink>

          <NavLink
            to="/dashboard/admin/parcels"
            className="flex items-center gap-2 hover:text-yellow-400 card-hover"
          >
            <Package size={18} />
            Parcel Management
          </NavLink>

        </nav>

      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-400 hover:text-red-500 card-hover"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;