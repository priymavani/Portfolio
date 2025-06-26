import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data';
import SectionHeading from './ui/SectionHeading';
import DotGrid from './ui/DotGrid'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filterButtons = [
    { id: 'all', label: 'All Projects' },
    { id: 'React', label: 'React' },
    { id: 'Node.js', label: 'Node.js' },
    { id: 'MongoDB', label: 'MongoDB' },
    { id: 'Figma', label: 'Figma' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32 relative overflow-hidden">
      {/* DotGrid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid />
      </div>
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20">
        <SectionHeading title="My Projects" subtitle="Recent work I've done" />
        
        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-10 mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          {filterButtons.map((button, index) => (
            <motion.button
              key={button.id}
              className={`px-5 py-2 rounded-full text-sm transition-all ${
                activeFilter === button.id 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
              onClick={() => setActiveFilter(button.id)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -2 }}
            >
              {button.label}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Featured projects */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredProjects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-background-light border border-white/5 hover:border-primary-500/30 transition-all duration-300"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 * index + 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 10).map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-white/10 rounded-full text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    View Project <FaExternalLinkAlt size={16} />
                  </a>
                  <a 
                    href={project.github}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Other projects */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {filteredProjects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.id}
              className="group p-6 rounded-xl bg-background-light/50 border border-white/5 hover:border-primary-500/30 transition-all duration-300"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-neutral-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-white/5 rounded-full text-neutral-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors"
                >
                  View Project <FaExternalLinkAlt size={16} />
                </a>
                
                <a 
                  href={project.github}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <FaGithub size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;