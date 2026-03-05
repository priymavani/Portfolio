'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-white/5 text-center relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="text-neutral-500 text-sm font-medium">
            © {new Date().getFullYear()} Priy Mavani. <span className="text-neutral-700">All Systems Nominal.</span>
          </div>

          <div className="flex gap-6 text-sm font-medium text-neutral-500">
            <span className="hover:text-accent cursor-pointer transition-colors">Next.js 14</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Tailwind</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Framer Motion</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;