import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";

const MobileMenu = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="relative bg-black text-white p-4">

      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-lg hover:text-blue-400 transition"
      >
        <Menu size={22} />
        Menu
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 mt-3 w-56 bg-white text-black rounded-xl shadow-2xl p-3 space-y-2 z-50">

          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition 
              ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
            }
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition 
              ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
            }
            onClick={() => setOpen(false)}
          >
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/riders"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition 
              ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
            }
            onClick={() => setOpen(false)}
          >
            Manage Riders
          </NavLink>

          <NavLink
            to="/dashboard/admin/parcels"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition 
              ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
            }
            onClick={() => setOpen(false)}
          >
            Parcel Management
          </NavLink>

          {/* DIVIDER */}
          <div className="border-t pt-2"></div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default MobileMenu;