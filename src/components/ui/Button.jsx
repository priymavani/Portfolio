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
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-600/30 focus:ring-primary-500/50",
    secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 focus:ring-white/20",
    accent: "bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/20 hover:shadow-accent-600/30 focus:ring-accent-500/50",
    outline: "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/30 focus:ring-white/20",
    ghost: "bg-transparent hover:bg-white/5 text-white focus:ring-white/10"
  };
  
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-6 py-3"
  };
  
  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const ButtonContent = () => (
    <span className="relative z-10">{children}</span>
  );
  
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
        <ButtonContent />
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default Button;