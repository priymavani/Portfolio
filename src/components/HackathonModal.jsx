'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Medal, Award, FileCheck, Link2, ChevronRight,
    MapPin, Clock, Globe, User, Play, Pause, CheckCircle2,
    ChevronLeft, ChevronRight as ChevronRightIcon, X
} from 'lucide-react';

const HackathonModal = ({ hackathon, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const autoPlayIntervalRef = useRef(null);

    // Get badge configuration (same as card)
    const getBadgeConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'winner':
                return {
                    icon: Trophy,
                    text: 'WINNER',
                    className: 'bg-gradient-to-r from-[#f59e0b] via-[#f59e0b] to-[#d97706] text-black shadow-[0_4px_16px_rgba(245,158,11,0.5)]'
                };
            case 'finalist':
                return {
                    icon: Medal,
                    text: 'FINALIST',
                    className: 'bg-gradient-to-r from-[#dc2626] via-[#dc2626] to-[#b91c1c] text-white shadow-[0_4px_16px_rgba(220,38,38,0.5)]'
                };
            case 'runner-up':
                return {
                    icon: Award,
                    text: 'TOP 10',
                    className: 'bg-gradient-to-r from-[#cd7f32] via-[#cd7f32] to-[#b8732d] text-white shadow-[0_4px_16px_rgba(205,127,50,0.5)]'
                };
            default:
                return {
                    icon: FileCheck,
                    text: 'PARTICIPATED',
                    className: 'bg-accent/15 text-accent border border-accent/40 shadow-[0_2px_8px_rgba(59,130,246,0.2)]'
                };
        }
    };

    const badge = getBadgeConfig(hackathon?.finalStatus);
    const images = hackathon?.images || [];
    const totalImages = images.length;

    // Format date
    const formattedDate = hackathon?.date
        ? new Date(hackathon.date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })
        : '';

    // Gallery navigation
    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    };

    // Auto-play carousel
    useEffect(() => {
        if (!isOpen || !isPlaying || totalImages <= 1) {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
            return;
        }

        autoPlayIntervalRef.current = setInterval(() => {
            goToNext();
        }, 3000); // Change image every 3 seconds

        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, [isOpen, isPlaying, currentImageIndex, totalImages]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                setIsPlaying(false); // Pause on manual navigation
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                setIsPlaying(false); // Pause on manual navigation
                goToNext();
            } else if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying(!isPlaying); // Toggle play/pause with spacebar
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isPlaying, currentImageIndex]);

    // Focus management
    useEffect(() => {
        if (isOpen && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Reset carousel when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            setIsPlaying(true);
        }
    }, [isOpen]);

    // Collect all unique project links from stages
    const projectLinks = hackathon?.stages
        ?.filter(stage => stage.projectLink || stage.projectName)
        .map(stage => ({
            name: stage.projectName || stage.projectTitle || 'Project',
            link: stage.projectLink,
            stageName: stage.stageName || stage.stageType
        }))
        .filter((item, index, self) =>
            index === self.findIndex(t => t.link === item.link)
        ) || [];

    if (!hackathon) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4 sm:p-6"
                    >
                        {/* Modal Container */}
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-[1000px] max-h-[90vh] bg-surface border border-white/10 rounded-2xl p-6 sm:p-10 
                         relative overflow-y-auto shadow-[0_24px_60px_rgba(0,0,0,0.9)]
                         scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                        >
                            {/* Close Button */}
                            <button
                                ref={closeButtonRef}
                                onClick={onClose}
                                aria-label="Close modal"
                                className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 flex items-center justify-center 
                           text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 z-10"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Header */}
                            <div className="mb-8 pr-12">
                                <h2 id="modal-title" className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                                    {hackathon.title}
                                </h2>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider ${badge.className}`}>
                                        <badge.icon size={16} strokeWidth={2.5} />
                                        <span>{badge.text}</span>
                                    </div>
                                    <span className="text-white/30 text-lg">•</span>
                                    <span className="text-white/70 text-base font-medium">{formattedDate}</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/10 mb-8" />

                            {/* Photo Gallery with Auto-Carousel */}
                            {totalImages > 0 && (
                                <div className="mb-10" role="region" aria-label="Photo gallery">
                                    {/* Flexible container that adapts to image orientation */}
                                    <div className="relative w-full max-h-[600px] min-h-[300px] rounded-xl overflow-hidden bg-black border border-white/10">
                                        {/* Current Image - uses object-contain to show full image */}
                                        <div className="relative w-full h-[600px] flex items-center justify-center">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentImageIndex}
                                                    src={images[currentImageIndex]}
                                                    alt={`${hackathon.title} - Image ${currentImageIndex + 1} of ${totalImages}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </AnimatePresence>
                                        </div>

                                        {/* Navigation Arrows */}
                                        {totalImages > 1 && (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsPlaying(false);
                                                        goToPrevious();
                                                    }}
                                                    aria-label="Previous image"
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center
                                     bg-black/70 border border-white/20 rounded-full text-white text-xl
                                     hover:bg-black/90 hover:border-accent/50 hover:scale-110 transition-all duration-200 z-10"
                                                >
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsPlaying(false);
                                                        goToNext();
                                                    }}
                                                    aria-label="Next image"
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center
                                     bg-black/70 border border-white/20 rounded-full text-white text-xl
                                     hover:bg-black/90 hover:border-accent/50 hover:scale-110 transition-all duration-200 z-10"
                                                >
                                                    <ChevronRightIcon size={24} />
                                                </button>
                                            </>
                                        )}

                                        {/* Play/Pause Button */}
                                        {totalImages > 1 && (
                                            <button
                                                onClick={() => setIsPlaying(!isPlaying)}
                                                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                                                className="absolute bottom-4 left-4 w-10 h-10 flex items-center justify-center
                                   bg-black/70 border border-white/20 rounded-full text-white text-sm
                                   hover:bg-black/90 hover:border-accent/50 hover:scale-110 transition-all duration-200 z-10"
                                            >
                                                {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                                            </button>
                                        )}

                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-mono rounded-lg border border-white/10">
                                            {currentImageIndex + 1}/{totalImages}
                                        </div>
                                    </div>

                                    {/* Dot Navigation */}
                                    {totalImages > 1 && (
                                        <div className="flex items-center justify-center gap-2 mt-5">
                                            {images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => {
                                                        setIsPlaying(false);
                                                        setCurrentImageIndex(idx);
                                                    }}
                                                    aria-label={`Go to image ${idx + 1}`}
                                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                                        ? 'w-8 bg-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                                                        : 'w-2 bg-white/30 hover:bg-white/50'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Project Links Section */}
                            {projectLinks.length > 0 && (
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-7 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
                                        <h3 className="text-white text-xl font-bold uppercase tracking-wide">Project Links</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {projectLinks.map((project, idx) => (
                                            <a
                                                key={idx}
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] 
                                   border border-white/10 hover:border-accent/50 transition-all duration-300
                                   hover:shadow-[0_8px_24px_rgba(59,130,246,0.2)] hover:-translate-y-1"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Link2 size={18} className="text-accent" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-semibold text-base truncate group-hover:text-accent transition-colors">
                                                        {project.name}
                                                    </p>
                                                    <p className="text-white/50 text-xs truncate">
                                                        {project.stageName}
                                                    </p>
                                                </div>
                                                <ChevronRight size={18} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* What We Did Section */}
                            {hackathon.stages?.length > 0 && (
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-7 bg-gradient-to-b from-[#22c55e] to-[#22c55e]/50 rounded-full" />
                                        <h3 className="text-white text-xl font-bold uppercase tracking-wide">Our Journey</h3>
                                    </div>
                                    <ul className="space-y-4 pl-1">
                                        {hackathon.stages.map((stage, idx) => (
                                            <li key={idx} className="flex items-start gap-4 group">
                                                <CheckCircle2 size={20} className="text-accent mt-0.5 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="flex items-baseline gap-3 flex-wrap">
                                                        <strong className="text-white font-semibold text-lg">{stage.stageName || stage.stageType}</strong>
                                                        {stage.status && stage.status !== 'skipped' && (
                                                            <span className="text-xs px-2 py-1 rounded-md bg-[#22c55e]/10 text-[#22c55e] font-medium border border-[#22c55e]/20">
                                                                {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)} ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                    {stage.description && (
                                                        <p className="text-white/60 text-sm mt-1 leading-relaxed">{stage.description}</p>
                                                    )}
                                                    {/* Stage details */}
                                                    {(stage.mode || stage.duration || stage.location) && (
                                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                                                            {stage.mode && (
                                                                <span className="flex items-center gap-1">
                                                                    <MapPin size={12} />
                                                                    {stage.mode}
                                                                </span>
                                                            )}
                                                            {stage.duration && (
                                                                <span className="flex items-center gap-1">
                                                                    <Clock size={12} />
                                                                    {stage.duration}
                                                                </span>
                                                            )}
                                                            {stage.location && (
                                                                <span className="flex items-center gap-1">
                                                                    <Globe size={12} />
                                                                    {stage.location}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Team Members Section */}
                            {hackathon.teamMembers?.length > 0 && (
                                <div className="mb-10">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-1 h-7 bg-gradient-to-b from-[#f59e0b] to-[#f59e0b]/50 rounded-full" />
                                        <h3 className="text-white text-xl font-bold uppercase tracking-wide">The Team</h3>
                                    </div>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {hackathon.teamMembers.map((member, idx) => (
                                            <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors">
                                                <User size={20} className="text-white/60 flex-shrink-0" />
                                                <span className="text-base flex-1 min-w-0">
                                                    <span className="text-white font-semibold block truncate">{member.name}</span>
                                                    {member.role && (
                                                        <span className="text-white/50 text-sm truncate block">{member.role}</span>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Details Section */}
                            {(hackathon.stages?.some(s => s.location) || hackathon.stages?.some(s => s.duration)) && (
                                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-6">
                                    {hackathon.stages?.find(s => s.location) && (
                                        <div className="text-sm flex items-center gap-2">
                                            <MapPin size={16} className="text-white/60" />
                                            <span className="text-white/60 font-medium">Location:</span>
                                            <span className="text-white/90">{hackathon.stages.find(s => s.location).location}</span>
                                        </div>
                                    )}
                                    {hackathon.stages?.find(s => s.duration) && (
                                        <div className="text-sm flex items-center gap-2">
                                            <Clock size={16} className="text-white/60" />
                                            <span className="text-white/60 font-medium">Duration:</span>
                                            <span className="text-white/90">{hackathon.stages.find(s => s.duration).duration}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default HackathonModal;
