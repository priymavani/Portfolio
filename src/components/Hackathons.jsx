'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HackathonCard from './HackathonCard';
import HackathonModal from './HackathonModal';
import { usePortfolio } from '../contexts/PortfolioContext';

const Hackathons = () => {
    const { hackathons, loading } = usePortfolio();
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (hackathon) => {
        setSelectedHackathon(hackathon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedHackathon(null), 300); // Clear after animation
    };

    if (loading) {
        return (
            <section
                id="hackathons"
                className="py-20 bg-background relative z-10 flex items-center justify-center min-h-[400px]"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                    <p className="text-white/60 font-mono text-sm">Loading Hackathons...</p>
                </div>
            </section>
        );
    }

    if (hackathons.length === 0) {
        return null;
    }

    return (
        <>
            <section
                id="hackathons"
                className="py-20 lg:py-32 bg-background relative z-10"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1400px]">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 lg:mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-3">
                            Hackathons
                        </h2>
                        <p className="text-lg text-white/60 leading-relaxed">
                            Competitions I've participated in
                        </p>
                    </motion.div>

                    {/* Hackathon Cards */}
                    <div className="space-y-8">
                        {hackathons.map((hackathon, index) => (
                            <HackathonCard
                                key={hackathon._id}
                                hackathon={hackathon}
                                onClick={() => openModal(hackathon)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <HackathonModal
                hackathon={selectedHackathon}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
};

export default Hackathons;
