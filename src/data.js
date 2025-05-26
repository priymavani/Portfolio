import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiTailwindcss, 
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  // SiVisualstudiocode,
  SiPostman,
  SiNetlify,
  SiVercel,
  SiFigma,
  SiJira
} from 'react-icons/si';
import { FaCode, FaUsers, FaMobileAlt } from 'react-icons/fa';

export const projects = [
  {
    id: 0,
    title: "Task Bridge",
    description: "A full-stack task manager with role-based access (Admin & Member). Includes document sharing for seamless team collaboration.",
    tags: ["React", "Node.js","Express", "MongoDB" , "Figma"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team_%22team%40123%22/fkq15ai5cvm22xwgtjzj.png",
    link: "https://task-bridge-project-managment.netlify.app/",
    github: "https://github.com/priymavani/task_bridge",
    figma : "https://www.figma.com/design/jEl4fmd7xKQj1auwksj5Q1/TASK-BRIDGE?node-id=0-1&t=iC8RW9DaJqFLbqNL-1",
    featured: true
  },
  {
    id: 1,
    title: " Farm Trust ",
    description: "FarmTrust is a MERN stack platform connecting consumers with certified organic farmers. It features product browsing, farmer profiles, AI chatbot support, and tools for farmers to manage sales and certifications.",
    tags: ["React", "Node.js","Express", "MongoDB","Figma"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109164/farmtrust.netlify.app__1_z9feph.png",
    figma : "https://www.figma.com/design/SNuN8wbnReIue8nUOJhjEG/Untitled?node-id=0-1&p=f&t=6MhTQoFKTuSxnhJE-0",
    link: "https://farmtrust.netlify.app/",
    github: "https://github.com/priymavani/FarmTrust-x-Hackathon",
    featured: true
  },
  {
    id: 2,
    title: "Coding Ninjas Clone",
    description: "Developed a static homepage clone of Coding Ninjas with structured UI elements and styling.",
    tags: ["HTML", "CSS", ],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054348/team_%22team%40123%22/ysx1a2ghjb0trdd3zk9u.png",
    github: "https://github.com/priymavani/CODING_NINJAS_project",
    link: "https://cogingninjasbypriymavani.netlify.app/",
    featured: true
  },
  {
    id: 3,
    title: "LinkedIn API",
    description: "RESTful API using Express.js/MongoDB for professional networking platform clone. Handles core features: user profiles, connections, posts, messaging, and premium account management.",
    tags: ["Node.js", "Mongodb", "Express"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054368/team_%22team%40123%22/ptftaalkv1ljxwjmyk6h.png",
    postman: "https://documenter.getpostman.com/view/39217138/2sAYQUpuAq",
    github: "https://github.com/priymavani/APIs/tree/main/linkedin_API",
    link: "https://documenter.getpostman.com/view/39217138/2sAYQUpuAq",
    featured: true
  },

  {
    id: 4,
    demo:'Live Demo',
    code:'View Code',
    title: ' Realme Clone',
    description: 'Built a static clone of Realme’s homepage, accurately matching its layout and content.',
    tags: ['HTML', 'CSS'],
    image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109074/realmebypriymavani.netlify.app__qsxabg.png',
    link: 'https://realmebypriymavani.netlify.app/',
    github: 'https://github.com/priymavani/realme_clone',
    featured: true
  },
  {
    id: 5,
    demo:'Postman Documentation',
    code:'View Code',
    title: 'LinkedIn API',
    description: ' RESTful API using Express.js/MongoDB for professional networking platform clone Handles core features: user profiles, connections, posts, messaging, and premium account management',
    tags: ['Node.js', 'MongoDB','Postman'],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054368/team_%22team%40123%22/ptftaalkv1ljxwjmyk6h.png",
    link: 'https://documenter.getpostman.com/view/39217138/2sAYQUpuAq',
    github: 'https://github.com/priymavani/APIs/tree/main/linkedin_API',
    featured: true
  },
  {
    id: 6,
    demo:'Postman Documentation',
    code:'View Code',
    title: 'YouTube API',
    description: '  Built RESTful API for YouTube-clone using Node.js/MongoDB Managed videos, users, comments, and subscriptions with CRUD operations',
    tags: ['Node.js', 'MongoDB','Postman'],
    image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054378/team_%22team%40123%22/slqe466glrqs5gzxrxeo.png',
    link: 'https://documenter.getpostman.com/view/39217138/2sAYXEDd33',
    github: 'https://github.com/priymavani/APIs/tree/main/YouTube_API',
    featured: true
  },
  {
    id: 7,
    demo:'Live Demo',
    code:'View Code',
    title: ' React Project',
    description: '   React application integrating multiple public APIs (Harry Potter, Cocktails, Meals, Banking) with search functionality Component-based architecture using React Router and Hooks for state management',
    tags: ['React', 'API'],
    image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054356/team_%22team%40123%22/qs7ndf4qekv5fkothlab.png',
    link: 'https://reactapitask.netlify.app/',
    github: 'https://github.com/priymavani/React-App',
    featured: true
  }
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Responsive Design", icon: FaMobileAlt }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "REST API", icon: SiPostman },
      // { name: "Firebase", icon: SiFirebase }
    ]
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Netlify", icon: SiNetlify },
      { name: "Vercel", icon: SiVercel }
    ]
  },
  {
    category: "Other Skills",
    items: [
      { name: "UI/UX Design", icon: SiFigma },
      { name: "Problem Solving", icon: FaCode },
      { name: "Team Collaboration", icon: FaUsers },
      // { name: "Agile Methodologies", icon: SiJira }
    ]
  }
];

export const experiences = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: "Working on various web development projects, focusing on creating responsive and user-friendly applications using modern technologies like React, Node.js, and MongoDB.",
  },
  {
    id: 2,
    role: "Web Development Intern",
    company: "Tech Solutions",
    period: "2022 - 2023",
    description: "Assisted in developing and maintaining web applications, implemented responsive designs, and collaborated with senior developers on various projects.",
  }
];

export const socialLinks = {
  github: "https://github.com/priymavani",
  linkedin: "https://linkedin.com/in/priymavani",
  email: "priymavani02@gmail.com"
};

export const certificates = [
  {
    id: 1,
    title: "CSS (basics)",
    issuer: "HackerRank",
    credentialId: "C746D9A04A12",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748112005/css_certificate_page-0001_b7mcml.jpg",
    credentialUrl: "https://www.hackerrank.com/certificates/c746d9a04a12"
  },
  {
    id: 2,
    title: "GitHub Copilot Fundamentals",
    issuer: "Simplilearn | SkillUp",
    credentialId: "8375577",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748112541/github_copilot_skillup_page-0001_1_izrdje.jpg",
    credentialUrl: "https://masaischool.com/certificates/456"
  },
  {
    id: 3,
    title: 'Introduction to C',
    issuer: 'SoloLearn',
    credentialId: "CC-RAJXJIZY",
    image:'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051851/team_%22team%40123%22/oehlrhcleacbhphf7qph.png',
    credentialUrl :'https://www.sololearn.com/certificates/CC-RAJXJIZY'
  },
  {
    id: 4,
    title: 'Introduction to JavaScript',
    issuer: 'Sololearn',
    credentialId: "CC-JWTVNWRM",
    image:'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051857/team_%22team%40123%22/ocvk8wn6ddvumh8qndfy.png',
    credentialUrl : 'https://www.sololearn.com/certificates/CC-JWTVNWRM'
  },
    {
    id: 5,
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    credentialId: "110BC7FIF95",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748243629/javascript_basic_certificate_page-0001_ln67h9.jpg",
    credentialUrl: "https://www.hackerrank.com/certificates/1110bc7f1f95"
  },
  {
    id: 6,
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    credentialId: "428AC677BED2",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748246474/javascript_intermediate_certificate_1__page-0001_r9jowv.jpg",
    credentialUrl: "https://www.hackerrank.com/certificates/428ac677bed2"
  },
  {
    id: 7,
    title: "Node (Basic)",
    issuer: "HackerRank",
    credentialId: "6DCC004C557B",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748243628/nodejs_basic_certificate_page-0001_fiwe6m.jpg",
    credentialUrl: "https://www.hackerrank.com/certificates/6dcc004c557b"
  },
];

export const hackathons = [
  {
    id: 1,
    title: "FarmTrust Hackathon",
    description: "Developed a MERN stack platform connecting consumers with certified organic farmers. Implemented features like product browsing, farmer profiles, AI chatbot support, and tools for farmers to manage sales and certifications.",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109164/farmtrust.netlify.app__1_z9feph.png",
    teamMembers: [
      {
        name: "Priy Mavani",
        role: "Frontend Developer",
        // image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team/priya.jpg"
      },
      {
        name: "Jadav Parth",
        role: "Backend Developer",
        // image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team/member2.jpg"
      },
      {
        name: "Dhruv Sonagra",
        role: "Frontend Developer",
        // image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team/member3.jpg"
      }
    ],
    demoLink: "https://farmtrust.netlify.app/",
    githubLink: "https://github.com/priymavani/FarmTrust-x-Hackathon",
    figmaLink: "https://www.figma.com/design/SNuN8wbnReIue8nUOJhjEG/Untitled?node-id=0-1&p=f&t=6MhTQoFKTuSxnhJE-0"
  }
];

