import React from 'react';
import  { useEffect, useRef } from "react";

const Projects = () => {

  const iframeRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/watch?v=KXHnwewU73w";
    document.body.appendChild(script);

    script.onload = () => {
      window.onYouTubeIframeAPIReady = () => {
        new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event) => event.target.playVideo(),
          },
        });
      };
    };

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);


  const projects = [
    {
      id: 1,
      demo:'Live Demo',
      code:'View Code',
      title: 'Task Bridge ',
      description: 'A full-stack task manager with role-based access (Admin & Member). Includes document sharing for seamless team collaboration.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team_%22team%40123%22/fkq15ai5cvm22xwgtjzj.png',
      demoLink: 'https://task-bridge-project-managment.netlify.app/',
      codeLink: 'https://github.com/priymavani/task_bridge'
    },
    {
      id: 2,
      demo:'Live Demo',
      code:'View Code',
      title: 'Coding Ninjas Clone',
      description: ' Developed a static homepage clone of Coding Ninjas with structured UI elements and styling.',
      tech: ['HTML', 'CSS'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054348/team_%22team%40123%22/ysx1a2ghjb0trdd3zk9u.png',
      demoLink: 'https://cogingninjasbypriymavani.netlify.app/',
      codeLink: 'https://www.google.com/url?q=https://github.com/priymavani/CODING_NINJAS_project&sa=D&source=docs&ust=1740000717828354&usg=AOvVaw2sFuD7AA0cSCjlgBBp_OCJ'
    },
    {
      id: 3,
      demo:'Live Demo',
      code:'View Code',
      title: ' Tata Clone',
      description: 'Created a static homepage clone of Tata using HTML, CSS, and JavaScript, replicating the original design.',
      tech: ['HTML', 'CSS'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054346/team_%22team%40123%22/kwmkmtbrz0qiusxcw5on.png',
      demoLink: 'https://tatabypriy.netlify.app/#',
      codeLink: 'https://github.com/priymavani/TATA_project'
    },
    {
      id: 4,
      demo:'Live Demo',
      code:'View Code',
      title: '  Realme Clone',
      description: 'Built a static clone of Realme’s homepage, accurately matching its layout and content.',
      tech: ['HTML', 'CSS'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054494/team_%22team%40123%22/dntxzuqueounp7d77rmk.png',
      demoLink: 'https://realmebypriymavani.netlify.app/',
      codeLink: 'https://github.com/priymavani/realme_clone'
    },
    {
      id: 5,
      demo:'Postman Documentation',
      code:'View Code',
      title: 'LinkedIn API',
      description: ' RESTful API using Express.js/MongoDB for professional networking platform clone Handles core features: user profiles, connections, posts, messaging, and premium account management',
      tech: ['Node.js', 'MongoDB','Postman'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054368/team_%22team%40123%22/ptftaalkv1ljxwjmyk6h.png',
      demoLink: 'https://documenter.getpostman.com/view/39217138/2sAYQUpuAq',
      codeLink: 'https://github.com/priymavani/APIs/tree/main/linkedin_API'
    },
    {
      id: 6,
      demo:'Postman Documentation',
      code:'View Code',
      title: 'YouTube API',
      description: '  Built RESTful API for YouTube-clone using Node.js/MongoDB Managed videos, users, comments, and subscriptions with CRUD operations',
      tech: ['Node.js', 'MongoDB','Postman'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054378/team_%22team%40123%22/slqe466glrqs5gzxrxeo.png',
      demoLink: 'https://documenter.getpostman.com/view/39217138/2sAYXEDd33',
      codeLink: 'https://github.com/priymavani/APIs/tree/main/YouTube_API'
    },
    {
      id: 7,
      demo:'Live Demo',
      code:'View Code',
      title: ' React Project',
      description: '   React application integrating multiple public APIs (Harry Potter, Cocktails, Meals, Banking) with search functionality Component-based architecture using React Router and Hooks for state management',
      tech: ['React', 'API'],
      image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054356/team_%22team%40123%22/qs7ndf4qekv5fkothlab.png',
      demoLink: 'https://reactapitask.netlify.app/',
      codeLink: 'https://github.com/priymavani/React-App'
    }
  ];
  
  return (
    <section className="projects section">
      <h2>My Projects</h2>


    <h3 style={{marginTop:"30px"}}>Task Bridge MERN Stack DEMO - 1  </h3>
    <h4>Current Poject </h4>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh",margin:"20px"}}>
      <iframe
        ref={iframeRef}
        id="youtube-player"
        width="80%"
        height="450"
        src="https://www.youtube.com/embed/KXHnwewU73w?&controls=1&loop=1&playlist=KXHnwewU73w&enablejsapi=1"
        
        title="Task Bridge"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  
  <hr />
      
      <div className="projects-grid" style={{marginTop:"30px"}}>
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="demo-link">
                  {project.demo}
                </a>
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="code-link">
                  {project.code}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


