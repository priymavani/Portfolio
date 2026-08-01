'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then((mod) => mod.ActivityCalendar),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-white/5 animate-pulse rounded" />,
  }
);


const Hero = () => {
  const ref = useRef(null);
  const [stats, setStats] = useState({
    github: { total: 0, contributions: [] },
    leetcode: { total: 0, easy: 0, medium: 0, hard: 0 },
    loading: true
  });
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect screen size for conditional parallax
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Parallax Hooks (applied only on desktop)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.9]), { stiffness: 100, damping: 20 });

  // Fetch Live Data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();

        if (data.github) {
          // --- FILTER FOR LAST 6 MONTHS ---
          const today = new Date();
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(today.getMonth() - 6);

          // Filter contributions
          const recentContributions = data.github.contributions.filter(day =>
            new Date(day.date) >= sixMonthsAgo
          );

          setStats({
            ...data,
            github: {
              ...data.github,
              contributions: recentContributions
            },
            loading: false
          });
        }
      } catch (error) {
        console.error("Failed to load stats", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-20 lg:pb-0 overflow-hidden bg-background"
    >
      {/* Background Matrix */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_20%,#050505_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

          {/* IMAGE — order-2 on mobile (after text), order-1 on lg (left column) */}
          <motion.div
            className="lg:col-span-5 relative order-2 lg:order-1 flex h-[300px] sm:h-[350px] lg:h-[600px] items-end justify-center w-full"
            style={isDesktop ? { y, opacity, scale } : {}}
          >
            {/* Reactor Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-accent/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/5 rounded-full blur-[120px] -z-20"></div>
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-accent/10 to-transparent opacity-50 blur-2xl"></div>

            {/* Image */}
            <div className="relative z-10 w-full h-full flex items-end justify-center">
              <Image
                src="/profile-cutout.png"
                alt="Priy Mavani - Full Stack Engineer Profile Picture"
                width={600}
                height={600}
                priority
                className="w-auto h-full max-h-[300px] sm:max-h-[350px] lg:max-h-[600px] object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              />
            </div>
          </motion.div>

          {/* STATS CARDS — order-3 on mobile (after image), hidden on lg (rendered inside right col instead) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-3 lg:hidden grid grid-cols-1 gap-4"
          >
            {/* Card 1: GitHub Stats (Live Graph) */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity text-white">
                <FaGithub size={20} />
              </div>
              <div className="flex flex-col h-full justify-between gap-4">
                <div>
                  <h3 className="text-xs font-medium text-neutral-500 mb-1">GITHUB CONTRIBUTIONS</h3>
                  <div className="text-2xl font-bold text-white font-medium">
                    {stats.loading ? "..." : stats.github.total}
                    <span className="text-sm text-neutral-500 font-normal ml-2">Commits </span>
                  </div>
                </div>
                <div className="w-full overflow-x-auto overflow-y-hidden flex items-end opacity-90 pt-4">
                  {stats.loading ? (
                    <div className="w-full h-20 bg-white/5 animate-pulse rounded"></div>
                  ) : (
                    <ActivityCalendar
                      data={stats.github.contributions}
                      blockSize={9}
                      blockMargin={2}
                      fontSize={0}
                      hideColorLegend
                      hideMonthLabels
                      hideTotalCount
                      colorScheme="dark"
                      theme={{
                        dark: [
                          'rgba(255, 255, 255, 0.05)',
                          'rgba(59, 130, 246, 0.4)',
                          'rgba(59, 130, 246, 0.6)',
                          'rgba(59, 130, 246, 0.8)',
                          'rgba(59, 130, 246, 1)',
                        ],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Card 2: LeetCode Stats (Live Numbers) */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group hover:border-[#FFA116]/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity text-[#FFA116]">
                <SiLeetcode size={20} />
              </div>
              <div className="flex items-center gap-6 h-full">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1E1E1E" strokeWidth="8" />
                    {!stats.loading && (
                      <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round"
                        initial={{ strokeDasharray: 282.7, strokeDashoffset: 282.7 }}
                        animate={{ strokeDashoffset: 282.7 - (282.7 * Math.min(stats.leetcode.total / 500, 1)) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {stats.loading ? "..." : stats.leetcode.total}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-medium text-neutral-500 mb-2">LEETCODE SOLVED</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/5 rounded p-1">
                      <div className="text-[10px] text-teal-500 font-bold">EASY</div>
                      <div className="text-xs font-medium text-white">{stats.loading ? "-" : stats.leetcode.easy}</div>
                    </div>
                    <div className="bg-white/5 rounded p-1">
                      <div className="text-[10px] text-yellow-500 font-bold">MED</div>
                      <div className="text-xs font-medium text-white">{stats.loading ? "-" : stats.leetcode.medium}</div>
                    </div>
                    <div className="bg-white/5 rounded p-1">
                      <div className="text-[10px] text-red-500 font-bold">HARD</div>
                      <div className="text-xs font-medium text-white">{stats.loading ? "-" : stats.leetcode.hard}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interface — order-1 on mobile (first), order-2 on lg */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 w-fit mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400 tracking-wider">SYSTEM ONLINE // OPEN TO WORK</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Building digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                Architecture.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-neutral-400 max-w-2xl leading-relaxed mb-12"
            >
              I architect scalable digital ecosystems. As a <span className="text-white font-medium">Full Stack Engineer</span>,
              I specialize in high-performance React architectures, secure Node.js environments, and pixel-perfect
              design systems.
            </motion.p>

            {/* LIVE DATA HUD — Desktop only (hidden on mobile, shown via separate grid item above) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-4 mb-12"
            >
              {/* Card 1: GitHub Stats (Live Graph) */}
              <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity text-white">
                  <FaGithub size={20} />
                </div>
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-medium text-neutral-500 mb-1">GITHUB CONTRIBUTIONS</h3>
                    <div className="text-2xl font-bold text-white font-medium">
                      {stats.loading ? "..." : stats.github.total}
                      <span className="text-sm text-neutral-500 font-normal ml-2">Commits </span>
                    </div>
                  </div>
                  <div className="w-full overflow-hidden flex items-end opacity-90 pt-4">
                    {stats.loading ? (
                      <div className="w-full h-20 bg-white/5 animate-pulse rounded"></div>
                    ) : (
                      <ActivityCalendar
                        data={stats.github.contributions}
                        blockSize={11}
                        blockMargin={3}
                        fontSize={0}
                        hideColorLegend
                        hideMonthLabels
                        hideTotalCount
                        colorScheme="dark"
                        theme={{
                          dark: [
                            'rgba(255, 255, 255, 0.05)',
                            'rgba(59, 130, 246, 0.4)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(59, 130, 246, 1)',
                          ],
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: LeetCode Stats (Live Numbers) */}
              <div className="glass-panel p-5 rounded-xl border border-white/5 relative overflow-hidden group hover:border-[#FFA116]/30 transition-colors duration-300">
                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity text-[#FFA116]">
                  <SiLeetcode size={20} />
                </div>
                <div className="flex items-center gap-6 h-full">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1E1E1E" strokeWidth="8" />
                      {!stats.loading && (
                        <motion.circle
                          cx="50" cy="50" r="45"
                          fill="none" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round"
                          initial={{ strokeDasharray: 282.7, strokeDashoffset: 282.7 }}
                          animate={{ strokeDashoffset: 282.7 - (282.7 * Math.min(stats.leetcode.total / 500, 1)) }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {stats.loading ? "..." : stats.leetcode.total}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-neutral-500 mb-2">LEETCODE SOLVED</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white/5 rounded p-1">
                        <div className="text-[10px] text-teal-500 font-bold">EASY</div>
                        <div className="text-xs font-medium text-white">{stats.loading ? "-" : stats.leetcode.easy}</div>
                      </div>
                      <div className="bg-white/5 rounded p-1">
                        <div className="text-[10px] text-yellow-500 font-bold">MED</div>
                        <div className="text-xs font-medium text-white">{stats.loading ? "-" : stats.leetcode.medium}</div>
                      </div>
                      <div className="bg-white/5 rounded p-1">
                        <div className="text-[10px] text-red-500 font-bold">HARD</div>
                        <div className="text-xs font-medium text-white">{stats.loading ? "-" : stats.leetcode.hard}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a href="https://github.com/priymavani" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/priymavani" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                <FaLinkedin className="text-[#0077b5]" />
                <span>LinkedIn</span>
              </a>
              <a href="#contact" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                <FaEnvelope className="text-accent" />
                <span>Email</span>
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;