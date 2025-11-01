"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedIcon from "./AnimatedIcon";
import logo_white from "/white_logo.png";
import logo_blue from "/logo4.png";
import bikeAnimation from "@/assets/lottie/bike.json";
import accountAnimation from "@/assets/lottie/account.json";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = logo_white;
    img2.src = logo_blue;

    const handleScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic text color based on scroll
  const textColor = scrolled ? "text-gray-900" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        scrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex items-center justify-between w-full max-w-7xl px-4 md:px-8">
        {/* Logo */}
        <a href="#">
          <img
            src={scrolled ? logo_blue : logo_white }
            alt="Breezo Logo"
            className="h-[35px] transition-transform duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex md:items-center gap-6 ${textColor}`}>
          {/* Vehicles */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 cursor-pointer hover:text-breezo-green transition ${textColor}`}
          >
            <AnimatedIcon animationData={bikeAnimation} size={40} />
            <span className="font-montserrat font-semibold">Vehicles</span>
          </motion.div>

          {/* Account dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className={`flex items-center gap-2 font-medium ${textColor}`}
            >
              <AnimatedIcon animationData={accountAnimation} size={35} />
              <span className="font-montserrat font-semibold">Account</span>
              <motion.svg
                animate={{ rotate: showAccountMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            {showAccountMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg"
              >
                <a
                  href="#login"
                  className="font-montserrat font-semibold block px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </a>
                <a
                  href="#signup"
                  className="font-montserrat font-semibold block px-4 py-2 hover:bg-gray-100"
                >
                  Signup
                </a>
              </motion.div>
            )}
          </div>

          {/* Download App */}
          <button className="flex items-center gap-2 bg-breezo-green hover:bg-breezo-green-dark text-[#404040] px-5 py-2 rounded-none transition font-montserrat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 12l4-4m-4 4l-4-4m8 8H8"
              />
            </svg>
            Download App
          </button>
        </nav>

        {/* Mobile Menu Toggle (hamburger) */}
        {!isOpen && (
          <button
            className={`md:hidden focus:outline-none px-6 transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-2xl z-50 flex flex-col p-6 space-y-6"
      >
        {/* Close Button inside Drawer */}
        <button
          className="self-end text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Mobile Menu Items */}
        <div className="flex flex-col space-y-6 mt-4 text-gray-900 ">
          {/* Vehicles */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer hover:text-breezo-green transition"
          >
            <AnimatedIcon animationData={bikeAnimation} size={40} />
            <span className="font-montserrat font-semibold">Vehicles</span>
          </motion.div>

          {/* Account dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center gap-2 font-medium w-full justify-between text-gray-900"
            >
              <div className="flex items-center gap-2">
                <AnimatedIcon animationData={accountAnimation} size={35} />
                <span className="font-montserrat font-semibold">Account</span>
              </div>
              <motion.svg
                animate={{ rotate: showAccountMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </motion.button>

            {showAccountMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 bg-gray-50 rounded-lg shadow-md"
              >
                <a
                  href="#login"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 font-montserrat font-semibold"
                >
                  Login
                </a>
                <a
                  href="#signup"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800  font-montserrat font-semibold"
                >
                  Signup
                </a>
              </motion.div>
            )}
          </div>

          {/* Download App */}
          <button className="flex items-center gap-2 bg-breezo-green hover:bg-breezo-green-dark text-[#404040] px-5 py-2 rounded-full transition font-montserrat font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 12l4-4m-4 4l-4-4m8 8H8"
              />
            </svg>
            Download App
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
