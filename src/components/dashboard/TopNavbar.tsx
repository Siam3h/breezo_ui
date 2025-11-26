// components/dashboard/TopNavbar.tsx

import { useState, useEffect, useRef } from "react";
import {
  LogOut,
  WalletIcon,
  ChevronDown,
  Bike,
  Key,
  List,
  LayoutDashboard,
  Settings,
  BookOpen,
  Gift,
  Menu,
  X,
} from "lucide-react";

interface TopNavbarProps {
  activeSection: string;
  onSelect: (section: string) => void;
  userEmail: string;
  userName: string;
  onLogout: () => void;
  userRole: string;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

const isAdminOrStaff = (role: string) =>
  role === "super_admin" || role === "staff";

const navItems = (role: string) => {
  if (role === "personal" || role === "minor") {
    return [
      { name: "Wallet", icon: WalletIcon, section: "wallet" },
      { name: "Ride", icon: Bike, section: "ride" },
      { name: "Student", icon: BookOpen, section: "student" },
      { name: "Promos", icon: Gift, section: "promos" },
      { name: "Manage Account", icon: Settings, section: "manage_account" },
    ];
  }
  if (isAdminOrStaff(role)) {
    return [
      { name: "Dashboard", icon: LayoutDashboard, section: "admin_dashboard" },
      { name: "Fleet", icon: List, section: "fleet_management" },
      { name: "Manage Account", icon: Settings, section: "manage_account" },
    ];
  }
  if (role === "business_admin") {
    return [
      { name: "Wallet", icon: WalletIcon, section: "wallet" },
      { name: "Ride", icon: Bike, section: "ride" },
      { name: "Business", icon: Key, section: "business_portal" },
      { name: "Manage Account", icon: Settings, section: "manage_account" },
    ];
  }
  return [];
};

const TopNavbar = ({
  activeSection,
  onSelect,
  userEmail,
  userName,
  onLogout,
  userRole,
  onToggleMobileMenu,
  isMobileMenuOpen,
}: TopNavbarProps) => {
  const currentActive =
    activeSection === "dashboard" || !activeSection ? "ride" : activeSection;
  const visibleNavItems = navItems(userRole);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 font-lexend">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="flex items-center cursor-pointer"
          onClick={() =>
            onSelect(isAdminOrStaff(userRole) ? "fleet_management" : "ride")
          }
        >
          <img src="/logo4.png" alt="Company Logo" className="h-8 w-auto" />
        </div>

        <nav className="hidden md:flex flex-1 justify-center space-x-1">
          {visibleNavItems
            .filter((item) => item.section !== "manage_account")
            .map((item) => {
              const isActive = currentActive === item.section;
              return (
                <button
                  key={item.name}
                  onClick={() => onSelect(item.section)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-breezo-green text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {/* --- START: DROPDOWN MENU --- */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="w-8 h-8 bg-breezo-orange rounded-full flex items-center justify-center font-semibold text-white text-sm">
                  {userEmail?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                    {userEmail}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userRole.replace("_", " ")}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 hidden lg:block transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border py-1 z-10">
                  <button
                    onClick={() => {
                      onSelect("manage_account");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Manage Account</span>
                  </button>
                </div>
              )}
            </div>
            {/* --- END: DROPDOWN MENU --- */}

            {/* --- START: RE-INTRODUCED LOGOUT BUTTON --- */}
            <button
              onClick={onLogout}
              className="bg-breezo-green text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-breezo-orange transition-colors flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            {/* --- END: RE-INTRODUCED LOGOUT BUTTON --- */}
          </div>

          <button className="md:hidden p-2" onClick={onToggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
