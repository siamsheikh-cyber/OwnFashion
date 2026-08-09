"use client";

import { navLinks } from '@/lib/data';

export default function Navbar() {
  return (
    <nav className="bg-[#ECE7DC] backdrop-blur-md w-full top-0 sticky border-b border-primary/10 z-50 transition-all ease-in-out duration-300">
      <div className="flex items-center h-[110px] px-[20px] md:px-[80px]  w-full gap-8 relative">

        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/images/ownfashion.png" alt="ownfashion" className="w-[200px] object-cover" />
        </div>

        {/* Center Nav (Desktop) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6 uppercase tracking-widest"
          style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link}
              href="#"
              className={
                i === 0
                  ? 'text-secondary border-b border-secondary pb-1 transition-all ease-in-out duration-300'
                  : 'text-on-surface-variant hover:text-primary transition-all ease-in-out duration-300'
              }
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 text-primary ml-auto">
          {['photo_camera', 'share', 'dark_mode', 'search'].map((icon) => (
            <button key={icon} className="hover:text-secondary transition-colors duration-300">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>
                {icon}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button className="text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>
              menu
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
