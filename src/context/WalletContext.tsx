// context/WalletContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import apiClient from "@/lib/apiClient";
import { useAuth } from "./AuthContext";

// Define the shape of a transaction
interface Transaction {
  id: number;
  type?: string;
  amount: number;
  date?: string;
  status?: string;
  description?: string;
}

// Define the shape of the context's value
interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
  refetchWallet: () => void;
}

// Create the context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Define the props for the provider component
interface WalletProviderProps {
  children: ReactNode;
}

// Create the provider component that will wrap your app
export const WalletProvider = ({ children }: WalletProviderProps) => {
  const { user } = useAuth(); // Get user from AuthContext
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Define the function to fetch wallet data
  const fetchWallet = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setBalance(0);
      setTransactions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.get("/wallets/me");
      const data = res.data;
      setBalance(data.balance || 0);
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching wallet data in context:", error);
      setBalance(0); // Reset on error
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [user]); // Re-run this function only when the user object changes

  // Fetch data automatically when the user logs in or out
  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  // The value provided to consuming components
  const value = {
    balance,
    transactions,
    loading,
    refetchWallet: fetchWallet, // Expose a way to manually refetch
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
