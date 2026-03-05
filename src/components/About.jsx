'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getIcon } from '../lib/iconMap';
import SectionHeading from './ui/SectionHeading';
import { usePortfolio } from '../contexts/PortfolioContext';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { skills, loading } = usePortfolio();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-[#030303] relative border-t border-white/5">

      <div className="container mx-auto px-6 relative z-20">
        <SectionHeading title="About Me" subtitle="My background and skills" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-12">

          {/* Left Column: Bio */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="font-display text-3xl font-bold text-white">My Journey</h3>
            <div className="space-y-6 text-neutral-400 leading-relaxed text-lg">
              <p>
                I am a passionate Full Stack Developer with a strong foundation in web development technologies. My journey in web development began with HTML and CSS, and I've since expanded my expertise to include modern frameworks and tools like React, Node.js, and MongoDB.
              </p>
              <p>
                I specialize in creating responsive, user-friendly web applications that solve real-world problems. My approach combines technical expertise with a keen eye for design, ensuring that every project I work on is both functional and visually appealing.
              </p>
            </div>

            <motion.div
              className="mt-12 p-8 border border-white/10 bg-white/[0.02] rounded-lg"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="font-display text-xl font-bold mb-4 text-white">Let's Work Together</h4>
              <p className="text-neutral-400 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center text-[#D9FF00] hover:text-white font-medium transition-colors border-b border-[#D9FF00] pb-1 hover:border-white"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in touch
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Skills */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-3xl font-bold mb-8 text-white">Skills & Expertise</h3>
            {loading ? (
              <div className="space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 w-32 bg-white/10 rounded mb-4"></div>
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4].map(j => (
                        <div key={j} className="h-12 w-28 bg-white/5 rounded-md"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {skills.map((skillGroup, groupIndex) => (
                  <motion.div
                    key={skillGroup._id || skillGroup.category}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeIn}
                    transition={{ duration: 0.6, delay: 0.1 * groupIndex + 0.3 }}
                  >
                    <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-500 mb-5 border-b border-white/5 pb-2">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((item, index) => {
                        const IconComponent = getIcon(item.icon);
                        return (
                          <motion.div
                            key={index}
                            className="group flex items-center gap-3 px-4 py-3 rounded-md bg-[#0A0A0A] border border-white/10 hover:border-[#D9FF00]/50 transition-all duration-300"
                            whileHover={{ y: -3 }}
                          >
                            <span className="text-neutral-400 group-hover:text-[#D9FF00] transition-colors">
                              <IconComponent className="w-5 h-5" />
                            </span>
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-white">{item.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;