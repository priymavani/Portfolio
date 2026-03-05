import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionHeading = ({ title, subtitle }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="mb-16 md:mb-24 flex flex-col items-start border-l-2 border-[#3B82F6] pl-6">
      <motion.h5
        className="font-sans text-sm uppercase tracking-[0.2em] text-[#3B82F6] mb-3"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
      >
        {subtitle}
      </motion.h5>
      <motion.h2
        className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;