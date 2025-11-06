import { MailIcon } from "lucide-react";
import { FaLock } from "react-icons/fa";
import PatternDivider from "@/components/Patterns";

export default function ResponsiveLoginPageWithIllustration() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden font-lexend">
        {/* Background Circle (Desktop only) */}
        <div
          className="hidden lg:block absolute top-[-10%] right-[48%] h-[2000px] w-[2000px]
          -translate-y-1/2 rounded-full bg-gradient-to-br from-breezo-orange to-breezo-green-light opacity-90 z-0"
        ></div>

        {/* Login Form Section */}
        <div className="relative w-full flex-grow flex items-center justify-center p-8 lg:order-2 lg:w-1/2 z-10 bg-white/90 backdrop-blur-sm">
          <form className="flex flex-col items-center justify-center w-full max-w-sm bg-white p-6 lg:p-10 rounded-none shadow-lg lg:shadow-xl border border-gray-100">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 uppercase tracking-wide font-lexend text-center">
              Sign In
            </h2>

            {/* Email Input */}
            <div className="w-full mb-5">
              <label className="text-gray-700 text-sm font-bold mb-1 block font-lexend">
                Email
              </label>
              <div className="flex items-center border-2 border-gray-800 rounded-none focus-within:border-breezo-orange transition-all bg-gray-50 hover:bg-gray-100">
                <MailIcon className="ml-3 text-gray-600" size={20} />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="font-lexend w-full px-3 py-3 outline-none font-semibold text-gray-900 placeholder-gray-500 bg-transparent"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="w-full mb-6">
              <label className="text-gray-700 text-sm font-bold mb-1 block font-lexend">
                Password
              </label>
              <div className="flex items-center border-2 border-gray-800 rounded-none focus-within:border-breezo-orange transition-all bg-gray-50 hover:bg-gray-100">
                <FaLock className="ml-3 text-gray-600" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full font-lexend px-3 py-3 outline-none font-semibold text-gray-900 placeholder-gray-500 bg-transparent"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-40 h-12 bg-breezo-orange text-white uppercase font-extrabold rounded-none tracking-wider shadow-md
                         hover:bg-breezo-orange-dark hover:shadow-lg transition-all duration-300 font-lexend"
            >
              Login
            </button>
          </form>
        </div>

        {/* Pattern Divider (Visible only on Mobile) */}
        <div className="block lg:hidden w-full">
          <PatternDivider />
        </div>

        {/* Illustration + Signup Section */}
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

          {/* Text + Illustration */}
          <div
            className="relative z-10 h-full w-full flex flex-row items-center justify-center p-4 gap-x-2
                        lg:flex-col lg:items-center lg:justify-center lg:gap-y-8"
          >
            {/* Text */}
            <div className="w-1/2 text-left lg:w-full lg:max-w-md lg:text-center">
              <h3 className="font-extrabold text-2xl mb-2 text-white lg:text-4xl lg:mb-4 font-lexend uppercase drop-shadow-md">
                New here?
              </h3>
              <p className="text-sm text-blue-50 mb-4 lg:mb-8 font-lexend">
                Create your account and explore all the features waiting for you.
              </p>
              <button className="bg-transparent border-2 border-white w-36 h-11 font-semibold text-sm rounded-none text-white 
                                hover:bg-white hover:text-breezo-green transition-colors lg:text-base font-lexend">
                Sign Up
              </button>
            </div>

            {/* Illustration */}
            <div className="w-1/2 max-w-[180px] lg:w-full lg:max-w-md">
              <div className="w-full h-full lg:h-64 flex items-center justify-center">
                <img
                  src="/login_illustrator.svg"
                  alt="Login Illustration"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
