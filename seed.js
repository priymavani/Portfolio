import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            process.env[key.trim()] = value;
        }
    });
}


// Import models
import Project from './src/models/Project.js';
import Skill from './src/models/Skill.js';
import Experience from './src/models/Experience.js';
import Certificate from './src/models/Certificate.js';
import Hackathon from './src/models/Hackathon.js';

// Data from data.js (converted to plain objects)
const projectsData = [
    {
        title: "Task Bridge",
        description: "A full-stack task manager with role-based access (Admin & Member). Includes document sharing for seamless team collaboration.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Figma"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054324/team_%22team%40123%22/fkq15ai5cvm22xwgtjzj.png",
        link: "https://task-bridge-project-managment.netlify.app/",
        github: "https://github.com/priymavani/task_bridge",
        figma: "https://www.figma.com/design/jEl4fmd7xKQj1auwksj5Q1/TASK-BRIDGE?node-id=0-1&t=iC8RW9DaJqFLbqNL-1",
        featured: true,
        order: 1
    },
    {
        title: "Farm Trust",
        description: "FarmTrust is a MERN stack platform connecting consumers with certified organic farmers. It features product browsing, farmer profiles, AI chatbot support, and tools for farmers to manage sales and certifications.",
        tags: ["React", "Node.js", "Express", "MongoDB", "Figma"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109164/farmtrust.netlify.app__1_z9feph.png",
        figma: "https://www.figma.com/design/SNuN8wbnReIue8nUOJhjEG/Untitled?node-id=0-1&p=f&t=6MhTQoFKTuSxnhJE-0",
        link: "https://farmtrust.netlify.app/",
        github: "https://github.com/priymavani/FarmTrust-x-Hackathon",
        featured: true,
        order: 2
    },
    {
        title: "Coding Ninjas Clone",
        description: "Developed a static homepage clone of Coding Ninjas with structured UI elements and styling.",
        tags: ["HTML", "CSS"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054348/team_%22team%40123%22/ysx1a2ghjb0trdd3zk9u.png",
        github: "https://github.com/priymavani/CODING_NINJAS_project",
        link: "https://cogingninjasbypriymavani.netlify.app/",
        featured: true,
        order: 3
    },
    {
        title: "LinkedIn API",
        description: "RESTful API using Express.js/MongoDB for professional networking platform clone. Handles core features: user profiles, connections, posts, messaging, and premium account management.",
        tags: ["Node.js", "MongoDB", "Express"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054368/team_%22team%40123%22/ptftaalkv1ljxwjmyk6h.png",
        postman: "https://documenter.getpostman.com/view/39217138/2sAYQUpuAq",
        github: "https://github.com/priymavani/APIs/tree/main/linkedin_API",
        link: "https://documenter.getpostman.com/view/39217138/2sAYQUpuAq",
        featured: true,
        order: 4
    },
    {
        title: "Realme Clone",
        description: "Built a static clone of Realme's homepage, accurately matching its layout and content.",
        tags: ["HTML", "CSS"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109074/realmebypriymavani.netlify.app__qsxabg.png",
        link: "https://realmebypriymavani.netlify.app/",
        github: "https://github.com/priymavani/realme_clone",
        featured: true,
        order: 5
    },
    {
        title: "YouTube API",
        description: "Built RESTful API for YouTube-clone using Node.js/MongoDB. Managed videos, users, comments, and subscriptions with CRUD operations.",
        tags: ["Node.js", "MongoDB", "Postman"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054378/team_%22team%40123%22/slqe466glrqs5gzxrxeo.png",
        link: "https://documenter.getpostman.com/view/39217138/2sAYXEDd33",
        github: "https://github.com/priymavani/APIs/tree/main/YouTube_API",
        featured: true,
        order: 6
    },
    {
        title: "React Project",
        description: "React application integrating multiple public APIs (Harry Potter, Cocktails, Meals, Banking) with search functionality. Component-based architecture using React Router and Hooks for state management.",
        tags: ["React", "API"],
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740054356/team_%22team%40123%22/qs7ndf4qekv5fkothlab.png",
        link: "https://reactapitask.netlify.app/",
        github: "https://github.com/priymavani/React-App",
        featured: true,
        order: 7
    }
];

const skillsData = [
    {
        category: "Frontend",
        items: [
            { name: "React", icon: "SiReact", proficiency: 85 },
            { name: "Bootstrap", icon: "SiBootstrap", proficiency: 80 },
            { name: "HTML", icon: "SiHtml5", proficiency: 90 },
            { name: "CSS", icon: "SiCss3", proficiency: 85 },
            { name: "JavaScript", icon: "SiJavascript", proficiency: 85 },
            { name: "Tailwind CSS", icon: "SiTailwindcss", proficiency: 80 },
            { name: "Responsive Design", icon: "FaMobileAlt", proficiency: 85 }
        ],
        order: 1
    },
    {
        category: "Backend",
        items: [
            { name: "Node.js", icon: "SiNodedotjs", proficiency: 80 },
            { name: "Express.js", icon: "SiExpress", proficiency: 80 },
            { name: "MongoDB", icon: "SiMongodb", proficiency: 75 },
            { name: "REST API", icon: "SiPostman", proficiency: 85 }
        ],
        order: 2
    },
    {
        category: "Tools & Technologies",
        items: [
            { name: "Git", icon: "SiGit", proficiency: 80 },
            { name: "GitHub", icon: "SiGithub", proficiency: 85 },
            { name: "Postman", icon: "SiPostman", proficiency: 85 },
            { name: "Netlify", icon: "SiNetlify", proficiency: 75 },
            { name: "Vercel", icon: "SiVercel", proficiency: 75 }
        ],
        order: 3
    },
    {
        category: "Other Skills",
        items: [
            { name: "UI/UX Design", icon: "SiFigma", proficiency: 70 },
            { name: "Problem Solving", icon: "FaCode", proficiency: 85 },
            { name: "Team Collaboration", icon: "FaUsers", proficiency: 90 }
        ],
        order: 4
    }
];

const experiencesData = [
    {
        role: "Full Stack Developer",
        company: "Freelance",
        period: "2023 - Present",
        startDate: new Date("2023-01-01"),
        isCurrent: true,
        description: "Working on various web development projects, focusing on creating responsive and user-friendly applications using modern technologies like React, Node.js, and MongoDB.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        order: 1
    },
    {
        role: "Web Development Intern",
        company: "Tech Solutions",
        period: "2022 - 2023",
        startDate: new Date("2022-01-01"),
        endDate: new Date("2023-12-31"),
        isCurrent: false,
        description: "Assisted in developing and maintaining web applications, implemented responsive designs, and collaborated with senior developers on various projects.",
        technologies: ["HTML", "CSS", "JavaScript", "React"],
        order: 2
    }
];

const certificatesData = [
    {
        title: "CSS (basics)",
        issuer: "HackerRank",
        credentialId: "C746D9A04A12",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748112005/css_certificate_page-0001_b7mcml.jpg",
        credentialUrl: "https://www.hackerrank.com/certificates/c746d9a04a12",
        skills: ["CSS", "Web Design"],
        order: 1
    },
    {
        title: "GitHub Copilot Fundamentals",
        issuer: "Simplilearn | SkillUp",
        credentialId: "8375577",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748112541/github_copilot_skillup_page-0001_1_izrdje.jpg",
        credentialUrl: "https://masaischool.com/certificates/456",
        skills: ["GitHub", "AI Tools"],
        order: 2
    },
    {
        title: "Introduction to C",
        issuer: "SoloLearn",
        credentialId: "CC-RAJXJIZY",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051851/team_%22team%40123%22/oehlrhcleacbhphf7qph.png",
        credentialUrl: "https://www.sololearn.com/certificates/CC-RAJXJIZY",
        skills: ["C Programming"],
        order: 3
    },
    {
        title: "Introduction to JavaScript",
        issuer: "Sololearn",
        credentialId: "CC-JWTVNWRM",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051857/team_%22team%40123%22/ocvk8wn6ddvumh8qndfy.png",
        credentialUrl: "https://www.sololearn.com/certificates/CC-JWTVNWRM",
        skills: ["JavaScript"],
        order: 4
    },
    {
        title: "JavaScript (Basic)",
        issuer: "HackerRank",
        credentialId: "110BC7FIF95",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748243629/javascript_basic_certificate_page-0001_ln67h9.jpg",
        credentialUrl: "https://www.hackerrank.com/certificates/1110bc7f1f95",
        skills: ["JavaScript"],
        order: 5
    },
    {
        title: "JavaScript (Intermediate)",
        issuer: "HackerRank",
        credentialId: "428AC677BED2",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748246474/javascript_intermediate_certificate_1__page-0001_r9jowv.jpg",
        credentialUrl: "https://www.hackerrank.com/certificates/428ac677bed2",
        skills: ["JavaScript", "Advanced JS"],
        order: 6
    },
    {
        title: "Node (Basic)",
        issuer: "HackerRank",
        credentialId: "6DCC004C557B",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748243628/nodejs_basic_certificate_page-0001_fiwe6m.jpg",
        credentialUrl: "https://www.hackerrank.com/certificates/6dcc004c557b",
        skills: ["Node.js", "Backend"],
        order: 7
    }
];

const hackathonsData = [
    {
        title: "FarmTrust Hackathon",
        description: "Developed a MERN stack platform connecting consumers with certified organic farmers. Implemented features like product browsing, farmer profiles, AI chatbot support, and tools for farmers to manage sales and certifications.",
        image: "https://res.cloudinary.com/dd6lqkak0/image/upload/v1748109164/farmtrust.netlify.app__1_z9feph.png",
        teamMembers: [
            {
                name: "Priy Mavani",
                role: "Frontend Developer"
            },
            {
                name: "Jadav Parth",
                role: "Backend Developer"
            },
            {
                name: "Dhruv Sonagra",
                role: "Frontend Developer"
            }
        ],
        demoLink: "https://farmtrust.netlify.app/",
        githubLink: "https://github.com/priymavani/FarmTrust-x-Hackathon",
        figmaLink: "https://www.figma.com/design/SNuN8wbnReIue8nUOJhjEG/Untitled?node-id=0-1&p=f&t=6MhTQoFKTuSxnhJE-0",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        order: 1
    }
];

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: false,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Seed function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Certificate.deleteMany({});
        await Hackathon.deleteMany({});
        console.log('✅ Existing data cleared\n');

        // Insert Projects
        console.log('📁 Inserting projects...');
        const projects = await Project.insertMany(projectsData);
        console.log(`✅ Inserted ${projects.length} projects\n`);

        // Insert Skills
        console.log('⚡ Inserting skills...');
        const skills = await Skill.insertMany(skillsData);
        console.log(`✅ Inserted ${skills.length} skill categories\n`);

        // Insert Experiences
        console.log('💼 Inserting experiences...');
        const experiences = await Experience.insertMany(experiencesData);
        console.log(`✅ Inserted ${experiences.length} experiences\n`);

        // Insert Certificates
        console.log('🏆 Inserting certificates...');
        const certificates = await Certificate.insertMany(certificatesData);
        console.log(`✅ Inserted ${certificates.length} certificates\n`);

        // Insert Hackathons
        console.log('🚀 Inserting hackathons...');
        const hackathons = await Hackathon.insertMany(hackathonsData);
        console.log(`✅ Inserted ${hackathons.length} hackathons\n`);

        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Projects: ${projects.length}`);
        console.log(`   - Skills: ${skills.length} categories`);
        console.log(`   - Experiences: ${experiences.length}`);
        console.log(`   - Certificates: ${certificates.length}`);
        console.log(`   - Hackathons: ${hackathons.length}`);
        console.log('\n✅ All data inserted successfully!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed
const runSeed = async () => {
    await connectDB();
    await seedDatabase();
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
};

runSeed();
