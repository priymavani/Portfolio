'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaGlobe, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { SiFigma, SiPostman } from 'react-icons/si';
import VideoPlayer from './ui/VideoPlayer'; // Standard import - VideoPlayer handles dynamic loading internally

// --- FILTER BAR ---
const FilterBar = ({ filters, activeFilter, setActiveFilter }) => (
  <div className="flex justify-center mb-6 sticky top-24 z-30">
    <div className="p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-xl flex gap-1 shadow-2xl">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`
            relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
            ${activeFilter === filter ? 'text-black' : 'text-neutral-400 hover:text-white'}
          `}
        >
          {activeFilter === filter && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      ))}
    </div>
  </div>
);

// --- VIDEO WINDOW (FIXED) ---
const VideoWindow = ({ videoUrl, title }) => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative group">
      <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1C1C1C] shadow-2xl">
        {/* Header */}
        <div className="h-8 bg-[#2A2A2A] border-b border-white/5 flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          <div className="ml-4 flex-1 h-5 rounded bg-[#1C1C1C] flex items-center px-2">
            <span className="text-[10px] text-neutral-500 font-mono truncate">
              {title} // Watch Preview
            </span>
          </div>
        </div>

        {/* PLAYER WRAPPER - VideoPlayer handles aspect ratio internally */}
        <div className="relative w-full bg-black overflow-hidden">
          <VideoPlayer url={videoUrl} isMuted={isMuted} />

          <button
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            className="absolute bottom-4 right-4 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white border border-white/10 transition-all transform hover:scale-110 z-20"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
          </button>
        </div>
      </div>
      <div className="absolute -inset-2 bg-accent/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

// --- BROWSER WINDOW ---
const BrowserWindow = ({ image, title }) => (
  <div className="relative group">
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1C1C1C] shadow-2xl">
      <div className="h-8 bg-[#2A2A2A] border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        <div className="ml-4 flex-1 h-5 rounded bg-[#1C1C1C] flex items-center px-2">
          <span className="text-[10px] text-neutral-500 font-mono truncate">https://{title.toLowerCase().replace(/\s/g, '')}.com</span>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
    <div className="absolute -inset-2 bg-accent/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

// --- TERMINAL WINDOW ---
const TerminalWindow = ({ title, tags }) => (
  <div className="relative group">
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0D1117] shadow-2xl font-mono text-sm">
      <div className="h-8 bg-[#161B22] border-b border-white/5 flex items-center justify-between px-4">
        <span className="text-neutral-500 text-xs">server.js</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>
      </div>
      <div className="p-6 text-neutral-300 space-y-2">
        <div className="flex">
          <span className="text-purple-400 mr-2">const</span>
          <span className="text-blue-400">{title.replace(/\s/g, '')}</span>
          <span className="text-white mx-2">=</span>
          <span className="text-purple-400">require</span>
          <span className="text-neutral-500">('express');</span>
        </div>
        <div className="flex pl-4">
          <span className="text-neutral-500">// Initialize API Routes</span>
        </div>
        <div className="flex">
          <span className="text-purple-400">app</span>
          <span className="text-neutral-300">.</span>
          <span className="text-yellow-400">use</span>
          <span className="text-neutral-300">(</span>
          <span className="text-green-400">'/api/v1'</span>
          <span className="text-neutral-300">, </span>
          <span className="text-blue-400">routes</span>
          <span className="text-neutral-300">);</span>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5">
          <span className="text-green-500">➜  ~ </span>
          <span className="text-white">npm start</span>
          <div className="text-neutral-500 mt-1">
            {'>'} Listening on PORT 8080...<br />
            {'>'} MongoDB Connected successfully.<br />
            {'>'} {tags.includes('Postman') ? 'Postman Collection Ready' : 'Ready for requests'}
          </div>
        </div>
      </div>
    </div>
    <div className="absolute -inset-2 bg-green-500/10 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

// --- MAIN COMPONENT ---
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [viewMode, setViewMode] = useState('default');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success) {
          // Filter to only show visible projects
          const visibleProjects = data.data.filter(p => p.visibility !== false);
          setProjects(visibleProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeFilter]);

  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags || []))].slice(0, 6);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags && p.tags.includes(activeFilter));

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const activeProject = displayedProjects.find(p => p._id === activeProjectId) || displayedProjects[0];

  if (loading) {
    return (
      <section className="py-32 bg-background relative z-10 flex items-center justify-center">
        <div className="animate-pulse text-neutral-500 font-mono">Loading Database...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        {/* Title / Header */}
        <div className="mb-12 text-center sm:text-left">
          <span className="text-accent font-mono text-sm tracking-wider uppercase">Portfolio</span>
          <h2 className="font-sans text-4xl md:text-5xl font-bold mt-2 text-white">
            Selected <span className="text-neutral-500">Works.</span>
          </h2>
        </div>

        {/* FilterBar above */}
        <FilterBar
          filters={['All', 'React', 'Node.js', 'API', 'Figma']}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* View Toggle option down of filter option */}
        <div className="flex justify-center mb-16 relative z-20">
          <div className="flex items-center gap-2 bg-neutral-900/80 p-1.5 rounded-xl border border-white/5 w-fit shadow-2xl">
            <button
              onClick={() => setViewMode('default')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                viewMode === 'default'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Default View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>

        {viewMode === 'default' && (
          <div className="lg:grid lg:grid-cols-12 gap-12 relative">
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="sticky top-48 h-[fit-content]">
                <AnimatePresence mode="wait">
                  {activeProject && (
                    <motion.div
                      key={activeProject._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-9xl font-bold text-white/25 absolute -top-20 -left-10 select-none">
                        {String(displayedProjects.findIndex(p => p._id === activeProject._id) + 1).padStart(2, '0')}
                      </div>

                      <h3 className="text-4xl font-bold text-white mb-4 relative mt-16 z-10">{activeProject.title}</h3>

                      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                        {activeProject.tags && activeProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs text-neutral-400 font-medium bg-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-neutral-400 text-lg leading-relaxed mb-8 relative z-10">
                        {activeProject.description}
                      </p>

                      <div className="flex flex-wrap gap-4 relative z-10">
                        {activeProject.link && (
                          <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-accent text-black font-bold rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
                          >
                            <FaGlobe /> Live Demo
                          </a>
                        )}

                        {activeProject.github && (
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <FaGithub /> Source
                          </a>
                        )}

                        {activeProject.figma && (
                          <a
                            href={activeProject.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <SiFigma /> Design
                          </a>
                        )}

                        {activeProject.postman && (
                          <a
                            href={activeProject.postman}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <SiPostman /> Docs
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col gap-32 pb-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter} // Re-animate when filter changes
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-32"
                >
                  {displayedProjects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      setActiveProjectId={setActiveProjectId}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Highlighted "See More Projects" Button */}
              {filteredProjects.length > visibleCount && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="group relative px-8 py-4 bg-accent text-black font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/40 flex items-center gap-3 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm">
                      See More Projects
                      <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const githubLink = project.github || project.githubLink;
              const liveLink = project.link || project.liveLink;
              return (
                <div
                  key={project._id}
                  className="bg-[#1C1C1C] border border-white/10 rounded-2xl shadow-xl flex flex-col h-full overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="h-48 relative overflow-hidden bg-black flex items-center justify-center">
                    {project.video ? (
                      <div className="w-full">
                        <VideoPlayer url={project.video} isMuted={true} />
                      </div>
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-neutral-500 font-mono text-sm">
                        No Preview Available
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags && project.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                      {githubLink ? (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                        >
                          <FaGithub size={16} /> GitHub
                        </a>
                      ) : (
                        <div />
                      )}
                      {liveLink ? (
                        <a
                          href={liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <FaGlobe size={14} /> Live Demo
                        </a>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, setActiveProjectId, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveProjectId(project._id);
    }
  }, [isInView, project._id, setActiveProjectId]);

  // Check if video URL exists
  const showVideo = !!project.video;

  const isApiProject = project.tags && (project.tags.includes('Postman') || (project.tags.includes('API') && !project.tags.includes('React')));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Stagger effect: each card animates 0.1s after the previous
        ease: "easeOut"
      }}
      className="block"
    >
      <div className="lg:hidden mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags && project.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-1 rounded border border-white/10 text-neutral-400">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-neutral-400 text-sm mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-3">
          {project.link && <a href={project.link} className="text-accent text-xs font-bold uppercase tracking-wider">Demo</a>}
          {project.github && <a href={project.github} className="text-white text-xs font-bold uppercase tracking-wider">GitHub</a>}
          {project.figma && <a href={project.figma} className="text-[#F24E1E] text-xs font-bold uppercase tracking-wider">Figma</a>}
        </div>
      </div>

      {showVideo ? (
        <VideoWindow videoUrl={project.video} title={project.title} />
      ) : (
        <BrowserWindow image={project.image} title={project.title} />
      )}
    </motion.div>
  );
};

export default Projects;