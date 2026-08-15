"use client";

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

  return (
    <nav className="bg-[#ECE7DC] backdrop-blur-md w-full top-0 sticky border-b border-primary/10 z-50 transition-all ease-in-out duration-300">
      <div className="flex items-center h-[110px] px-[20px] md:px-[80px] w-full gap-8 relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="/images/ownfashion.png"
              alt="ownfashion"
              className="w-[200px] object-cover cursor-pointer"
            />
          </Link>
        </div>

        {/* Center Nav (Desktop) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6 uppercase tracking-widest"
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "16px",
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

        {/* Right Icons */}
        <div className="flex items-center space-x-6 text-primary ml-auto">
          <button className="hover:text-secondary transition-colors duration-300">
            <ImPinterest2 className="text-[20px]" />
          </button>

          <button className="hover:text-secondary transition-colors duration-300">
            <FaInstagram className="text-[20px]" />
          </button>

          <button className="hover:text-secondary transition-colors duration-300">
            <PiTiktokLogoLight className="text-[20px]" />
          </button>

          <button className="hover:text-secondary transition-colors duration-300">
            <CiFacebook className="text-[20px]" />
          </button>

          <Link href="/posts" className="hover:text-secondary transition-colors duration-300 flex items-center">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: '"FILL" 0' }}
            >
              search
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button className="text-primary">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 0' }}
            >
              menu
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
