// src/pages/auth/RequestPasswordReset.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MailIcon, Loader2 } from "lucide-react";
import apiClient from "@/lib/apiClient";

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      await apiClient.post("/auth/password-reset/request", email);
      toast.success("Password reset OTP sent to your email");
      navigate("/auth/password-reset/confirm");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden font-lexend">
      {/* Background Circle (Desktop only) */}
      <div
        className="hidden lg:block absolute top-[-10%] right-[48%] h-[2000px] w-[2000px]
                -translate-y-1/2 rounded-full bg-gradient-to-br from-breezo-orange to-breezo-green-light opacity-90 z-0"
      ></div>

      {/* Password Reset Form Section */}
      <div className="relative w-full flex-grow flex items-center justify-center p-8 lg:order-2 lg:w-1/2 z-10 bg-white/90 backdrop-blur-sm">
        <form
          onSubmit={handleRequest}
          className="flex flex-col items-center justify-center w-full max-w-sm bg-white p-6 lg:p-10 rounded-none shadow-lg lg:shadow-xl border border-gray-100"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10 uppercase tracking-wide font-lexend text-center">
            Reset Password
          </h2>

          {/* Email Input */}
          <div className="w-full mb-6">
            <label className="text-gray-700 text-sm font-bold mb-1 block font-lexend">
              Email
            </label>
            <div className="flex items-center border-2 border-gray-800 rounded-none focus-within:border-breezo-orange transition-all bg-gray-50 hover:bg-gray-100">
              <MailIcon className="ml-3 text-gray-600" size={20} />
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-lexend w-full px-3 py-3 outline-none font-semibold text-gray-900 placeholder-gray-500 bg-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 flex items-center justify-center gap-2 
                          ${
                            loading
                              ? "bg-breezo-orange/70 cursor-not-allowed"
                              : "bg-breezo-orange hover:bg-breezo-orange-dark"
                          }
                          text-white uppercase font-extrabold rounded-none tracking-wider shadow-md
                          hover:shadow-lg transition-all duration-300 font-lexend`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending...
              </>
            ) : (
              "Send Reset OTP"
            )}
          </button>

          {/* Extra Link */}
          <div className="mt-6 text-center text-sm font-lexend">
            <p>
              Remember your password?{" "}
              <Link
                to="/auth/login"
                className="text-breezo-green font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Illustration + Info Section */}
      <div
        className="relative w-full h-96 bg-breezo-orange lg:order-1 lg:w-1/2 lg:h-auto 
                         lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-center lg:p-12 z-10"
      >
        {/* Wave for Mobile */}
        <svg
          className="absolute top-0 left-0 w-full lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M1440,32L1200,42.7C960,53,720,75,480,80C240,85,0,75,0,75L0,0L1440,0Z"
          ></path>
        </svg>

        <div className="relative z-10 h-full w-full flex items-center justify-center p-4 lg:flex-col lg:gap-y-8">
          <div className="w-full max-w-md text-center">
            <h3 className="font-extrabold text-3xl mb-2 text-white lg:text-4xl lg:mb-4 font-lexend uppercase drop-shadow-md">
              Forgot Password?
            </h3>
            <p className="text-sm text-blue-50 font-lexend">
              No worries! Just enter your email and we'll send you an OTP to
              reset it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
