import {
  HelpCircle,
  Wallet,
  Activity,
  User,
  Rocket,
  DollarSign,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  onLogout: () => void;
  onSelectSection: (section: string) => void;
  cashBalance: number;
}

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  onLogout,
  onSelectSection,
  cashBalance,
}) => {
  const handleSelect = (section: string) => {
    onSelectSection(section);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay
        <motion.div
          key="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Drawer Content */}
          <motion.div
            key="drawer"
            className="fixed top-0 left-0 h-full w-[85%] bg-white shadow-2xl overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
              </div>

              {/* Top Buttons: Help, Wallet, Activity */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => handleSelect("help")}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <HelpCircle className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Help</span>
                </button>
                <button
                  onClick={() => handleSelect("wallet")}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <Wallet className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Wallet</span>
                </button>
                <button
                  onClick={() => handleSelect("activity")}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <Activity className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Activity</span>
                </button>
              </div>

              {/* Uber Cash / Wallet Balance */}
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="font-medium text-gray-700">Wallet</span>

                <span className="font-semibold text-gray-900">
                  KES {cashBalance.toFixed(2)}
                </span>
              </div>

              {/* Main Links */}
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
              </div>
            </div>

            {/* Sign Out */}
            <div className="absolute bottom-0 left-0 w-full p-6 border-t bg-white">
              <button
                onClick={onLogout}
                className="w-full text-center text-red-600 font-semibold py-3 rounded-lg hover:bg-red-50 transition"
              >
                Sign out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuDrawer;
