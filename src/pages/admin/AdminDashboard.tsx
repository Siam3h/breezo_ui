import Sidebar from "@/pages/admin/Sidebar";
import Wallet from "./user_admin/Wallet";
import { useAuth } from "@/context/AuthContext";
import AllRides from "../bikes/AdminAllRides";
import BikesList from "../bikes/BikesList";
import UserRides from "../bikes/UserRides";
import CreateMinor from "../auth/CreateMinor";
import InviteStaff from "./InviteStaff";
import { useState } from "react";

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

  return (
<div className="flex min-h-screen bg-gray-50">
      {/* Top Bar with user info */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 flex justify-between items-center p-4 md:ml-64">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user.email}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role.replace("_", " ")}</p>
            <p className="text-xs text-gray-500 capitalize">ID: {user.id}</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-semibold text-indigo-700">
            {user.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar onSelect={setActiveSection} role={userRole} />

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6 mt-16">{renderContent()}</main>
    </div>  );
};

export default AdminDashboard;

const DashboardSection = ({ userRole }) => (
  <div className="space-y-6">
  {(userRole == "personal" || userRole == "business_admin") &&   <Wallet />}
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

const UsersSection = ({userRole}) => (
  <div>
    {(userRole == "personal") && <CreateMinor />}
    {(userRole == "super_admin") && <InviteStaff />}
  </div>
);

