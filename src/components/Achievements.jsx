import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certificates, hackathons } from '../data';
import SectionHeading from './ui/SectionHeading';
import Particles from './ui/Particles'

const Achievements = () => {
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    if (inView) {
      const interval = window.setInterval(() => {
        setActiveCertificate((prev) => (prev + 1) % certificates.length);
      }, 1500);

      return () => {
        window.clearInterval(interval);
      };
    }
  }, [inView]);

  const nextCertificate = () => {
    setActiveCertificate((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setActiveCertificate((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="achievements" ref={ref} className="py-20 md:py-32 bg-background-light relative">
       <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Achievements & Certificates" subtitle="My certifications and hackathon achievements" />

        {/* Certificates Slider */}
        <div className="mt-16">
          <h3 className="text-4xl font-extrabold mb-8 text-center">Certificates</h3>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                animate={{ x: `-${activeCertificate * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {certificates.map((cert) => (
                  <div key={cert.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
                      <div className="relative h-[400px] flex items-center justify-center bg-white/5">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                        />
                      </div>
                      <div className="p-4 border-t border-white/10">
                        <h4 className="text-lg font-bold mb-1">{cert.title}</h4>
                        <p className="text-primary-400 text-sm mb-1">{cert.issuer}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-neutral-400">{cert.date}</span>
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 transition-colors"
                          >
                            View Certificate →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <button
              onClick={prevCertificate}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
            >
              ←
            </button>
            <button
              onClick={nextCertificate}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
            >
              →
            </button>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="mt-20">
          <h3 className="text-4xl font-extrabold mb-8 text-center">All Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-colors"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-[4/3] relative group">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      View Certificate →
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{cert.title}</h4>
                  <p className="text-primary-400 text-sm mb-2">{cert.issuer}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-400">{cert.date}</span>
                    <span className="text-neutral-400">ID: {cert.credentialId}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathon Cards */}
        <div className="mt-20">
          <h3 className="text-4xl font-extrabold mb-8 text-center">Hackathon Achievements</h3>
          <div className="grid grid-cols-1 gap-8">
            {hackathons.map((hackathon) => (
              <motion.div
                key={hackathon.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video relative">
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold mb-4">{hackathon.title}</h4>
                    <p className="text-neutral-300 mb-6">{hackathon.description}</p>
                    
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold mb-3">Team Members</h5>
                      <div className="flex flex-wrap gap-4">
                        {hackathon.teamMembers.map((member, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {/* <img
                              src={member.image}
                              alt={member.name}
                              className="w-8 h-8 rounded-full object-cover"
                            /> */}
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-neutral-400">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href={hackathon.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg text-primary-400 transition-colors"
                      >
                        Live Demo
                      </a>
                      <a
                        href={hackathon.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-neutral-300 transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href={hackathon.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-neutral-300 transition-colors"
                      >
                        Figma Design
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 