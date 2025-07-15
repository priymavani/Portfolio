import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import Pattern from './ui/Pattern';

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="resume" ref={ref} className="py-20 md:py-32 bg-background-light relative">
     <div className="absolute inset-0 z-0 pointer-events-none">

      <Pattern/>
     </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Resume" subtitle="View and download my resume" />

        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 p-6">
            <div className="aspect-[3/4] w-full relative">
              <iframe
                src="/Resume_PriyMavani.pdf"
                title="Resume Preview"
                className="w-full h-full rounded-lg"
                style={{ border: 'none' }}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="/Resume_PriyMavani.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg text-primary-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume; 