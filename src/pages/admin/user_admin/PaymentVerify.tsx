import { useEffect } from "react";
import apiClient from "@/lib/apiClient";

const PaymentVerify = () => {
  useEffect(() => {
    const verifyPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get("reference");
      if (!reference) return;

      try {
        const res = await apiClient.get(`/wallets/fund/verify?reference=${reference}`);
        console.log(res.data);
        if (res.data.status === "success") {
          window.location.href = "/dashboard";
        } else {
          alert("Payment verification failed or is pending.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        alert("Payment verification failed.");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default PaymentVerify;

