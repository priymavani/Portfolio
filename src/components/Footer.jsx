'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp, FaMapMarkerAlt, FaCode, FaYoutube, FaInstagram } from 'react-icons/fa';
import { SiLeetcode, SiNextdotjs, SiTailwindcss, SiFramer, SiMongodb } from 'react-icons/si';
import { usePortfolio } from '../contexts/PortfolioContext';

const Footer = () => {
  const { socialLinks } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const socials = [
    { name: 'GitHub', icon: FaGithub, href: socialLinks?.github || 'https://github.com/priymavani', color: '#ffffff' },
    { name: 'LinkedIn', icon: FaLinkedin, href: socialLinks?.linkedin || 'https://www.linkedin.com/in/priy-mavani/', color: '#0077B5' },
    { name: 'LeetCode', icon: SiLeetcode, href: 'https://leetcode.com/u/Priy_mavani/', color: '#FFA116' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/@priymavani?si=BXz91NquVCjb6G-G', color: '#FF0000' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/priy.mavani?igsh=MXJjM3pwMjZlNXoyMA==', color: '#E4405F' },
    { name: 'Email', icon: FaEnvelope, href: `mailto:${socialLinks?.email || 'priy.mavani.cg@gmail.com'}`, color: '#3B82F6' },
  ];

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Credentials', href: '#achievements' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const techStack = [
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Tailwind', icon: SiTailwindcss },
    { name: 'Framer', icon: SiFramer },
    { name: 'MongoDB', icon: SiMongodb },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030303] border-t border-white/5 overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Quote */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="text-2xl font-bold tracking-tight text-white inline-flex items-center gap-1 mb-6"
            >
              PRIY<span className="text-accent">.</span>MAVANI
            </a>

            {/* Quote */}
            <div className="mt-4 pl-4 border-l-2 border-accent/30">
              <p className="text-neutral-400 italic leading-relaxed text-sm">
                "First, solve the problem. Then, write the code."
              </p>
              <p className="text-neutral-600 text-xs mt-2 tracking-wide">— John Johnson</p>
            </div>

            {/* Personal Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <FaMapMarkerAlt className="text-accent/60 flex-shrink-0" size={14} />
                <span>Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <FaCode className="text-accent/60 flex-shrink-0" size={14} />
                <span>Full Stack Engineer</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <FaEnvelope className="text-accent/60 flex-shrink-0" size={14} />
                <a
                  href={`mailto:${socialLinks?.email || 'priy.mavani.cg@gmail.com'}`}
                  className="hover:text-accent transition-colors"
                >
                  {socialLinks?.email || 'priy.mavani.cg@gmail.com'}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm text-neutral-400 hover:text-white hover:pl-2 transition-all duration-200 inline-block relative group"
                  >
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-accent group-hover:w-2 transition-all duration-200"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">
              Connect
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <social.icon
                    size={18}
                    className="transition-opacity duration-300 group-hover:opacity-100 opacity-80"
                    style={{ color: social.color }}
                  />
                  <span className="text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Built With */}
            <div className="mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Built With
              </h4>
              <div className="flex items-center gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="w-8 h-8 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center group hover:border-accent/30 transition-all duration-300 cursor-default"
                    title={tech.name}
                  >
                    <tech.icon size={14} className="text-neutral-600 group-hover:text-accent transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Copyright */}
          <div className="text-neutral-600 text-xs font-medium">
            © {currentYear} Priy Mavani. <span className="text-neutral-700">Crafted with</span>{' '}
            <FaHeart className="inline text-accent/50 mx-0.5" size={10} />{' '}
            <span className="text-neutral-700">and lots of</span>{' '}
            <span className="text-accent/40">{"</>"}</span>
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.03] border border-white/5 text-neutral-500 hover:text-white hover:border-accent/30 transition-all duration-300 text-xs font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp size={10} />
            Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;