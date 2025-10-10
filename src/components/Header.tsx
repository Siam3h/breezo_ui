import { useState, useEffect } from "react";
import logo from "/logo1.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);

      // auto-close dropdowns + mobile menu when scrolling
      setIsOpen(false);
      setAboutOpen(false);
      setWhyOpen(false);
      setVehicleOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Common navbar items to avoid duplication
  const NavItems = () => (
    <ul className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-end text-base pt-4 md:pt-0 space-y-2 md:space-y-0 md:space-x-4">
      {/* About */}
      <li className="relative">
        <button
          onClick={() => setAboutOpen(!aboutOpen)}
          className="md:p-4 py-3 px-0 block w-full text-left flex items-center"
        >
          About Us
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          className={`${
            aboutOpen ? "block" : "hidden"
          } md:absolute md:top-full left-0 bg-white md:shadow-md rounded-md md:min-w-[180px] z-50`}
        >
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Partners
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Leadership
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Careers
            </a>
          </li>
        </ul>
      </li>

      {/* Why Breezo */}
      <li className="relative">
        <button
          onClick={() => setWhyOpen(!whyOpen)}
          className="md:p-4 py-3 px-0 block w-full text-left flex items-center"
        >
          Why Breezo Electric?
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          className={`${
            whyOpen ? "block" : "hidden"
          } md:absolute md:top-full left-0 bg-white md:shadow-md rounded-md md:min-w-[180px] z-50`}
        >
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Safety
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Sustainability
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Community
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              Innovation
            </a>
          </li>
        </ul>
      </li>

      {/* Vehicles */}
      <li className="relative">
        <button
          onClick={() => setVehicleOpen(!vehicleOpen)}
          className="md:p-4 py-3 px-0 block w-full text-left  flex items-center"
        >
          Vehicles
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          className={`${
            vehicleOpen ? "block" : "hidden"
          } md:absolute md:top-full left-0 bg-white md:shadow-md rounded-md md:min-w-[180px] z-50`}
        >
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              E-Scooter
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-gray-900">
              E-Bike
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );

  return (
    <header
      className={`lg:px-16 px-4 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-bold ${
        scrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
<a href="#" className="flex items-center py-2 px-4">
  <img
    src={logo}
    alt="Logo"
    className="h-[35px] w-auto max-w-[320px] object-contain"
  />
</a>





        {/* Large Screen Navigation */}
        <nav className="hidden md:flex md:items-center md:w-auto">
          <NavItems />
        </nav>

        {/* Hamburger for Mobile */}
        <button className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            // Close (X)
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
          ) : (
            // Hamburger
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
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <NavItems />
      </nav>
    </header>
  );
};

export default Header;
