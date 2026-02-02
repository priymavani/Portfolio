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
// NOTE: Ensure you have imported all necessary icons from 'react-icons/si' and 'react-icons/fa' 
// corresponding to the variables used below (e.g., SiReact, SiNodedotjs, FaMobileAlt, etc.)

export const projects = [
  {
    id: 0,
    title: "Task Bridge",
    description: "A full-stack task manager with role-based access (Admin & Member). Includes document sharing for seamless team collaboration.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Figma"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team_%22team%40123%22/fkq15ai5cvm22xwgtjzj.png",
    link: "https://task-bridge-project-managment.netlify.app/",
    github: "https://github.com/priymavani/task_bridge",
    figma: "https://www.figma.com/design/jEl4fmd7xKQj1auwksj5Q1/TASK-BRIDGE?node-id=0-1&t=iC8RW9DaJqFLbqNL-1",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code',
    video: "https://www.youtube.com/watch?v=KXHnwewU73w"
  },
  {
    id: 1,
    title: "Stock-Master",
    description: "StockMaster is an inventory management system that streamlines stock operations across multiple locations. It enables real-time inventory tracking, secure stock movement management, and detailed audit trails.",
    tags: ["react", "node", "express", "mongodb"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1768652846/projects/jj789jdbvxhew8rceobj.png",
    link: "https://odoo-stock-frontend.vercel.app/",
    github: "https://github.com/priymavani/Odoo_StockMaster",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code'
  },
  {
    id: 2,
    title: "Book Ease",
    description: "Appointment Booking System is a role-based platform that simplifies scheduling through real-time availability, intelligent slot management, and interactive calendars.",
    tags: ["react", "node", "mongodb", "express", "jwt", "MCP server"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1768652393/projects/aacrm6tehmo4l5tgzwbk.png",
    link: "https://odoo-spit-appointment-app-nexbyte.vercel.app/",
    github: "https://github.com/priymavani/Odoo_SPIT_Appointment_app_NexByte",
    postman: "https://documenter.getpostman.com/view/39217138/2sB3dWqmfM",
    featured: true,
    demo: 'Postman Documentation',
    code: 'View Code'
  },
  {
    id: 3,
    title: "Farm Trust",
    description: "FarmTrust is a MERN stack platform connecting consumers with certified organic farmers. It features product browsing, farmer profiles, AI chatbot support, and tools for farmers to manage sales and certifications.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Figma"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109164/farmtrust.netlify.app__1_z9feph.png",
    link: "https://farmtrust.netlify.app/",
    github: "https://github.com/priymavani/FarmTrust-x-Hackathon",
    figma: "https://www.figma.com/design/SNuN8wbnReIue8nUOJhjEG/Untitled?node-id=0-1&p=f&t=6MhTQoFKTuSxnhJE-0",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code'
  },
  {
    id: 4,
    title: "Food Share",
    description: "Food Share is a food donation matching platform that connects restaurants and food providers with nearby NGOs to reduce waste and fight hunger. It enables real-time location-based matching.",
    tags: ["react", "node", "express", "mongodb"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1768652652/projects/uq94vccme7vq1xzcpzcr.png",
    link: "https://github.com/priymavani/food-share",
    github: "https://github.com/priymavani/food-share",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code'
  },
  {
    id: 5,
    title: "LinkedIn Text Formatter",
    description: "LinkedIn Text Formatter is a browser extension that enhances LinkedIn posts, messages, and comments with rich text styling. It allows users to apply visually appealing text formats and structured bullets.",
    tags: ["html", "css", "extention"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1768653156/projects/idk9dc0jwywsjp6a5kmd.png",
    link: "https://github.com/priymavani/Extension-LinkedIn-Text-Formatter",
    github: "https://github.com/priymavani/Extension-LinkedIn-Text-Formatter",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code',
    video: "https://youtu.be/u4klNTJ6ixY"
  },
  {
    id: 6,
    title: "React Project",
    description: "React application integrating multiple public APIs (Harry Potter, Cocktails, Meals, Banking) with search functionality. Component-based architecture using React Router and Hooks for state management.",
    tags: ["React", "API"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054356/team_%22team%40123%22/qs7ndf4qekv5fkothlab.png",
    link: "https://reactapitask.netlify.app/",
    github: "https://github.com/priymavani/React-App",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code'
  },
  {
    id: 7,
    title: "Realme Clone",
    description: "Built a static clone of Realme's homepage, accurately matching its layout and content.",
    tags: ["HTML", "CSS"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109074/realmebypriymavani.netlify.app__qsxabg.png",
    link: "https://realmebypriymavani.netlify.app/",
    github: "https://github.com/priymavani/realme_clone",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code'
  },
  {
    id: 8,
    title: "Coding Ninjas Clone",
    description: "Developed a static homepage clone of Coding Ninjas with structured UI elements and styling.",
    tags: ["HTML", "CSS"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054348/team_%22team%40123%22/ysx1a2ghjb0trdd3zk9u.png",
    link: "https://cogingninjasbypriymavani.netlify.app/",
    github: "https://github.com/priymavani/CODING_NINJAS_project",
    featured: true,
    demo: 'Live Demo',
    code: 'View Code'
  },
  {
    id: 9,
    title: "LinkedIn API",
    description: "RESTful API using Express.js/MongoDB for professional networking platform clone. Handles core features: user profiles, connections, posts, messaging, and premium account management.",
    tags: ["Node.js", "MongoDB", "Express"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054368/team_%22team%40123%22/ptftaalkv1ljxwjmyk6h.png",
    link: "https://documenter.getpostman.com/view/39217138/2sAYQUpuAq",
    github: "https://github.com/priymavani/APIs/tree/main/linkedin_API",
    postman: "https://documenter.getpostman.com/view/39217138/2sAYQUpuAq",
    featured: true,
    demo: 'Postman Documentation',
    code: 'View Code'
  },
  {
    id: 10,
    title: "YouTube-Inspired API",
    description: "Built RESTful API for YouTube-clone using Node.js/MongoDB Managed videos, users, comments, and subscriptions with CRUD operations",
    tags: ["node", "express", "mongodb"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054378/team_%22team%40123%22/slqe466glrqs5gzxrxeo.png",
    link: "https://github.com/priymavani/APIs/tree/main/YouTube_API",
    github: "https://github.com/priymavani/APIs/tree/main/YouTube_API",
    postman: "https://documenter.getpostman.com/view/39217138/2sAYXEDd33",
    featured: true,
    demo: 'Postman Documentation',
    code: 'View Code'
  },
  {
    id: 11,
    title: "poll_vibe - open-source Contribution",
    description: "Engineering the backend infrastructure for \"Image Polls,\" enabling users to seamlessly upload and attach rich media to voting options. Integrated Cloudinary CDN.",
    tags: ["nodejs", "express", "Cloudinary"],
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1770041086/projects/txk4chnlurtb2zqm0hgs.png",
    link: "https://github.com/codinggita/poll_vibe/pull/10",
    github: "https://github.com/codinggita/poll_vibe/pull/10",
    video: "https://github.com/codinggita/poll_vibe/pull/10",
    featured: false,
    demo: 'Live Demo',
    code: 'View Code'
  }
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact, proficiency: 85 },
      { name: "Bootstrap", icon: SiBootstrap, proficiency: 80 },
      { name: "HTML", icon: SiHtml5, proficiency: 90 },
      { name: "CSS", icon: SiCss3, proficiency: 85 },
      { name: "JavaScript", icon: SiJavascript, proficiency: 85 },
      { name: "Tailwind CSS", icon: SiTailwindcss, proficiency: 80 },
      { name: "Responsive Design", icon: FaMobileAlt, proficiency: 85 }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, proficiency: 80 },
      { name: "Express.js", icon: SiExpress, proficiency: 80 },
      { name: "MongoDB", icon: SiMongodb, proficiency: 75 },
      { name: "REST API", icon: SiPostman, proficiency: 85 }
    ]
  },
  {
    category: "Tools & Technologies",
    items: [
      { name: "Git", icon: SiGit, proficiency: 80 },
      { name: "GitHub", icon: SiGithub, proficiency: 85 },
      { name: "Postman", icon: SiPostman, proficiency: 85 },
      { name: "Netlify", icon: SiNetlify, proficiency: 75 },
      { name: "Vercel", icon: SiVercel, proficiency: 75 }
    ]
  },
  {
    category: "Other Skills",
    items: [
      { name: "UI/UX Design", icon: SiFigma, proficiency: 70 },
      { name: "Problem Solving", icon: FaCode, proficiency: 85 },
      { name: "Team Collaboration", icon: FaUsers, proficiency: 90 }
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
    image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051851/team_%22team%40123%22/oehlrhcleacbhphf7qph.png',
    credentialUrl: 'https://www.sololearn.com/certificates/CC-RAJXJIZY'
  },
  {
    id: 4,
    title: 'Introduction to JavaScript',
    issuer: 'Sololearn',
    credentialId: "CC-JWTVNWRM",
    image: 'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051857/team_%22team%40123%22/ocvk8wn6ddvumh8qndfy.png',
    credentialUrl: 'https://www.sololearn.com/certificates/CC-JWTVNWRM'
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
    title: "Odoo x Spit",
    description: "Finalist at Odoo x Spit hackathon. Developed 'Book Ease' - An Appointment Booking System using React, Node, and MongoDB.",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1768733209/hackathons/fj21s7mgfgtyc6dgfvhp.jpg",
    teamMembers: [
      { name: "Priy Mavani", role: "Backend developer" },
      { name: "Mayur Waykar", role: "backend Developer" },
      { name: "Krish Shyara", role: "Frontend Developer" },
      { name: "Vanshika Jangam", role: "Frontend Developer" }
    ],
    demoLink: "https://odoo-spit-appointment-app-nexbyte.vercel.app/",
    githubLink: "https://github.com/priymavani/Odoo_SPIT_Appointment_app_NexByte"
  },
  {
    id: 2,
    title: "Odoo X Gujarat Vidyapith Hackathon",
    description: "Participated in Odoo X Gujarat Vidyapith Hackathon. Worked on 'Farm Trust', a platform connecting consumers with organic farmers.",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1770042216/hackathons/zdqezcqhx5ildatwcaeq.jpg",
    teamMembers: [
      { name: "Priy Mavani", role: "Frontend Developer" },
      { name: "Parth Jadav", role: "Backend Developer" },
      { name: "Dhruv Sonagra", role: "Frontend Developer" }
    ],
    demoLink: "https://farmtrust.netlify.app/",
    githubLink: "https://github.com/priymavani/FarmTrust-x-Hackathon"
  },
  {
    id: 3,
    title: "Nexothon GCET",
    description: "Participated in Nexothon GCET. Developed 'Design2Code' project with a team of four developers.",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1770042763/hackathons/ex84qoteavgqvbortjqs.jpg",
    teamMembers: [
      { name: "Priy Mavani", role: "Backend Developer" },
      { name: "Vanshika jangam", role: "Frontend Developer" },
      { name: "Krish Shyara", role: "Frontend Developer" },
      { name: "Dhruvesh Shyara", role: "Backend Developer" }
    ],
    demoLink: "",
    githubLink: "https://github.com/priymavani/Design2Code"
  },
  {
    id: 4,
    title: "Rai University State Level Hackthon",
    description: "Participated in the State Level Hackathon at Rai University. Contributed to the 'Food Share' project.",
    image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1770043772/hackathons/zujdauk3wihhefrn42bm.jpg",
    teamMembers: [
      { name: "Priy Mavani", role: "Backend Developer" },
      { name: "Priyasha Yadav", role: "Backend Developer" },
      { name: "Krish Shyara", role: "Frontend Developer" },
      { name: "Dhruvesh Shyara", role: "Frontend Developer" },
      { name: "Vanshika Jangam", role: "Backend Developer" }
    ],
    demoLink: "",
    githubLink: "https://github.com/priymavani/food-share"
  }
];
