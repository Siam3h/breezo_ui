import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import TopNavbar from "@/components/dashboard/TopNavbar";
import RideForm from "@/components/dashboard/RideForm";
import DynamicUserMap from "@/components/dashboard/DynamicUserMap";
import Wallet from "./user_admin/Wallet";
import BusinessPortal from "@/components/dashboard/BusinessPortal";
import BikesList from "../bikes/BikesList";
import MobileMenuDrawer from "@/components/dashboard/MobileMenuDrawer";
import ManageAccount from "@/components/dashboard/Manage_Account";

const isAdminOrStaff = (role: string) =>
  role === "super_admin" || role === "staff";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const initialSection =
    user && isAdminOrStaff(user.role) ? "fleet_management" : "ride";
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (user && activeSection === "ride" && isAdminOrStaff(user.role)) {
      setActiveSection("fleet_management");
    }
  }, [user, activeSection]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  if (!user) {
    return <div>Loading dashboard...</div>;
  }

  const userRole = user.role;
  const userName = user.email
    ? user.email
        .split("@")[0]
        .split(".")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ")
    : "User Name";
  const cashBalance = 0.0;

  const renderContent = () => {
    if (isAdminOrStaff(userRole)) {
      switch (activeSection) {
        case "fleet_management":
          return (
            <div className="pt-4 pb-12 w-full">
              <BikesList />
            </div>
          );
        case "admin_dashboard":
        case "manage_account": // Admins need to manage account too
          return (
            <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg w-full h-full flex items-center justify-center">
              {`Admin Section: ${
                activeSection.charAt(0).toUpperCase() +
                activeSection.slice(1).replace("_", " ")
              }`}
            </div>
          );
        default:
          return (
            <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg w-full h-full flex items-center justify-center">
              {`Admin Section: ${
                activeSection.charAt(0).toUpperCase() +
                activeSection.slice(1).replace("_", " ")
              }`}
            </div>
          );
      }
    }
    // --- PERSONAL/BUSINESS RENDERING ---
    switch (activeSection) {
      case "ride":
        return (
          <div className="flex flex-col md:flex-row h-full">
            <RideForm />
            <DynamicUserMap />
          </div>
        );

      case "wallet":
      case "activity": // Handled by drawer
      case "help": // Handled by drawer
        return <Wallet />; // Wallet tab is primary for financial info

      case "business_portal":
        return <BusinessPortal userRole={userRole} />;

      // New/Renamed Personal Tabs Rendering
      case "student":
      case "promos":
        return (
          <div className="p-8 bg-white shadow rounded-lg h-full flex items-center justify-center">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1).replace("_", " ")}{" "}
                Page
              </h2>
              <p className="text-gray-600">
                This content is for the {activeSection.replace("_", " ")}{" "}
                section.
              </p>
            </div>
          </div>
        );
      case "manage_account":
        return <ManageAccount />;
      case "home": // For mobile drawer compatibility
        return (
          <div className="p-8 bg-white shadow rounded-lg h-full flex items-center justify-center">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSection.charAt(0).toUpperCase() +
                  activeSection.slice(1).replace("_", " ")}{" "}
                Page
              </h2>
              <p className="text-gray-600">
                This content is for the {activeSection.replace("_", " ")}{" "}
                section.
              </p>
            </div>
          </div>
        );

      default:
        // Fallback
        return (
          <div className="p-8 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
            {`Welcome to the ${
              activeSection.charAt(0).toUpperCase() + activeSection.slice(1)
            } Section.`}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <TopNavbar
        activeSection={activeSection}
        onSelect={handleSelectSection}
        userEmail={user.email || "user@example.com"}
        userName={userName}
        onLogout={handleLogout}
        userRole={userRole}
        isMobileMenuOpen={isMobileMenuOpen} // ✅ NEW
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userName={userName}
        userEmail={user.email || "user@example.com"}
        onLogout={handleLogout}
        onSelectSection={handleSelectSection}
        cashBalance={cashBalance}
      />

      {/* Main Content Area: Padding is adjusted to avoid being hidden by TopNavbar */}
      {/* h-full allows content scrolling inside the main element */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 md:pt-24 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;
