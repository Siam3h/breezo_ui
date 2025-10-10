
import { useState, useEffect } from "react";
import logo from "/logo.png"

export default function Footer() {
  const [open, setOpen] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth >= 1024) setOpen(null);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <footer className="overflow-hidden pt-16 pb-10 text-white bg-black lg:pt-20 lg:pb-14">
      <div className="box-content px-6 mx-auto max-w-screen-xl">
        <div className="space-y-28 lg:space-y-56">
          <div className="space-y-6 lg:grid lg:grid-cols-12 lg:gap-5 lg:space-y-0">
            {/* Logo */}
            <div className="mb-14 lg:col-span-3">
<a href="#" className="flex items-center py-2 px-4">
  <img
    src={logo}
    alt="Logo"
    className="h-[35px] w-auto max-w-[320px] object-contain"
  />
</a>
             </div>

            {/* Links Sections */}
            <div className="space-y-6 lg:grid lg:grid-cols-6 lg:col-span-6 lg:gap-5 lg:space-y-0">
              {/* Section 1 */}
              <FooterSection
                id="1"
                title="Join Us"
                links={[
                  { name: "Careers", href: "https://www.breezoelectric.com/about/careers" },
                  { name: "Breezo Times Blog", href: "https://www.breezoelectric.com/blog" },
                  { name: "Press", href: "https://www.breezoelectric.com/about/press" },
                  { name: "Partners", href: "https://www.breezoelectric.com/about/partners" },
                ]}
                open={open}
                toggle={toggle}
                width={width}
              />

              {/* Section 2 */}
              <FooterSection
                id="6"
                title="About"
                links={[
                  { name: "Community", href: "https://www.breezoelectric.com/why/community" },
                  { name: "E-Bike", href: "https://www.breezoelectric.com/vehicles/electric-bike" },
                  { name: "E-Scooter", href: "https://www.breezoelectric.com/vehicles/scooter" },
                  { name: "Sustainability", href: "https://www.breezoelectric.com/why/sustainability" },
                  { name: "Innovation", href: "https://www.breezoelectric.com/why/innovation" },
                  { name: "Safety", href: "https://www.breezoelectric.com/why/safety" },
                ]}
                open={open}
                toggle={toggle}
                width={width}
              />

              {/* Section 3 */}
              <FooterSection
                id="13"
                title="Programs"
                links={[
                  { name: "Advertise", href: "https://www.breezoelectric.com/about/partners/breezo-ads" },
                  { name: "Breezo Access", href: "https://www.breezoelectric.com/why/community/breezo-access" },
                  { name: "Breezo Hero", href: "https://www.breezoelectric.com/why/community/breezo-hero" },
                  { name: "Breezo Assist", href: "https://www.breezoelectric.com/why/community/breezo-assist" },
                  { name: "Insurance", href: "https://www.breezoelectric.com/insurance" },
                  { name: "Our Cities", href: "https://www.breezoelectric.com/locations" },
                ]}
                open={open}
                toggle={toggle}
                width={width}
              />
            </div>

            {/* Right side */}
            <div className="lg:col-span-3 lg:col-start-10 lg:pt-6 lg:text-end">
              <div className="inline-block text-start">
                <ul className="space-y-6 text-3xl lg:space-y-8 lg:text-gray-300 lg:headline-04">
                  <li><a href="https://www.breezoelectric./locations" className="transition hover:text-white">Find Location</a></li>
                  <li><a href="https://breezoelectric.com/help/" target="_blank" rel="noreferrer" className="transition hover:text-white">Get help</a></li>
                  <li><a href="https://www.breezoelectric.com/sitemap" className="transition hover:text-white">Sitemap</a></li>
                </ul>



{/* Social Icons */}
                <ul className="flex flex-wrap gap-4 mt-8 lg:mt-10">
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="hover:text-blue-400"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.26 4.26 0 001.88-2.36 8.46 8.46 0 01-2.68 1.03A4.23 4.23 0 0016 4a4.24 4.24 0 00-4.24 4.23c0 .33.04.65.1.96A12.04 12.04 0 013 5.1a4.24 4.24 0 001.31 5.65A4.17 4.17 0 012.8 10v.05a4.24 4.24 0 003.4 4.15c-.4.1-.82.15-1.25.15-.31 0-.61-.03-.9-.08a4.25 4.25 0 003.96 2.94A8.5 8.5 0 012 19.54a12 12 0 006.5 1.9c7.8 0 12.08-6.47 12.08-12.08v-.55A8.63 8.63 0 0024 5.6a8.32 8.32 0 01-2.54.7z" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="hover:text-blue-400"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-blue-400"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zm-11 19H5V9h3v10zM6.5 7.5A1.75 1.75 0 116.5 4a1.75 1.75 0 010 3.5zM20 19h-3v-5c0-1.3-.5-2-1.6-2-.8 0-1.3.5-1.5 1-.1.2-.1.5-.1.8V19h-3V9h3v1.3a3.1 3.1 0 012.8-1.6c2 0 3.4 1.3 3.4 4v6.3z" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="hover:text-blue-400"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.8-.9a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="hover:text-blue-400"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.7 4.8 12 4.8 12 4.8h0s-4.7 0-7.1.3c-.4 0-1.3.1-1.9.9-.6.6-.8 2-.8 2S2 9.6 2 11.3v1.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.7 2.1.8 1.5.1 6.9.3 6.9.3s4.7 0 7.1-.3c.4 0 1.3-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.4c0-1.7-.2-3.3-.2-3.3zM10 14.7V9.3l4.6 2.7L10 14.7z" />
                      </svg>
                    </a>
                  </li>
                </ul>







              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-xs lg:grid lg:grid-cols-12 lg:gap-5">
            <div className="pb-2 lg:col-span-3 lg:pb-0">2025 Breezo Electric</div>
            <div className="lg:col-span-9">
              <ul className="flex flex-wrap">
                {[
                  ["User Agreement", "https://www.breezoelectric.com/user-agreement"],
                  ["Privacy Notice", "https://www.breezoelectric.com/legal/privacy-policy"],
                  ["Data Request", "https://www.breezoelectric.com/legal/guidelines-third-party-data-requests"],
                  ["Research", "https://www.breezoelectric.com/legal/research"],
                  ["Legal Bases", "https://www.breezoelectric.com/legal/legal-bases"],
                  ["My Information", "https://www.breezoelectric.com/my-information"],
                  ["Imprint", "https://www.breezoelectric.com/imprint"],
                  ["Breezo Electric Terms", "https://www.breezoelectric.com/breezoelectricpass-terms-and-conditions"],
                ].map(([label, href], i) => (
                  <li key={i} className="mt-4 me-6 lg:m-0">
                    <a href={href} className="hover:underline">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ id, title, links, open, toggle, width }) {
  const isOpen = open === id || width >= 1024;

  return (
    <div className="lg:col-span-2 lg:pt-6 lg:space-y-8">
      <h4 className="text-3xl lg:headline-04">
        <button
          type="button"
          onClick={() => toggle(id)}
          className="relative w-full text-start lg:pointer-events-none"
          aria-expanded={isOpen}
        >
          {title}
          <span
            className={`absolute right-0 top-1/2 w-3.5 h-3 transform -translate-y-1/2 transition lg:hidden ${
              isOpen ? "-rotate-180" : ""
            }`}
          >
            <svg viewBox="0 0 14 10" fill="none" className="h-full w-full stroke-current">
              <path d="M1 1l6 6 6-6" strokeWidth="2" />
            </svg>
          </span>
        </button>
      </h4>

      {isOpen && (
        <ul className="pt-6 pb-4 space-y-4 lg:py-0">
          {links.map((l, i) => (
            <li key={i}>
              <a
                href={l.href}
                className="text-gray-300 transition lg:text-sm hover:text-white focus:text-white"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
