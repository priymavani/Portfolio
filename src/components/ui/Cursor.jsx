import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ('ontouchstart' in window) {
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button')) {
        setLinkHovered(true);
      }
    };
    
    const handleMouseOut = () => {
      setLinkHovered(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Don't render on touch devices
  if ('ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          backgroundColor: clicked ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 1)',
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: linkHovered ? 1.5 : clicked ? 0.8 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-40 border border-white/5"
        animate={{
          x: position.x - 80,
          y: position.y - 80,
          scale: linkHovered ? 1.2 : clicked ? 0.8 : 1,
          opacity: hidden ? 0 : linkHovered ? 0.2 : 0.05,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 150,
          mass: 1,
        }}
      />
    </>
  );
};

export default Cursor;