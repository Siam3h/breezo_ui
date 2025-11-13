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
  isMobileMenuOpen: boolean; // ✅ added
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

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left Side: Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() =>
            onSelect(isAdminOrStaff(userRole) ? "fleet_management" : "ride")
          }
        >
          <img src="/logo4.png" alt="Company Logo" className="h-8 w-auto" />
        </div>

        {/* Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex flex-1 justify-center space-x-1">
          {visibleNavItems
            .filter((item) => item.section !== "manage_account")
            .map((item) => {
              const isActive = currentActive === item.section;
              return (
                <button
                  key={item.name}
                  onClick={() => onSelect(item.section)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium text-sm rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
        </nav>

        {/* Right Side: Logout (Desktop) / Hamburger (Mobile) */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center font-semibold text-white text-sm">
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
              <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
            </div>

            <button
              onClick={onLogout}
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile: Hamburger / Close Icon */}
          <button
            className="md:hidden p-2 transition-transform duration-200"
            onClick={onToggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
