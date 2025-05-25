import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaChevronDown } from 'react-icons/fa';
import { socialLinks } from '../data';
import Button from './ui/Button';

const Hero = () => {
  const handleScrollDown = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-accent-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-neutral-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-primary-400">✨</span> Full-Stack Developer & Designer
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hy , I'm <br />
              <span className="text-gradient">Priy Mavani</span>  <br />
              
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              I design and build applications with a focus on user experience, 
              performance, and accessibility. Let's create something amazing together.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button href="#projects" variant="primary">View Projects</Button>
              <Button href="#contact" variant="secondary">Contact Me</Button>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              {/* <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a> */}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-2/5 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 bg-background-dark rounded-full overflow-hidden flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dd6lqkak0/image/upload/v1748110540/priy_mavani_p_jranbw.jpg" 
                  alt="Cole" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={handleScrollDown}
        >
          <FaChevronDown size={24} className="animate-bounce text-neutral-400" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;