"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/projects" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "glass shadow-lg shadow-black/20"
          : "bg-transparent"
        }`}
    >
      <div className="section-container flex items-center justify-between h-[88px]">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity tracking-tight">
          RS.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-semibold text-text-secondary hover:text-primary-accent transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-primary-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border-subtle"
          >
            <nav className="flex flex-col p-4 gap-2 items-center text-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-lg font-semibold text-text-secondary hover:text-primary-accent transition-colors py-4 px-4 rounded-xl hover:bg-white/5 text-center w-full"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
