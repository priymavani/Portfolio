'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import dynamic from 'next/dynamic';

const DynamicDevicon = dynamic(() => import('./ui/DynamicDevicon'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-white/5 animate-pulse rounded-full" />
});

const categoryMeta = {
    'Frontend': {
        title: '// FRONTEND ECOSYSTEM',
        description: 'Building immersive, pixel-perfect interfaces.',
        cols: 'md:col-span-6 lg:col-span-6',
    },
    'Backend': {
        title: '// BACKEND & DATABASE',
        description: 'Architecting scalable, secure server-side logic.',
        cols: 'md:col-span-6 lg:col-span-6',
    },
    'Database': {
        title: '// DATABASE SYSTEMS',
        description: 'Managing structured and unstructured data store.',
        cols: 'md:col-span-6 lg:col-span-4',
    },
    'DevOps': {
        title: '// DEVOPS & DEPLOYMENT',
        description: 'CI/CD pipelines, containerization, and hosting.',
        cols: 'md:col-span-6 lg:col-span-4',
    },
    'Tools & Technologies': {
        title: '// CLOUD & TOOLS',
        description: 'DevOps, deployment, and workflow efficiency.',
        cols: 'md:col-span-6 lg:col-span-8',
    },
    'Other Skills': {
        title: '// ADDITIONAL EXPERTISE',
        description: 'Valuable auxiliary soft and technical capabilities.',
        cols: 'md:col-span-6 lg:col-span-4',
    },
    'Core Engineering': {
        title: '// CORE ENGINEERING',
        description: 'Deep understanding of algorithms and systems.',
        cols: 'md:col-span-6 lg:col-span-4',
    }
};

const skillColorMap = {
    // Frontend
    'react': '#61DAFB',
    'sireact': '#61DAFB',
    'next.js': '#FFFFFF',
    'sinextdotjs': '#FFFFFF',
    'javascript': '#F7DF1E',
    'sijavascript': '#F7DF1E',
    'tailwind': '#06B6D4',
    'sitailwindcss': '#06B6D4',
    'html': '#E34F26',
    'html5': '#E34F26',
    'fahtml5': '#E34F26',
    'sihtml5': '#E34F26',
    'css': '#1572B6',
    'css3': '#1572B6',
    'facss3': '#1572B6',
    'sicss3': '#1572B6',
    'framer': '#0055FF',
    'siframer': '#0055FF',
    'typescript': '#3178C6',
    'sitypescript': '#3178C6',

    // Backend / DB
    'node.js': '#339933',
    'fanodejs': '#339933',
    'sinodedotjs': '#339933',
    'spring boot': '#6DB33F',
    'sispringboot': '#6DB33F',
    'express': '#ffffff',
    'siexpress': '#ffffff',
    'mongodb': '#47A248',
    'simongodb': '#47A248',
    'postgresql': '#4169E1',
    'sipostgresql': '#4169E1',
    'mysql': '#4479A1',
    'simysql': '#4479A1',

    // Core
    'java': '#007396',
    'fajava': '#007396',
    'c++': '#00599C',
    'sicplusplus': '#00599C',
    'dsa': '#FFD700',
    'fabrain': '#FFD700',

    // Cloud / Tools
    'aws': '#FF9900',
    'faaws': '#FF9900',
    'siamazonaws': '#FF9900',
    'git': '#F05032',
    'fagitalt': '#F05032',
    'sigit': '#F05032',
    'github': '#ffffff',
    'fagithub': '#ffffff',
    'sigithub': '#ffffff',
    'vs code': '#007ACC',
    'vscvscode': '#007ACC',
    'postman': '#FF6C37',
    'sipostman': '#FF6C37',
    'vercel': '#ffffff',
    'sivercel': '#ffffff',
};

// Fallback static data if DB is empty/loading
const staticSkillCategories = [
    {
        id: 'frontend',
        title: '// FRONTEND ECOSYSTEM',
        description: 'Building immersive, pixel-perfect interfaces.',
        cols: 'md:col-span-6 lg:col-span-6',
        skills: [
            { name: 'Next.js', iconName: 'SiNextdotjs', color: '#FFFFFF' },
            { name: 'React', iconName: 'FaReact', color: '#61DAFB' },
            { name: 'JavaScript', iconName: 'SiJavascript', color: '#F7DF1E' },
            { name: 'Tailwind', iconName: 'SiTailwindcss', color: '#06B6D4' },
            { name: 'HTML5', iconName: 'FaHtml5', color: '#E34F26' },
            { name: 'CSS3', iconName: 'FaCss3', color: '#1572B6' },
            { name: 'Framer', iconName: 'SiFramer', color: '#0055FF' },
        ]
    },
    {
        id: 'backend',
        title: '// BACKEND & DATABASE',
        description: 'Architecting scalable, secure server-side logic.',
        cols: 'md:col-span-6 lg:col-span-6',
        skills: [
            { name: 'Node.js', iconName: 'FaNodeJs', color: '#339933' },
            { name: 'Spring Boot', iconName: 'SiSpringboot', color: '#6DB33F' },
            { name: 'Express', iconName: 'SiExpress', color: '#ffffff' },
            { name: 'MongoDB', iconName: 'SiMongodb', color: '#47A248' },
            { name: 'PostgreSQL', iconName: 'SiPostgresql', color: '#4169E1' },
            { name: 'MySQL', iconName: 'SiMysql', color: '#4479A1' },
        ]
    },
    {
        id: 'core',
        title: '// CORE ENGINEERING',
        description: 'Deep understanding of algorithms and systems.',
        cols: 'md:col-span-6 lg:col-span-4',
        skills: [
            { name: 'Java', iconName: 'FaJava', color: '#007396' },
            { name: 'C++', iconName: 'SiCplusplus', color: '#00599C' },
            { name: 'DSA', iconName: 'FaBrain', color: '#FFD700' },
        ]
    },
    {
        id: 'tools',
        title: '// CLOUD & TOOLS',
        description: 'DevOps, deployment, and workflow efficiency.',
        cols: 'md:col-span-6 lg:col-span-8',
        skills: [
            { name: 'AWS', iconName: 'FaAws', color: '#FF9900' },
            { name: 'Git', iconName: 'FaGitAlt', color: '#F05032' },
            { name: 'GitHub', iconName: 'FaGithub', color: '#ffffff' },
            { name: 'VS Code', iconName: 'VscVscode', color: '#007ACC' },
            { name: 'Postman', iconName: 'SiPostman', color: '#FF6C37' },
            { name: 'Vercel', iconName: 'SiVercel', color: '#ffffff' },
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
    const { skills: dbSkills, loading } = usePortfolio();

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

    // Transform DB skills or fallback to static skills
    const displayCategories = (dbSkills && dbSkills.length > 0)
        ? dbSkills.map(category => {
            const meta = categoryMeta[category.category] || {
                title: `// ${category.category.toUpperCase()}`,
                description: 'Expertise and technical capabilities.',
                cols: 'md:col-span-6 lg:col-span-4'
            };
            return {
                id: category.category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                title: meta.title,
                description: meta.description,
                cols: meta.cols,
                skills: category.items.map(item => {
                    const iconName = item.icon || 'FaCode';
                    const color = skillColorMap[iconName.toLowerCase()] || skillColorMap[item.name.toLowerCase()] || '#D9FF00';
                    return {
                        name: item.name,
                        iconName: iconName,
                        isMono: item.isMono || false,
                        color: color
                    };
                })
            };
        })
        : staticSkillCategories.map(cat => ({
            ...cat,
            skills: cat.skills.map(s => ({
                name: s.name,
                iconName: s.iconName,
                isMono: s.isMono || false,
                color: s.color
            }))
        }));

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

                    {displayCategories.map((category) => (
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
                                    {category.skills.map((skill, idx) => {
                                        return (
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
                                                        <DynamicDevicon iconName={skill.iconName} isMono={skill.isMono} size="1.25em" />
                                                    </span>
                                                </div>

                                                {/* Label - FIXED FONT FAMILY */}
                                                <span className="text-xs text-neutral-300 font-medium group-hover:text-white transition-colors text-center truncate w-full">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        );
                                    })}
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