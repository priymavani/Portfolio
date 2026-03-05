'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function ResumePreview() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col">

            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium"
                    >
                        <FaArrowLeft size={14} />
                        <span>Back to Portfolio</span>
                    </Link>

                    {/* File Name */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        <span className="ml-2 text-xs text-neutral-500 font-medium">Resume_PriyMavani.pdf</span>
                    </div>

                    {/* Download Button */}
                    <a
                        href="/Resume_PriyMavani.pdf"
                        download
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold rounded-md text-sm transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                        <FaDownload size={14} />
                        <span>Download PDF</span>
                    </a>
                </div>
            </header>

            {/* PDF Preview */}
            <motion.main
                className="flex-1 flex items-center justify-center p-4 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full max-w-4xl h-[calc(100vh-8rem)] bg-white rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                    <iframe
                        src="/Resume_PriyMavani.pdf"
                        title="Resume Preview"
                        className="w-full h-full"
                        style={{ border: 'none' }}
                    />
                </div>
            </motion.main>
        </div>
    );
}
