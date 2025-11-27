"use client";

import React, { useState, useEffect } from "react";
import { User, Bell, Trash2, Lock, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { subscriptionPlans, SubscriptionPlan } from "@/lib/subscriptionPlans";

const ManageAccount = () => {
  const { user, logout } = useAuth();

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!user) return;
    const userPlanId = (user as any).planId || "pay-per-ride";
    const plan =
      subscriptionPlans.find((p) => p.id === userPlanId) ||
      subscriptionPlans[0];
    setCurrentPlan(plan);
  }, [user]);

  if (!user) return <p>Loading user info...</p>;

  // Profile picture handler
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Change password validation + handler
  const handlePasswordSubmit = () => {
    setPasswordError("");

    if (
      !passwordForm.current ||
      !passwordForm.newPass ||
      !passwordForm.confirm
    ) {
      return setPasswordError("All fields are required.");
    }
    if (passwordForm.newPass.length < 6) {
      return setPasswordError("New password must be at least 6 characters.");
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      return setPasswordError("Passwords do not match.");
    }

    alert("Password updated successfully! (Replace this with backend call)");
    setShowPasswordModal(false);

    setPasswordForm({ current: "", newPass: "", confirm: "" });
  };

  return (
    <>
      {/* Account Container */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8 font-lexend">
        {/* Profile Section */}
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-300 group">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                <User className="w-12 h-12" />
              </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer">
              <span className="flex items-center gap-1">Edit</span>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {user.email.split("@")[0]}
            </h2>
            <p className="text-gray-500">{user.email}</p>

            <button
              className="hidden md:block text-blue-500 text-sm mt-1"
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>('input[type="file"]')
                  ?.click()
              }
            >
              Click here to edit your profile picture
            </button>
          </div>
        </div>

        {/* Subscription Plan */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Subscription Plan</h3>
          <select
            value={currentPlan?.id || ""}
            onChange={(e) =>
              setCurrentPlan(
                subscriptionPlans.find((p) => p.id === e.target.value) || null
              )
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            {subscriptionPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.title} — {plan.price}
              </option>
            ))}
          </select>
        </div>

        {/* Settings */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Account Settings</h3>

          {/* Notifications */}
          <div
            className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-500" />
              <span>Notifications</span>
            </div>
            <div
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                notificationsEnabled ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  notificationsEnabled ? "translate-x-5" : ""
                }`}
              />
            </div>
          </div>

          {/* Change Password */}
          <div
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer hover:bg-gray-200 transition"
          >
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-gray-500" />
              <span>Change Password</span>
            </div>
            <span className="hidden md:block text-gray-500 text-sm">
              Update your password
            </span>
          </div>

          {/* Delete Account */}
          <div
            onClick={() => {
              if (confirm("Are you sure you want to delete your account?"))
                logout();
            }}
            className="flex items-center justify-between bg-red-100 p-3 rounded cursor-pointer hover:bg-red-200 transition"
          >
            <div className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="text-red-600">Delete Account</span>
            </div>
            <span className="text-red-600 text-sm">Danger</span>
          </div>
        </div>
      </div>

      {/* ---------------------------- PASSWORD MODAL ---------------------------- */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 relative animate-fadeInUp">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold">Change Password</h2>

            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 border rounded"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, current: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border rounded"
                value={passwordForm.newPass}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPass: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirm: e.target.value })
                }
              />
            </div>

            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* Tailwind Animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn .2s ease-out }
        .animate-fadeInUp { animation: fadeInUp .25s ease-out }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </>
  );
};

export default ManageAccount;
