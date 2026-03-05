'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FaReact, FaHtml5, FaCss3, FaNodeJs, FaJava, FaAws, FaGitAlt, FaGithub, FaBrain
} from 'react-icons/fa';
import {
    SiNextdotjs, SiJavascript, SiTailwindcss, SiFramer,
    SiSpringboot, SiExpress, SiMongodb, SiPostgresql, SiMysql,
    SiCplusplus, SiPostman, SiVercel
} from 'react-icons/si';
// Using the official VS Code icon library
import { VscVscode } from 'react-icons/vsc';


const skillCategories = [
    {
        id: 'frontend',
        title: '// FRONTEND ECOSYSTEM',
        description: 'Building immersive, pixel-perfect interfaces.',
        cols: 'md:col-span-6 lg:col-span-6',
        skills: [
            { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
            { name: 'React', icon: FaReact, color: '#61DAFB' },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
            { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
            { name: 'CSS3', icon: FaCss3, color: '#1572B6' },
            { name: 'Framer', icon: SiFramer, color: '#0055FF' },
        ]
    },
    {
        id: 'backend',
        title: '// BACKEND & DATABASE',
        description: 'Architecting scalable, secure server-side logic.',
        cols: 'md:col-span-6 lg:col-span-6',
        skills: [
            { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
            { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
            { name: 'Express', icon: SiExpress, color: '#ffffff' },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
            { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        ]
    },
    {
        id: 'core',
        title: '// CORE ENGINEERING',
        description: 'Deep understanding of algorithms and systems.',
        cols: 'md:col-span-6 lg:col-span-4',
        skills: [
            { name: 'Java', icon: FaJava, color: '#007396' },
            { name: 'C++', icon: SiCplusplus, color: '#00599C' },
            { name: 'DSA', icon: FaBrain, color: '#FFD700' },
        ]
    },
    {
        id: 'tools',
        title: '// CLOUD & TOOLS',
        description: 'DevOps, deployment, and workflow efficiency.',
        cols: 'md:col-span-6 lg:col-span-8',
        skills: [
            { name: 'AWS', icon: FaAws, color: '#FF9900' },
            { name: 'Git', icon: FaGitAlt, color: '#F05032' },
            { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
            { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
            { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
            { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
        ]
    }
];

// --- COMPONENT: SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = "" }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setOpacity(1);
    };

    const handleBlur = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleFocus}
            onMouseLeave={handleBlur}
            className={`relative rounded-xl border border-white/10 bg-neutral-900/5 overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="skills" className="py-32 bg-background relative z-20">
            <div className="container mx-auto px-6" ref={ref}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-accent font-medium text-sm tracking-wider uppercase">Technical Arsenal</span>
                    <h2 className="font-sans text-4xl md:text-5xl font-bold mt-2 text-white">
                        The Systems <span className="text-neutral-500">I Engineer With.</span>
                    </h2>
                </motion.div>

                {/* The Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >

                    {skillCategories.map((category) => (
                        <motion.div key={category.id} variants={itemVariants} className={`${category.cols} row-span-1`}>
                            <SpotlightCard className="h-full bg-neutral-900/20 backdrop-blur-sm p-8 flex flex-col">

                                {/* Panel Header */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-medium text-neutral-400 mb-2 tracking-wider">{category.title}</h3>
                                    <p className="text-neutral-500 text-l max-w-sm">
                                        {category.description}
                                    </p>
                                </div>

                                {/* Icons Grid */}
                                <div className="flex flex-wrap gap-4">
                                    {category.skills.map((skill, idx) => (
                                        <div
                                            key={idx}
                                            className="group flex flex-col items-center justify-center gap-2 w-24 h-28 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 cursor-default"
                                        >
                                            {/* Icon Container */}
                                            <div
                                                className="text-3xl transition-all duration-500 group-hover:scale-110 mb-1"
                                                style={{
                                                    color: skill.color,
                                                    filter: 'drop-shadow(0 0 0 transparent)',
                                                }}
                                            >
                                                <span
                                                    className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 block"
                                                    style={{
                                                        filter: 'var(--hover-filter)',
                                                        '--hover-filter': `drop-shadow(0 0 10px ${skill.color})`
                                                    }}
                                                >
                                                    <style jsx>{`
                                .group:hover span {
                                    filter: drop-shadow(0 0 8px ${skill.color});
                                }
                            `}</style>
                                                    <skill.icon />
                                                </span>
                                            </div>

                                            {/* Label - FIXED FONT FAMILY */}
                                            {/* Removed 'font-medium'. Inherits default font (Inter). */}
                                            <span className="text-xs text-neutral-300 font-medium group-hover:text-white transition-colors text-center truncate w-full">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}

                </motion.div>
            </div>
   
         
        </section>
    );
};

export default Skills;