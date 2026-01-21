import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { handleLogout } = useAuth();

  const logout = () => {
    if (handleLogout()) {
      navigate("/seller/login");
    }
  };

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search products, orders..."
            className="px-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 relative">
        {/* Notification */}
        <button className="relative">
          🔔
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Seller"
              className="w-9 h-9 rounded-full border"
            />
            <span className="hidden md:block text-sm font-medium">Seller</span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={() => navigate("/dashboard/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/dashboard/settings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Settings
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
