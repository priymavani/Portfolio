'use client';
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaAward, FaFingerprint } from 'react-icons/fa';
import Image from 'next/image';
import { usePortfolio } from '../contexts/PortfolioContext';

// --- COMPONENT 1: HOLOGRAPHIC ID CARD (Certificates) ---
const TiltCard = ({ cert }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  return (
    <motion.div
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md group flex flex-col overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.0) 40%, transparent 50%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Visual Header Section */}
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden flex-shrink-0">
        <Image
          src={cert.image}
          alt={`Certificate for ${cert.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Remaining content wrapped in container */}
      <div className="p-5 flex-grow flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="flex-grow flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white/50">
                <FaAward className="text-accent" />
                <span className="text-[10px] font-medium tracking-widest uppercase">{cert.issuer}</span>
              </div>
              {cert.issueDate && (
                <span className="text-[9px] text-neutral-500">
                  Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
            
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 border border-yellow-500/50 rounded-sm bg-yellow-500/10 grid grid-cols-2 gap-[1px] p-[2px]">
                <div className="bg-yellow-500/40 rounded-[1px]"></div>
                <div className="bg-yellow-500/40 rounded-[1px]"></div>
                <div className="bg-yellow-500/40 rounded-[1px]"></div>
                <div className="bg-yellow-500/40 rounded-[1px]"></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{cert.title}</h3>
            {cert.description && (
              <p className="text-neutral-400 text-xs leading-relaxed mt-2 mb-3">
                {cert.description}
              </p>
            )}
            
            {cert.skills && cert.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {cert.skills.map((skill, index) => (
                  <span key={index} className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-6">
          <div>
            <div className="flex items-center gap-1 text-neutral-600 mb-1">
              <FaFingerprint size={10} />
              <span className="text-[8px] uppercase tracking-widest">Credential ID</span>
            </div>
            <div className="font-medium text-xs text-accent/80 tracking-wider font-mono">
              {cert.credentialId ? cert.credentialId : "VALID-2025"}
            </div>
          </div>

          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-black bg-white px-3 py-1.5 rounded hover:bg-accent hover:text-white transition-colors flex-shrink-0"
          >
            VERIFY
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- COMPONENT 2: HACKATHON MISSION FILE ---
const HackathonCase = ({ hackathon }) => (
  <div className="group relative w-full bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors duration-500">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none"></div>

    <div className="grid lg:grid-cols-2 gap-8 p-8 relative z-10">
      <div className="relative h-64 lg:h-auto flex items-center justify-center perspective-1000 group-hover:perspective-[800px] transition-all duration-500">
        <div className="relative w-full max-w-sm aspect-video transform rotate-x-12 rotate-y-6 rotate-z-2 group-hover:rotate-0 transition-transform duration-700 ease-out shadow-2xl">
          <Image
            src={hackathon.image}
            alt={`${hackathon.title} event`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover rounded-lg border border-white/10"
          />
          <div className="absolute -bottom-10 left-0 right-0 h-10 bg-gradient-to-t from-accent/20 to-transparent blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-6">
          <div className="inline-block px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-[10px] text-red-400 font-medium mb-3 tracking-widest uppercase">
            Mission Report
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{hackathon.title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">{hackathon.description}</p>
        </div>

        {hackathon.teamMembers && hackathon.teamMembers.length > 0 && (
          <div className="mb-6">
            <span className="text-xs text-neutral-500 font-medium block mb-2">SQUAD_MEMBERS</span>
            <div className="flex -space-x-3">
              {hackathon.teamMembers.map((member, i) => (
                <div key={i} className="relative group/member">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-neutral-800 flex items-center justify-center text-xs font-bold text-white overflow-hidden" title={member.name}>
                    {member.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/member:opacity-100 whitespace-nowrap border border-white/10 transition-opacity z-20">
                    {member.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 border-t border-white/5 pt-6">
          {hackathon.githubLink && (
            <a href={hackathon.githubLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
              <FaGithub /> Codebase
            </a>
          )}
          {hackathon.demoLink && (
            <a href={hackathon.demoLink} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent flex items-center gap-2 text-sm transition-colors">
              <FaExternalLinkAlt /> Live Deployment
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);


// --- MAIN COMPONENT ---
const Achievements = () => {
  const { certificates, hackathons, loading } = usePortfolio();

  return (
    <section id="achievements" className="py-32 bg-background relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">

        <div className="mb-20">
          <span className="text-accent font-medium text-sm tracking-wider uppercase">Credentials</span>
          <h2 className="font-sans text-4xl md:text-5xl font-bold mt-2 text-white">
            Proof of <span className="text-neutral-500">Work.</span>
          </h2>
        </div>

        {/* 1. Certificates Grid */}
        <div className="mb-32">
          <h3 className="text-2xl font-bold text-white mb-10 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent"></span>
            Certifications
          </h3>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[1.586/1] rounded-xl bg-white/5 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1000">
              {certificates.map((cert) => (
                <TiltCard key={cert._id || cert.id} cert={cert} />
              ))}
            </div>
          )}
        </div>


      </div>
    </section>
  );
};

export default Achievements;