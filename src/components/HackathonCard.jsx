'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Trophy, Medal, Award, FileCheck, Camera, Users,
    MapPin, Clock, Globe, ChevronRight, CheckCircle2
} from 'lucide-react';

const HackathonCard = ({ hackathon, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Get badge configuration based on finalStatus
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

    // Enhanced stage visualization with better storytelling
    const getStageVisualization = (status) => {
        const s = status?.toLowerCase();
        if (s === 'won') {
            return {
                dotColor: 'bg-[#22c55e]',
                ringColor: 'ring-2 ring-[#22c55e]/40',
                glow: 'shadow-[0_0_8px_rgba(34,197,94,0.4)]',
                icon: true,
                iconColor: 'text-black',
                textColor: 'text-[#22c55e]'
            };
        }
        if (s === 'qualified' || s === 'selected') {
            return {
                dotColor: 'bg-[#22c55e]',
                ringColor: 'ring-2 ring-[#22c55e]/30',
                glow: 'shadow-[0_0_6px_rgba(34,197,94,0.3)]',
                icon: true,
                iconColor: 'text-black',
                textColor: 'text-white'
            };
        }
        if (s === 'participated') {
            return {
                dotColor: 'bg-white/15',
                ringColor: 'ring-1 ring-white/20',
                glow: '',
                icon: true,
                iconColor: 'text-white/60',
                textColor: 'text-white/90'
            };
        }
        if (s === 'skipped') {
            return {
                dotColor: 'bg-white/5',
                ringColor: '',
                glow: '',
                icon: false,
                iconColor: '',
                textColor: 'text-white/40'
            };
        }
        return {
            dotColor: 'bg-accent',
            ringColor: 'ring-2 ring-accent/30',
            glow: 'shadow-[0_0_6px_rgba(59,130,246,0.3)]',
            icon: true,
            iconColor: 'text-black',
            textColor: 'text-white/90'
        };
    };

    const badge = getBadgeConfig(hackathon.finalStatus);
    const heroImage = hackathon.images?.[0];
    const photoCount = hackathon.images?.length || 0;

    // Format date
    const formattedDate = hackathon.date
        ? new Date(hackathon.date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        })
        : '';

    // Get team display
    const teamDisplay = hackathon.teamMembers?.length > 0
        ? hackathon.teamMembers.map(m => m.name).join(', ')
        : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${hackathon.title}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            className="group w-full max-w-[900px] mx-auto bg-surface border border-white/10 rounded-2xl p-8 sm:p-10
                 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2
                 hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:border-accent/60
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4
                 relative overflow-hidden"
        >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
                {/* Badge + Date Row */}
                <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider ${badge.className}`}>
                        <badge.icon size={16} strokeWidth={2.5} />
                        <span>{badge.text}</span>
                    </div>

                    {formattedDate && (
                        <span className="text-white/50 text-xs font-mono tracking-wider uppercase">
                            {formattedDate}
                        </span>
                    )}
                </div>

                {/* Hackathon Title - HIGHLY VISIBLE */}
                <h3 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-6 tracking-tight
                       group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                       group-hover:from-white group-hover:via-accent group-hover:to-white
                       transition-all duration-300">
                    {hackathon.title}
                </h3>

                {/* Journey Visualization - STORYTELLING FOCUS */}
                {hackathon.stages?.length > 0 && (
                    <div className="mb-8 bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl p-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
                            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest">
                                The Journey
                            </h4>
                        </div>

                        {/* Vertical Timeline */}
                        <div className="space-y-4 pl-4">
                            {hackathon.stages.map((stage, idx) => {
                                const viz = getStageVisualization(stage.status);
                                const isLast = idx === hackathon.stages.length - 1;

                                return (
                                    <div key={idx} className="relative">
                                        {/* Connecting line */}
                                        {!isLast && (
                                            <div className="absolute left-[11px] top-[28px] bottom-[-16px] w-0.5 bg-gradient-to-b from-white/20 to-white/5" />
                                        )}

                                        {/* Stage content */}
                                        <div className="flex items-start gap-4">
                                            {/* Stage indicator */}
                                            <div className={`relative flex-shrink-0 w-6 h-6 rounded-full ${viz.dotColor} ${viz.ringColor} ${viz.glow} flex items-center justify-center`}>
                                                {viz.icon && (
                                                    <CheckCircle2 size={14} strokeWidth={3} className={viz.iconColor} />
                                                )}
                                            </div>

                                            {/* Stage info */}
                                            <div className="flex-1 pt-0.5">
                                                <div className="flex items-baseline gap-3 flex-wrap">
                                                    <span className={`text-base font-semibold ${viz.textColor}`}>
                                                        {stage.stageName || stage.stageType}
                                                    </span>
                                                    {stage.status && stage.status !== 'skipped' && (
                                                        <span className="text-xs px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] font-medium">
                                                            {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Optional stage details */}
                                                {(stage.mode || stage.duration || stage.location) && (
                                                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
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
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Team Members */}
                <div className="mb-6 flex items-center gap-2 text-sm">
                    <Users size={16} className="text-white/50" />
                    <span className="text-white/50 font-medium">Team:</span>
                    {teamDisplay ? (
                        <span className="text-white/90">{teamDisplay}</span>
                    ) : (
                        <span className="text-accent italic">Solo Project</span>
                    )}
                </div>

                {/* Hero Image (moved to bottom for better flow) */}
                {heroImage && (
                    <div className="relative w-full max-h-[400px] min-h-[250px] rounded-xl overflow-hidden bg-black border border-white/10 mb-6">
                        <div className="relative w-full h-[400px] flex items-center justify-center">
                            <img
                                src={heroImage}
                                alt={`${hackathon.title} showcase`}
                                onLoad={() => setImageLoaded(true)}
                                className={`max-w-full max-h-full object-contain transition-all duration-500 ${imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'
                                    } group-hover:scale-105`}
                            />
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                                </div>
                            )}

                            {/* Photo count badge */}
                            {photoCount > 1 && (
                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-white text-xs font-mono flex items-center gap-1.5">
                                    <Camera size={14} />
                                    <span>{photoCount} photos</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* CTA Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5
                     bg-gradient-to-r from-accent/90 to-accent text-white font-semibold rounded-xl
                     transition-all duration-200 hover:from-accent hover:to-accent/90
                     hover:shadow-[0_8px_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5
                     active:translate-y-0"
                >
                    <span>View Full Story</span>
                    <ChevronRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </motion.article>
    );
};

export default HackathonCard;
