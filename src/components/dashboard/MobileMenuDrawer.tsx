// components/dashboard/MobileMenuDrawer.tsx

import React from "react";
import {
  HelpCircle,
  Wallet,
  Bike,
  User,
  Rocket,
  BookOpen,
  CreditCard,
  LogOut, // Import LogOut icon for consistency
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@/context/WalletContext";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  onLogout: () => void;
  onSelectSection: (section: string) => void;
}

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  onLogout,
  onSelectSection,
}) => {
  const { balance } = useWallet();

  const handleSelect = (section: string) => {
    onSelectSection(section);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="drawer"
            className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-24">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {userName}
                </h1>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => handleSelect("support")}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <HelpCircle className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Support</span>
                </button>
                <button
                  onClick={() => handleSelect("wallet")}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <Wallet className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Transactions</span>
                </button>
                <button
                  onClick={() => handleSelect("rides")}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <Bike className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Rides</span>
                </button>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">Wallet</span>
                <span className="font-semibold text-gray-900">
                  KES {balance.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <button
                  onClick={() => handleSelect("manage_account")}
                  className="flex items-center gap-4 w-full text-left py-2 hover:text-gray-800 transition"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-base">Manage account</span>
                </button>

                <button
                  onClick={() => handleSelect("promos")}
                  className="flex items-center gap-4 w-full text-left py-2 hover:text-gray-800 transition"
                >
                  <Rocket className="w-5 h-5 text-gray-600" />
                  <span className="text-base">Promotions</span>
                </button>

                <button
                  onClick={() => handleSelect("student")}
                  className="flex items-center gap-4 w-full text-left py-2 hover:text-gray-800 transition"
                >
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  <span className="text-base">Student Perks</span>
                </button>

                <button
                  onClick={() => handleSelect("manage_plan")}
                  className="flex items-center gap-4 w-full text-left py-2 hover:text-gray-800 transition"
                >
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="text-base">Manage Plan</span>
                </button>
              </div>
            </div>

            {/* --- START: MODIFIED SIGN OUT BUTTON --- */}
            <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-white">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 bg-breezo-green text-white font-semibold py-3 rounded-lg hover:bg-breezo-orange transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
            {/* --- END: MODIFIED SIGN OUT BUTTON --- */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;
