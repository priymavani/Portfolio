import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { socialLinks } from '../data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-background-dark/80 backdrop-blur-sm border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <a href="#hero" className="text-2xl font-bold">
              <span className="text-gradient">Priy Mavani</span>
            </a>
            <p className="text-sm text-neutral-400 mt-2">
              Creating digital experiences that people love.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex gap-6 mb-4">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              {/* <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a> */}
            </div>
           
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;