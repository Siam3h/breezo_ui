import { useState } from "react";
import {
  Home,
  Settings,
  Folder,
  LogOut,
  Menu,
  X,
  BarChart3,
  Users,
  Car,
  LocateIcon
} from "lucide-react";

interface SidebarProps {
  onSelect: (section: string) => void;
  role: string; 
}

const Sidebar = ({ onSelect, role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const allNavItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, section: "dashboard", roles: ["super_admin","staff","business_admin", "personal"] },
    { name: "Rides", icon: <Car className="w-5 h-5" />, section: "rides", roles: ["business_employee", "personal", "minor"] },
    { name: "Total Rides", icon: <BarChart3 className="w-5 h-5" />, section: "total_rides", roles: ["super_admin", "staff"] },
    { name: "Users", icon: <Users className="w-5 h-5" />, section: "users", roles: ["super_admin", "business_admin", "personal"] },
    { name: "Locations", icon: <LocateIcon className="w-5 h-5" />, section: "projects", roles: ["super_admin", "staff"] },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, section: "settings", roles: ["super_admin", "staff", "business_admin", "personal", "minor", "business_employee"] },
  ];


  const visibleNavItems = allNavItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {visibleNavItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onSelect(item.section);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-2 w-full text-left rounded-lg hover:bg-gray-700 transition"
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black mb-15 opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;

