'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MorphText = ({ words = [], subtext }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words]);

  const currentWord = words[index] || '';

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 select-none">
      <div className="relative h-24 sm:h-36 md:h-48 lg:h-64 xl:h-80 w-full flex items-center justify-center overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentWord}
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-black uppercase tracking-[0.15em] text-[#3B82F6] drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] font-sans"
          >
            {currentWord}
          </motion.h1>
        </AnimatePresence>
      </div>

      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-neutral-500 text-xs sm:text-sm md:text-base font-mono tracking-[0.3em] uppercase mt-4 relative"
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
};

export default MorphText;
