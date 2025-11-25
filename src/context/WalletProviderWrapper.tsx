
import React from "react";
import { useAuth } from "./AuthContext";
import { WalletProvider } from "./WalletContext";

export const WalletProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Splash screen
  }

  return <WalletProvider>{children}</WalletProvider>;
};

