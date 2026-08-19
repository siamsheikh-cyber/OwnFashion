"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import { ImPinterest2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { PiTiktokLogoLight } from "react-icons/pi";

const getLinkHref = (linkName: string): string => {
  if (linkName === "Home") return "/";
  if (linkName === "Blog" || linkName === "Posts") return "/posts";
  if (linkName === "About") return "/about";
  if (linkName === "Contact") return "/contact";
  return "/";
};

const isLinkActive = (linkName: string, pathname: string): boolean => {
  const href = getLinkHref(linkName);
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu whenever route/pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-[#F2EEE8] backdrop-blur-md w-full top-0 sticky border-b border-primary/10 z-50 transition-all ease-in-out duration-300">
      {/* Top Announcement Bar - Amazon Affiliate Disclosure */}
      <div className="bg-[#DFD8C8] text-primary/80 border-b border-primary/10 py-1.5 sm:py-2 px-4 text-center">
        <p
          className="text-[11px] sm:text-xs tracking-wider font-medium"
          style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.08em" }}
        >
          As an Amazon Associate, we may earn from qualifying buys.
        </p>
      </div>

      <div className="flex items-center justify-between h-[75px] sm:h-[90px] md:h-[110px] px-4 sm:px-8 md:px-[60px] lg:px-[80px] w-full gap-4 md:gap-8 relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/images/ownfashion.png"
              alt="ownfashion"
              className="w-[140px] sm:w-[170px] md:w-[200px] h-auto object-contain cursor-pointer transition-all duration-300"
            />
          </Link>
        </div>

        {/* Center Nav (Desktop) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6 lg:space-x-8 uppercase tracking-widest"
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "15px",
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link, pathname);
            return (
              <Link
                key={link}
                href={getLinkHref(link)}
                className={
                  active
                    ? "text-secondary border-b border-secondary pb-1 transition-all ease-in-out duration-300 hover:text-primary"
                    : "text-on-surface-variant hover:text-primary transition-all ease-in-out duration-300"
                }
              >
                {link}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-6 text-primary ml-auto md:ml-0">
          {/* Social Icons (Hidden on small mobile, visible on tablet & desktop) */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors duration-300"
              aria-label="Pinterest"
            >
              <ImPinterest2 className="text-[18px] xl:text-[20px]" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[18px] xl:text-[20px]" />
            </a>

            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors duration-300"
              aria-label="TikTok"
            >
              <PiTiktokLogoLight className="text-[18px] xl:text-[20px]" />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors duration-300"
              aria-label="Facebook"
            >
              <CiFacebook className="text-[18px] xl:text-[20px]" />
            </a>
          </div>

          {/* Search Button */}
          <Link
            href="/posts"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-secondary transition-colors duration-300 flex items-center p-1"
            aria-label="Search posts"
          >
            <span
              className="material-symbols-outlined text-[22px] md:text-[24px]"
              style={{ fontVariationSettings: '"FILL" 0' }}
            >
              search
            </span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="text-primary hover:text-secondary p-1 focus:outline-none transition-colors duration-200"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dropdown"
          className="md:hidden w-full bg-[#ECE7DC] border-t border-primary/10 px-6 py-6 flex flex-col space-y-5 shadow-lg animate-fadeIn"
        >
          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link, pathname);
              return (
                <Link
                  key={`mobile-${link}`}
                  href={getLinkHref(link)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-widest font-semibold py-2 px-3 transition-colors duration-200 flex items-center justify-between border-l-2 ${active
                    ? "text-secondary border-secondary bg-black/5"
                    : "text-primary border-transparent hover:text-secondary hover:border-secondary/40"
                    }`}
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  <span>{link}</span>
                  {active && (
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      arrow_forward_ios
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-primary/10 pt-4">
            <p
              className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-3 px-3"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              Follow Us
            </p>
            {/* Social Icons inside Mobile Menu */}
            <div className="flex items-center space-x-6 px-3 text-primary">
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-300"
                aria-label="Pinterest"
              >
                <ImPinterest2 className="text-[20px]" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-[20px]" />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-300"
                aria-label="TikTok"
              >
                <PiTiktokLogoLight className="text-[20px]" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors duration-300"
                aria-label="Facebook"
              >
                <CiFacebook className="text-[20px]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
