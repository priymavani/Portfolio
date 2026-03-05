import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="resume" ref={ref} className="py-20 md:py-32 bg-[#030303] relative border-t border-white/5">

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Resume" subtitle="Professional Dossier" />

        <motion.div
          className="mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-[#0A0A0A] rounded-xl overflow-hidden border border-white/10 relative">

            {/* Top Bar - Browser/Terminal Style */}
            <div className="h-10 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <div className="ml-4 px-3 py-1 bg-[#030303] rounded text-[10px] text-neutral-500 font-medium">
                resume_preview.pdf
              </div>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left: Preview */}
              <div className="p-8 bg-[#050505] flex items-center justify-center border-r border-white/5">
                <div className="relative w-full aspect-[3/4] max-w-sm shadow-2xl border border-white/10 rounded-sm overflow-hidden bg-white">
                  <iframe
                    src="/Resume_PriyMavani.pdf"
                    title="Resume Preview"
                    className="w-full h-full"
                    style={{ border: 'none', pointerEvents: 'none' }} // Disable interaction for cleaner look
                  />
                  {/* Hover overlay to indicate download */}
                  <div className="absolute inset-0 bg-[#030303]/0 hover:bg-[#030303]/10 transition-colors"></div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="p-10 flex flex-col justify-center bg-[#0A0A0A]">
                <h3 className="font-display text-3xl font-bold text-[#3B82F6] mb-4">Ready to collaborate?</h3>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  My resume provides a detailed overview of my technical stack, professional experience, and key accomplishments. Download it to see how I can contribute to your team.
                </p>

                <div className="flex flex-col gap-4">
                  <a href="/Resume_PriyMavani.pdf" download className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent-glow text-white font-medium rounded-md text-base transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    <span>Download PDF</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </a>
                  <a href="/resume" target="_self" className="w-full inline-flex items-center justify-center px-6 py-4 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white border border-white/10 hover:border-accent rounded-md text-base font-medium transition-all duration-200">
                    Open in Browser
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-xs text-neutral-500 font-medium text-center uppercase tracking-widest">
                    Last Updated: January 2026
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;