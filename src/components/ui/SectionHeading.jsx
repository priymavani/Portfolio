import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionHeading = ({ title, subtitle }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="text-center mb-10 md:mb-16">
      <motion.h5
        className="text-sm uppercase tracking-wider text-primary-400 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {subtitle}
      </motion.h5>
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="h-1 w-20 bg-primary-500 mx-auto mt-6"
        initial={{ opacity: 0, width: 0 }}
        animate={inView ? { opacity: 1, width: 80 } : { opacity: 0, width: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </div>
  );
};

export default SectionHeading;