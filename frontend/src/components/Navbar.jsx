import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Practice', path: '/practice' },
    
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-strong shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-wide" data-aos="fade-down">
          TalentIQ
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8" data-aos="fade-down">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium smooth-transition cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-gray-700 z-50 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          data-aos="fade-down"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 glass-strong z-40 pt-4 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <ul className="flex flex-col items-start gap-6 pl-6 pt-20">
          {navLinks.map((link, index) => (
            <li key={index} className="w-full">
              <Link
                to={link.path}
                className="block text-gray-700 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-blue-50 smooth-transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
