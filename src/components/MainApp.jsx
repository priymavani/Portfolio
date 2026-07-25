"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import Cursor from './ui/Cursor';
import Achievements from './Achievements';
import Resume from './Resume';
import { motion, AnimatePresence } from 'framer-motion';
import MorphText from './ui/MorphText';

function MainApp() {
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Counter Animation
        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 15); // Adjust speed here

        const timer = window.setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            window.clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="relative bg-[#030303] min-h-screen text-white selection:bg-[#D9FF00] selection:text-black">
            <AnimatePresence mode='wait'>
                {loading && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303]"
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
                    >
                        <div className="relative flex flex-col items-center">
                            {/* Technical Counter */}
                            <motion.div
                                className="font-display text-8xl md:text-9xl font-bold text-[#222]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {counter}%
                            </motion.div>

                            {/* Overlay Text that fills up */}
                            <motion.div
                                className="absolute inset-0 font-display text-8xl md:text-9xl font-bold text-white overflow-hidden flex justify-center"
                                style={{ clipPath: `inset(${100 - counter}% 0 0 0)` }}
                            >
                                {counter}%
                            </motion.div>

                            <div className="mt-4 font-medium text-xs text-[#D9FF00] uppercase tracking-widest">
                                Initializing System . . .
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && (
                <>
                    <Cursor />
                    <Header />
                    <main>
                        <Hero />
                        <About />
                        <Projects />
                        <Achievements />
                        <Resume />
                        <Contact />
                    </main>
                    <section className="w-full py-24 flex justify-center items-center overflow-hidden">
                        <MorphText words={["PRIY MAVANI", "DEVELOPER", "BUILD", "SHIP"]} subtext="The Art of Code" />
                    </section>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default MainApp;