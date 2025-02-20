import React, { useEffect, useState } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiExpress, SiMongodb } from "react-icons/si";
import { SiNetlify, SiRender, SiPostman, SiFigma } from 'react-icons/si';
import photo from '../assets/photo.jpg'
import { motion } from 'framer-motion';

const About = () => {
  const [name, setName] = useState('');
  const fullName = "Hyy,I'm Priy Mavani";

  // Skills categorized into different sections
  const frontendSkills = [
    { name: "React", icon: <FaReact className="skill-icon" /> },
    { name: "HTML5", icon: <FaHtml5 className="skill-icon" /> },
    { name: "CSS3", icon: <FaCss3Alt className="skill-icon" /> },
    { name: "JavaScript", icon: <FaJs className="skill-icon" /> }
  ];
  

  const backendSkills = [
    { name: "Node.js", icon: <FaNodeJs className="skill-icon" /> },
    { name: "Express", icon: <SiExpress className="skill-icon" /> },
    { name: "MongoDB", icon: <SiMongodb className="skill-icon" /> }
  ];

  const versionControl = [
    { name: "Git", icon: <FaGitAlt className="skill-icon" /> },
    { name: "GitHub", icon: <FaGithub className="skill-icon" /> }
  ];

  const deployedTools = [
    { name: "Netlify", icon: <SiNetlify className="skill-icon" /> },
    { name: "Render", icon: <SiRender className="skill-icon" /> }
  ];

  const otherTools = [
    { name: "Postman", icon: <SiPostman className="skill-icon" /> },
    { name: "Figma", icon: <SiFigma className="skill-icon" /> }
  ];


  const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Git", "Figma"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % skills.length);
      }, 1000);

      return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        setName((prev) => prev + fullName.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="about section">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="profile-image">
          <img src={photo} alt="Priy Mavani" />
        </div>
        <div className="bio">
          <h3>{name}</h3>
          <h4>Full Stack Developer</h4>
          <p>
            I am an aspiring full stack developer passionate about building web applications
            that solve real-world problems. My journey in web development started with 
            HTML/CSS and has evolved to encompass modern JavaScript frameworks like React.
          </p>
          <p>
            I enjoy working on both frontend and backend technologies, and I'm constantly
            learning new skills to enhance my development toolkit.
          </p>

          <div className="text-xl font-mono text-center mt-5">
           <span className='bold'>Skills </span> <span className='writer'> {skills[index]} </span>
        </div>

          {/* Frontend Skills Section */}
          <div className="skills">
            <h4>Frontend Skills</h4>
            <div className="skill-tags">
              {frontendSkills.map((skill, index) => (
                <div className="card" id="card" key={index}>
                  <div className="content">
                    <div className="icon-container">{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills Section */}
          <div className="skills">
            <h4>Backend Skills</h4>
            <div className="skill-tags">
              {backendSkills.map((skill, index) => (
                <div className="card" id="card" key={index}>
                  <div className="content">
                    <div className="icon-container">{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Version Control Section */}
          <div className="skills">
            <h4>Version Control</h4>
            <div className="skill-tags">
              {versionControl.map((skill, index) => (
                <div className="card" id="card" key={index}>
                  <div className="content">
                    <div className="icon-container">{skill.icon}</div>
                    <div>{skill.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deployed Tools Section */}
          <div className="skills">
            <h4>Deployed Tools</h4>
            <div className="skill-tags">
              {deployedTools.map((tool, index) => (
                <div className="card" id="card" key={index}>
                  <div className="content">
                    <div className="icon-container">{tool.icon}</div>
                    <span>{tool.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Tools Section */}
          <div className="skills">
            <h4>Other Tools</h4>
            <div className="skill-tags">
              {otherTools.map((tool, index) => (
                <div className="card" id="card" key={index}>
                  <div className="content">
                    <div className="icon-container">{tool.icon}</div>
                    <span>{tool.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;