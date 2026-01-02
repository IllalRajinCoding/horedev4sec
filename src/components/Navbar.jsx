import { useState, useEffect, useCallback } from "react";
import { FaCloud, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white border-b border-slate-200" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
                <FaCloud className="text-sm" />
              </div>
              <span className="text-lg font-semibold text-slate-900">
                Hore<span className="text-primary">Cloud</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                className="bg-primary text-white px-5 py-2 text-sm font-medium hover:bg-secondary transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-slate-900 p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="flex justify-between items-center px-6 h-16 border-b border-slate-200">
              <a href="#home" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary flex items-center justify-center text-white">
                  <FaCloud className="text-sm" />
                </div>
                <span className="text-lg font-semibold text-slate-900">
                  Hore<span className="text-primary">Cloud</span>
                </span>
              </a>
              <button
                type="button"
                className="text-slate-900 p-2"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xl font-medium text-slate-900 hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                className="bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary transition-colors mt-4"
                onClick={closeMenu}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
