
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props 
}) => {
  // Base styles: Sharp corners (rounded-md), industrial feel
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Electric Lime background, Black text - High Contrast
    primary: "bg-[#D9FF00] hover:bg-[#c2e600] text-black border border-transparent shadow-[0_0_20px_rgba(217,255,0,0.3)] hover:shadow-[0_0_30px_rgba(217,255,0,0.5)]",
    
    // Glass/Outline - Subtle technical look
    secondary: "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 hover:text-[#D9FF00]",
    
    // Outline Only
    outline: "bg-transparent hover:bg-[#D9FF00]/10 text-neutral-300 hover:text-[#D9FF00] border border-neutral-800 hover:border-[#D9FF00]",
    
    // Ghost
    ghost: "bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white"
  };
  
  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  };
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;