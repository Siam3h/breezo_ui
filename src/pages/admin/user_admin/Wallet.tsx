// Wallet.tsx (Reused from your provided code, assumes necessary imports)
import { useEffect, useState } from "react";
import { WalletIcon, ArrowDownCircle } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

interface Transaction {
  id: number;
  type?: string;
  amount: number;
  date?: string;
  status?: string;
  description?: string;
}

const Wallet = () => {
  const { user } = useAuth(); // ✅ destructure user from context
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await apiClient.get("/wallets/me");
        const data = res.data;
        console.log("transactions data", data);

        setBalance(data.balance || 0);
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const handleTopUp = async () => {
    const amount = parseFloat(prompt("Enter top-up amount (Ksh):") || "0");
    if (!amount || amount <= 0) return alert("Invalid amount");

    try {
      const email = user.email;
      const res = await apiClient.post("/wallets/fund/initiate", {
        amount,
        email,
      });

      const checkoutUrl = res.data.checkout_url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("Failed to get checkout URL. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating top-up:", error);
      alert("Failed to initiate wallet top-up.");
    }
  };

  if (loading) return <div className="p-6">Loading wallet...</div>;

  return (
    <div className="p-6 h-full">
      {" "}
      {/* Changed min-h-screen to h-full for better containment */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <WalletIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-blue-600 text-white rounded-xl p-6 mb-6 shadow-inner">
          <p className="text-sm uppercase opacity-80">Current Balance</p>
          <h2 className="text-3xl font-semibold mt-1">
            Ksh {balance.toFixed(2)}
          </h2>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleTopUp}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <ArrowDownCircle className="w-5 h-5" /> Top Up
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Recent Transactions
          </h3>

          {transactions.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-600 border-b">
                  <tr>
                    <th className="py-2">Description</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 capitalize">
                        {tx.description || tx.type}
                      </td>
                      <td
                        className={`py-2 ${
                          tx.amount < 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {tx.amount < 0 ? "-" : "+"}Ksh{" "}
                        {Math.abs(tx.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
