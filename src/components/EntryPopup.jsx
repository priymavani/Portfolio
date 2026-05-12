'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EntryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup shortly after the component mounts (simulating loading complete)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // 1.5 second delay
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full text-gray-400 hover:text-white transition-colors border border-white/10"
              aria-label="Close popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Top - Image Area */}
            <div className="w-full relative bg-[#050505] flex items-center justify-center border-b border-white/5 overflow-hidden group p-2 sm:p-4">
              <img 
                src="https://res.cloudinary.com/dd6lqkak0/image/upload/v1778579317/Eklvya_poster-2_vef7ru.png" 
                alt="Hackathon Team" 
                className="w-full h-auto max-h-[45vh] object-contain opacity-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>

            {/* Bottom - Content Area */}
            <div className="w-full p-6 sm:p-8 flex flex-col justify-center">
              
              {/* Hackathon Winner Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🏆</span>
                <span className="text-accent-glow font-bold tracking-widest text-xs uppercase">Hackathon Winner</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                Doppelgänger Hackathon Openpools
              </h2>
              
              {/* Rank / Name */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">🥇</span>
                <p className="text-gray-300 font-medium">
                  1st Rank &mdash; <span className="text-white font-bold">Team Eklavya</span>
                </p>
              </div>

              {/* Divider */}
              <div className="w-12 h-1 bg-accent rounded-full mb-6"></div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8 text-sm md:text-base">
                Built <strong className="text-gray-200">Azure AI Code Assistant</strong> — an AI-powered VS Code extension with a RAG-based architecture (vector retrieval + LLM) that delivers context-aware Azure SDK code completions directly in the editor. <strong className="text-gray-200">30-Hour sprint.</strong>
              </p>

              {/* Action Buttons */}
              <div className="mt-auto pt-2">
                <a 
                  href="https://azure-ai-code-assistant.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-full px-8 py-4 font-bold text-white transition-all duration-300 bg-accent rounded-xl hover:bg-accent-glow hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Live Project
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </a>
              </div>
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EntryPopup;
