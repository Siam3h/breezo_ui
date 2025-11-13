import { useState } from "react";
import {
  Home,
  Settings,
  Folder,
  LogOut,
  Menu, // Keep Menu
  X, // Keep X
  BarChart3,
  Users,
  Car,
  LocateIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import logo_white from "/white_logo.png";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onSelect: (section: string) => void;
  role: string;
}

const Sidebar = ({ onSelect, role }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const allNavItems = [
    // ... your nav items (omitted for brevity)
    {
      name: "Dashboard",
      icon: Home,
      section: "dashboard",
      roles: ["super_admin", "staff", "business_admin", "personal"],
    },
    {
      name: "Rides",
      icon: Car,
      section: "rides",
      roles: ["business_employee", "personal", "minor"],
    },
    {
      name: "Total Rides",
      icon: BarChart3,
      section: "total_rides",
      roles: ["super_admin", "staff"],
    },
    {
      name: "Users",
      icon: Users,
      section: "users",
      roles: ["super_admin", "business_admin", "personal"],
    },
    {
      name: "Locations",
      icon: LocateIcon,
      section: "projects",
      roles: ["super_admin", "staff"],
    },
    {
      name: "Settings",
      icon: Settings,
      section: "settings",
      roles: [
        "super_admin",
        "staff",
        "business_admin",
        "personal",
        "minor",
        "business_employee",
      ],
    },
  ];

  const visibleNavItems = allNavItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <>
      {/* 
        1. Mobile Toggle Button (Hamburger/Cross)
        - Class: 'md:hidden' ensures it's only visible on mobile.
        - Position: 'fixed top-4 right-4' places it on the top right.
        - Logic: Uses the 'isOpen' state to dynamically switch between <Menu /> and <X />.
        - Z-index: z-[60] to ensure it's above the sidebar and overlay.
      */}
      <button
        className="fixed top-4 right-4 z-[60] bg-breezo-green text-white p-2 rounded-lg shadow-lg md:hidden transition-transform duration-300"
        onClick={() => setIsOpen(!isOpen)} // Toggle open/close
      >
        {/* Dynamic Icon Logic */}
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* 
        2. Sidebar
        - Visibility: Uses 'transform' classes controlled by 'isOpen'.
        - Desktop: 'md:translate-x-0' keeps it visible on desktop (≥ 768px).
        - Mobile: 'translate-x-0' when open, '-translate-x-full' when closed.
        - Z-index: z-50 to be above the main content and overlay.
      */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#101010] text-white transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out z-50 shadow-lg`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-[#141414]">
          <img src={logo_white} alt="Breezo Logo" className="h-8" />

          {/* Internal close button can be removed, but is kept for extra UX */}
          {/* <button
            className="md:hidden text-gray-400 hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button> */}
        </div>

        {/* Nav Section (content remains the same) */}
        <nav className="flex-1 p-4 space-y-2 font-montserrat">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;

            return (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveSection(item.section);
                  onSelect(item.section);
                  setIsOpen(false); // Close sidebar after selecting a link on mobile
                }}
                className={`flex items-center gap-3 p-3 w-full text-left rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-breezo-green text-[#101010] font-semibold"
                    : "hover:bg-breezo-orange/20 hover:text-breezo-orange"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-[#101010]" : "text-breezo-green"
                  }`}
                />
                <span>{item.name}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.03 }}
            className="w-full bg-breezo-orange py-2 rounded-xl font-semibold text-[#101010] hover:bg-breezo-orange/90 flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-5 h-5" /> Logout
          </motion.button>
        </div>
      </aside>

      {/* 
        3. Overlay for mobile
        - Class: 'md:hidden' ensures it's only active on mobile.
        - Condition: Only rendered when 'isOpen' is true.
        - Z-index: z-40 to be below the sidebar and toggle button.
      */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
