import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      setIsTouch(true);
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

    const handleMouseOut = () => setLinkHovered(false);
    const handleMouseLeave = () => setHidden(true);

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

  if (isTouch) return null;

  return (
    <>
      {/* Main Dot - Electric Lime */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
            backgroundColor: '#D9FF00', // Hardcoded Electric Lime
            mixBlendMode: 'difference'
        }}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: linkHovered ? 2.5 : clicked ? 0.8 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      />
      {/* Outer Ring - Faint Lime */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] border border-[#D9FF00]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: linkHovered ? 1.5 : clicked ? 0.8 : 1,
          opacity: hidden ? 0 : linkHovered ? 0.5 : 0.3,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 150, mass: 1 }}
      />
    </>
  );
};

export default Cursor;