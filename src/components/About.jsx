import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, experiences,  } from '../data';
import SectionHeading from './ui/SectionHeading';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-background-light relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-500/5 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        

        <SectionHeading title="About Me" subtitle="My background and skills" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <p className="text-neutral-300 mb-6">
              I am a passionate Full Stack Developer with a strong foundation in web development technologies. My journey in web development began with HTML and CSS, and I've since expanded my expertise to include modern frameworks and tools like React, Node.js, and MongoDB.
            </p>
            <p className="text-neutral-300 mb-8">
              I specialize in creating responsive, user-friendly web applications that solve real-world problems. My approach combines technical expertise with a keen eye for design, ensuring that every project I work on is both functional and visually appealing. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.
            </p>
            
            {/* <h3 className="text-2xl font-bold mb-6">Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  className="border-l-2 border-primary-600 pl-6 relative"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <div className="absolute w-3 h-3 bg-primary-600 rounded-full -left-[7px] top-2"></div>
                  <h4 className="text-xl font-bold">{exp.role}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-primary-400">{exp.company}</p>
                    <p className="text-neutral-400 text-sm">{exp.period}</p>
                  </div>
                  <p className="text-neutral-300">{exp.description}</p>
                </motion.div>
              ))}
            </div> */}
             <motion.div
              className="mt-12 p-6 glass rounded-xl"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-xl font-bold mb-4">Let's Work Together</h4>
              <p className="text-neutral-300 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out if you want to connect!
              </p>
              <a 
                href="#contact" 
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in touch →
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
            
            <div className="space-y-10">
              {skills.map((skillGroup, groupIndex) => (
                <motion.div 
                  key={skillGroup.category}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeIn}
                  transition={{ duration: 0.6, delay: 0.1 * groupIndex + 0.3 }}
                >
                  <h4 className="text-xl font-medium mb-4 text-primary-400">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((item, index) => (
                      <motion.span
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm">{item.name}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            
           
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;