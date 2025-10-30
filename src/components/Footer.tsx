"use client";
import React from "react";
import logo from "/white_logo.png"; // Make sure you have the white logo in your public folder

// Social Icon Components from the Breezo example
const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.26 4.26 0 001.88-2.36 8.46 8.46 0 01-2.68 1.03A4.23 4.23 0 0016 4a4.24 4.24 0 00-4.24 4.23c0 .33.04.65.1.96A12.04 12.04 0 013 5.1a4.24 4.24 0 001.31 5.65A4.17 4.17 0 012.8 10v.05a4.24 4.24 0 003.4 4.15c-.4.1-.82.15-1.25.15-.31 0-.61-.03-.9-.08a4.25 4.25 0 003.96 2.94A8.5 8.5 0 012 19.54a12 12 0 006.5 1.9c7.8 0 12.08-6.47 12.08-12.08v-.55A8.63 8.63 0 0024 5.6a8.32 8.32 0 01-2.54.7z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zm-11 19H5V9h3v10zM6.5 7.5A1.75 1.75 0 116.5 4a1.75 1.75 0 010 3.5zM20 19h-3v-5c0-1.3-.5-2-1.6-2-.8 0-1.3.5-1.5 1-.1.2-.1.5-.1.8V19h-3V9h3v1.3a3.1 3.1 0 012.8-1.6c2 0 3.4 1.3 3.4 4v6.3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.8-.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.7 4.8 12 4.8 12 4.8h0s-4.7 0-7.1.3c-.4 0-1.3.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.3v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.7 2.1.8 1.5.1 6.9.3 6.9.3s4.7 0 7.1-.3c.4 0 1.3-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.4c0-1.7-.2-3.3-.2-3.3zM10 14.7V9.3l4.6 2.7L10 14.7z" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: YouTubeIcon, href: "https://youtube.com", label: "YouTube" },
  ];

  const footerSections = [
    {
      title: "Join Us",
      links: [
        {
          name: "Careers",
          href: "https://www.breezoelectric.com/about/careers",
        },
        {
          name: "Breezo Times Blog",
          href: "https://www.breezoelectric.com/blog",
        },
        { name: "Press", href: "https://www.breezoelectric.com/about/press" },
        {
          name: "Partners",
          href: "https://www.breezoelectric.com/about/partners",
        },
      ],
    },
    {
      title: "About",
      links: [
        {
          name: "Community",
          href: "https://www.breezoelectric.com/why/community",
        },
        {
          name: "E-Bike",
          href: "https://www.breezoelectric.com/vehicles/electric-bike",
        },
        {
          name: "E-Scooter",
          href: "https://www.breezoelectric.com/vehicles/scooter",
        },
        {
          name: "Sustainability",
          href: "https://www.breezoelectric.com/why/sustainability",
        },
        {
          name: "Innovation",
          href: "https://www.breezoelectric.com/why/innovation",
        },
        { name: "Safety", href: "https://www.breezoelectric.com/why/safety" },
      ],
    },
    {
      title: "Programs",
      links: [
        {
          name: "Advertise",
          href: "https://www.breezoelectric.com/about/partners/breezo-ads",
        },
        {
          name: "Breezo Access",
          href: "https://www.breezoelectric.com/why/community/breezo-access",
        },
        {
          name: "Breezo Hero",
          href: "https://www.breezoelectric.com/why/community/breezo-hero",
        },
        {
          name: "Breezo Assist",
          href: "https://www.breezoelectric.com/why/community/breezo-assist",
        },
        { name: "Insurance", href: "https://www.breezoelectric.com/insurance" },
        {
          name: "Our Cities",
          href: "https://www.breezoelectric.com/locations",
        },
      ],
    },
  ];

  const legalLinks = [
    {
      name: "User Agreement",
      href: "https://www.breezoelectric.com/user-agreement",
    },
    {
      name: "Privacy Notice",
      href: "https://www.breezoelectric.com/legal/privacy-policy",
    },
    {
      name: "Data Request",
      href: "https://www.breezoelectric.com/legal/guidelines-third-party-data-requests",
    },
    {
      name: "Legal Bases",
      href: "https://www.breezoelectric.com/legal/legal-bases",
    },
    {
      name: "My Information",
      href: "https://www.breezoelectric.com/my-information",
    },
  ];

  return (
    <footer className="bg-black text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Logo, Description & Socials */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Breezo Logo" className="h-9 w-auto" />
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Your partner in sustainable urban mobility, offering shared
              electric scooters and bikes to connect communities.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2, 3, 4: Link Sections - Hidden on mobile */}
          {footerSections.map((section) => (
            <div key={section.title} className="hidden md:block">
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider and bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-6">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Breezo Electric. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
