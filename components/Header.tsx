'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'STORE', path: '/#store' },
    { name: 'CUSTOMIZE', path: '/customize' },
    { name: 'ABOUT US', path: '/#about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/85 backdrop-blur-md border-b border-border-color py-4 transition-all">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Viper Logo"
            width={120}
            height={30}
            className="invert transition-all group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`font-display text-sm font-semibold tracking-wider transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent-gold after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-accent-gold after:w-full'
                    : 'text-text-secondary hover:text-text-primary after:w-0 hover:after:w-full'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-5">
          

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-bg-secondary border-b border-border-color p-6 animate-fade-in md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-display text-base font-semibold tracking-wider py-2 border-b border-white/[0.03] last:border-0 ${
                    isActive ? 'text-accent-gold' : 'text-text-secondary hover:text-accent-gold'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
