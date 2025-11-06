import React from "react";
// Using a popular icon library like react-icons
import {
  FaUser,
  FaLock,
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";

export default function ResponsiveLoginPageWithIllustration() {
  // THE FIX: The opening parenthesis is now on the same line as 'return'.
  return (
    // Base layout is a vertical flex column. It becomes a row on large screens.
    <div className="relative min-h-screen w-full bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* --- The Desktop-Only Curve --- */}
      <div
        className="
          hidden lg:block
          content-[''] absolute top-[-10%] right-[48%] h-[2000px] w-[2000px]
          -translate-y-1/2 rounded-full bg-gradient-to-br from-breezo-green-dark to-breezo-green-light z-10
        "
      ></div>

      {/* --- Top Section (Mobile) / Right Column (Desktop) --- */}
      <div className="w-full flex-grow flex items-center justify-center p-8 lg:order-2 lg:w-1/2 lg:flex-grow-0 z-20">
        <form className="flex flex-col items-center justify-center w-full max-w-sm">
          <h2 className="text-4xl font-bold text-gray-700 mb-8">Sign in</h2>

          <div className="w-full h-14 bg-gray-100 rounded-full my-2.5 grid grid-cols-[15%_85%] px-2 items-center">
            <FaUser className="text-center text-gray-400 mx-auto" />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent outline-none border-none font-semibold text-gray-800"
            />
          </div>

          <div className="w-full h-14 bg-gray-100 rounded-full my-2.5 grid grid-cols-[15%_85%] px-2 items-center">
            <FaLock className="text-center text-gray-400 mx-auto" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none border-none font-semibold text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-36 h-12 mt-4 bg-breezo-green rounded-full text-white uppercase font-semibold cursor-pointer hover:bg-blue-600 transition-all"
          >
            Login
          </button>

          <p className="py-4 text-sm text-gray-500">
            Or Sign in with social platforms
          </p>

          <div className="flex justify-center">
            <a
              href="#"
              className="h-11 w-11 flex justify-center items-center m-2 border border-gray-400 rounded-full text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="h-11 w-11 flex justify-center items-center m-2 border border-gray-400 rounded-full text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="h-11 w-11 flex justify-center items-center m-2 border border-gray-400 rounded-full text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              <FaGoogle />
            </a>
            <a
              href="#"
              className="h-11 w-11 flex justify-center items-center m-2 border border-gray-400 rounded-full text-gray-700 hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </form>
      </div>

      {/* --- Bottom Section (Mobile) / Left Column (Desktop) --- */}
      <div
        className="relative w-full h-96 bg-breezo-green 
                    lg:order-1 lg:w-1/2 lg:h-auto lg:bg-transparent lg:flex lg:flex-col lg:justify-around lg:items-end lg:text-center lg:p-12 z-20"
      >
        {/* The Mobile-Only Wave */}
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

        {/* This container is now a ROW on mobile and a COLUMN on desktop */}
        <div
          className="relative z-10 h-full w-full flex flex-row items-center justify-center p-4 gap-x-2
                      lg:flex-col lg:items-end lg:justify-around lg:p-0"
        >
          {/* Text Content Block */}
          <div className="w-1/2 text-left lg:w-full lg:max-w-sm lg:text-center">
            <h3 className="font-bold font-lexend text-2xl mb-2 lg:text-3xl lg:mb-4">
              New here ?
            </h3>
            <p className="text-xs font-lexend leading-relaxed text-blue-100 lg:text-sm lg:py-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="mt-4 m-0 bg-transparent border-2 border-white w-32 h-10 font-semibold text-xs rounded-full hover:bg-white hover:text-breezo-green transition-colors lg:text-sm ">
              Sign up
            </button>
          </div>

          {/* Illustration Block - NOW VISIBLE on mobile */}
          <div className="w-1/2 max-w-[180px] lg:w-full lg:max-w-md lg:mt-8">
            <div className="w-full h-full lg:h-48  rounded-lg flex items-center justify-center">
              <img
                src="/login_illustrator.svg"
                alt="Login Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
