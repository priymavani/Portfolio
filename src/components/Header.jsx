'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePortfolio } from '../contexts/PortfolioContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { socialLinks } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Credentials', href: '#achievements' },
    { name: 'Resume', href: '#resume' },
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b 
      ${isScrolled
          ? 'bg-[#050505]/80 backdrop-blur-md border-white/5 py-4'
          : 'bg-transparent border-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xl font-bold tracking-tight text-white flex items-center gap-1"
        >
          PRIY<span className="text-accent">.</span>MAVANI
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-4 border-r border-white/10 pr-4">
            {socialLinks?.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-2xl"><FaGithub /></a>
            )}
            {socialLinks?.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors text-2xl"><FaLinkedin /></a>
            )}
          </div>
          <button
            onClick={() => handleNavClick('#contact')}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm font-medium text-white transition-colors"
          >
            Let's Talk
          </button>
        </div>

        <button
          className="md:hidden text-neutral-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#050505] border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className="text-lg font-medium text-neutral-400 hover:text-white py-2 block border-b border-white/5"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="mt-4 w-full py-3 bg-accent text-black font-bold rounded"
            >
              Contact Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;