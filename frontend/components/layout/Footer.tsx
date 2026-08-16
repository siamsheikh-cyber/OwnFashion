"use client";

import Link from "next/link";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { ImPinterest2 } from "react-icons/im";
import { PiTiktokLogoLight } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-primary/10 pt-[70px] pb-[50px] px-[20px] md:px-[80px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] mb-[64px]">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#"
              className="text-primary italic mb-4 inline-block"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "40px",
                lineHeight: "1.2",
                fontWeight: 400,
              }}
            >
              OwnFashion
            </a>
            <p
              className="text-on-surface-variant max-w-sm"
              style={{
                fontFamily: "Literata, serif",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              A digital destination for the modern minimalist. We curate the
              finest in high-end editorial fashion, seasonal trends, and
              timeless essentials for the discerning eye.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h5
              className="uppercase tracking-widest text-primary mb-6"
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              Navigation
            </h5>
            <ul
              className="space-y-4 text-on-surface-variant"
              style={{
                fontFamily: "Literata, serif",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              {[
                { name: "Latest Posts", href: "/posts" },
                { name: "Product Reviews", href: "/posts" },
                { name: "About the Editorial", href: "#" },
                { name: "Contact Us", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h5
              className="uppercase tracking-widest text-primary mb-6"
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              Connect
            </h5>
            <div className="flex space-x-6 mb-8">
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
            </div>
            <p
              className="text-on-surface-variant italic opacity-70"
              style={{
                fontFamily: "Literata, serif",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              OwnFashion is a participant in the Amazon Services LLC Associates
              Program, an affiliate advertising program designed to provide a
              means for sites to earn advertising fees by advertising and
              linking to Amazon.com.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className="flex flex-wrap justify-center gap-6 uppercase tracking-widest"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            {["Privacy Policy", "Terms of Service", "Newsletter"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-on-surface-variant hover:text-secondary transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
          <div
            className="text-on-surface-variant italic"
            style={{
              fontFamily: "Literata, serif",
              fontSize: "14px",
              lineHeight: "1.4",
            }}
          >
            © 2024 OwnFashion Editorial. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
