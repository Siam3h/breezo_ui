import Sidebar from "@/pages/admin/Sidebar";
import Wallet from "./user_admin/Wallet";
import { useAuth } from "@/context/AuthContext";
import AllRides from "../bikes/AdminAllRides";
import BikesList from "../bikes/BikesList";
import UserRides from "../bikes/UserRides";
import CreateMinor from "../auth/CreateMinor";
import InviteStaff from "./InviteStaff";
import { useState } from "react";
// --- START: MODIFICATION - Import necessary icons ---
import { Bell, ChevronDown } from "lucide-react";
// --- END: MODIFICATION ---

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");

  if (!user) {
    return <div>Loading dashboard...</div>;
  }

  const userRole = user.role;

  const renderContent = () => {
    switch (activeSection) {
      case "rides":
        return <RidesSection />;
      case "total_rides":
        return <TotalRidesSection />;
      case "users":
        return <UsersSection userRole={userRole} />;
      default:
        return <DashboardSection userRole={userRole} />;
    }
  };

  // --- START: MODIFICATION - Function to format the title ---
  const getHeaderTitle = (section) => {
    switch (section) {
      case "rides":
        return "My Rides";
      case "total_rides":
        return "Total Rides Overview";
      case "users":
        return "User Management";
      case "settings":
        return "Account Settings";
      default:
        return "Dashboard Overview";
    }
  };
  // --- END: MODIFICATION ---

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- START: MODIFICATION - Top Bar with user info --- */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 flex justify-between items-center px-4 py-3 md:py-4 md:ml-64 pr-20 md:pr-4">
        {/* Title (Now dynamic and more prominent) */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 transition-colors duration-300">
            {getHeaderTitle(activeSection)}
          </h1>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center space-x-3 md:space-x-6">
          {/* Optional: Notification Icon */}
          <button className="p-2 text-gray-500 hover:text-breezo-green rounded-full transition-colors duration-200 hidden sm:block">
            <Bell className="w-6 h-6" />
          </button>

          {/* User Profile Dropdown */}
          <div className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            {/* Avatar (Improved Styling) */}
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-700">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            {/* User Info (Hidden on small screens, simplified) */}
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                {user.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role.replace("_", " ")}
              </p>
            </div>

            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
          </div>
        </div>
      </div>
      {/* --- END: MODIFICATION - Top Bar with user info --- */}

      {/* Sidebar */}
      <Sidebar onSelect={setActiveSection} role={userRole} />

      {/* Main content */}
      {/* --- MODIFICATION - Increased mt-16 to mt-20 for header space --- */}
      <main className="flex-1 md:ml-64 p-6 mt-20">{renderContent()}</main>
    </div>
  );
};

export default AdminDashboard;

const DashboardSection = ({ userRole }) => (
  <div className="space-y-6">
    {(userRole == "personal" || userRole == "business_admin") && <Wallet />}
    {(userRole === "super_admin" || userRole === "staff") && <BikesList />}
  </div>
);

const RidesSection = () => (
  <div>
    <UserRides />
  </div>
);

const TotalRidesSection = () => (
  <div>
    <AllRides />
  </div>
);

const UsersSection = ({ userRole }) => (
  <div>
    {userRole == "personal" && <CreateMinor />}
    {userRole == "super_admin" && <InviteStaff />}
  </div>
);
