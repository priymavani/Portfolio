'use client';
import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiBootstrap,
    SiNodedotjs, SiExpress, SiMongodb, SiGit, SiGithub, SiPostman,
    SiNetlify, SiVercel, SiFigma, SiNextdotjs, SiFramer, SiSpringboot,
    SiPostgresql, SiMysql, SiCplusplus, SiTypescript, SiRedux, SiDocker,
    SiFirebase, SiGraphql, SiPython, SiDjango, SiFlask, SiKubernetes,
    SiLinux, SiNginx, SiRedis, SiSass, SiLess, SiWebpack, SiVite,
    SiJest, SiCypress, SiStorybook, SiAmazonaws,
} from 'react-icons/si';
import {
    FaCode, FaUsers, FaMobileAlt, FaReact, FaHtml5, FaCss3, FaNodeJs,
    FaJava, FaAws, FaGitAlt, FaGithub, FaBrain, FaDatabase, FaServer,
    FaLaptopCode, FaPalette, FaTerminal, FaCogs,
} from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

// Map of string identifiers (stored in DB) → React icon components
const iconMap = {
    // Si (Simple Icons) - technology brands
    SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss, SiBootstrap,
    SiNodedotjs, SiExpress, SiMongodb, SiGit, SiGithub, SiPostman,
    SiNetlify, SiVercel, SiFigma, SiNextdotjs, SiFramer, SiSpringboot,
    SiPostgresql, SiMysql, SiCplusplus, SiTypescript, SiRedux, SiDocker,
    SiFirebase, SiGraphql, SiPython, SiDjango, SiFlask, SiKubernetes,
    SiLinux, SiNginx, SiRedis, SiSass, SiLess, SiWebpack, SiVite,
    SiJest, SiCypress, SiStorybook, SiAmazonaws,

    // Fa (Font Awesome) - general icons
    FaCode, FaUsers, FaMobileAlt, FaReact, FaHtml5, FaCss3, FaNodeJs,
    FaJava, FaAws, FaGitAlt, FaGithub, FaBrain, FaDatabase, FaServer,
    FaLaptopCode, FaPalette, FaTerminal, FaCogs,

    // VS Code icon
    VscVscode,
};

/**
 * Get a React icon component by its string identifier.
 * Falls back to FaCode if the icon is not found.
 * 
 * @param {string} iconName - The string name of the icon (e.g. "SiReact", "FaCode")
 * @returns {React.ComponentType} The icon component
 */
export function getIcon(iconName) {
    return iconMap[iconName] || FaCode;
}

export default iconMap;
