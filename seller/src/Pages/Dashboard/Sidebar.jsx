import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";
import logo from "../../assets/logo.svg";

const menu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/dashboard/products", icon: Package },
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", path: "/dashboard/customers", icon: Users },
  { name: "Analytics", path: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r hidden md:block">
      <div className="p-6 font-bold text-xl text-[#1260cc] relative">
        <img src={logo} />
        <span className="absolute bottom-4 left-40">Seller</span>
      </div>

      <nav className="px-4 space-y-1">
        {menu.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
