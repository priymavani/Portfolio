'use client';

import {
  NextjsIcon,
  _React,
  Html5,
  Css3Icon,
  Javascript,
  TailwindIcon,
  Bootstrap,
  Framer,
  NodejsIcon,
  Express,
  MongodbIcon,
  SpringIcon,
  Auth0,
  MysqlIcon,
  Postgresql,
  Supabase,
  Neon,
  Prisma,
  Langchain,
  GitIcon,
  GithubIcon,
  PostmanIcon,
  Aws,
  MicrosoftAzure,
  Cloudflare,
  Figma,
  Docker,
  Kubernetes,
  Jenkins,
  Netlify,
  VercelIcon,
  CPlusplus,
  Java,
  Python
} from '@dev.icons/react';

import {
  NextjsIcon as MonoNextjsIcon,
  _React as Mono_React,
  Html5 as MonoHtml5,
  Css3Icon as MonoCss3Icon,
  Javascript as MonoJavascript,
  TailwindIcon as MonoTailwindIcon,
  Bootstrap as MonoBootstrap,
  Framer as MonoFramer,
  NodejsIcon as MonoNodejsIcon,
  Express as MonoExpress,
  MongodbIcon as MonoMongodbIcon,
  SpringIcon as MonoSpringIcon,
  Auth0 as MonoAuth0,
  MysqlIcon as MonoMysqlIcon,
  Postgresql as MonoPostgresql,
  Supabase as MonoSupabase,
  Neon as MonoNeon,
  Prisma as MonoPrisma,
  Langchain as MonoLangchain,
  GitIcon as MonoGitIcon,
  GithubIcon as MonoGithubIcon,
  PostmanIcon as MonoPostmanIcon,
  Aws as MonoAws,
  MicrosoftAzure as MonoMicrosoftAzure,
  Cloudflare as MonoCloudflare,
  Figma as MonoFigma,
  Docker as MonoDocker,
  Kubernetes as MonoKubernetes,
  Jenkins as MonoJenkins,
  Netlify as MonoNetlify,
  VercelIcon as MonoVercelIcon,
  CPlusplus as MonoCPlusplus,
  Java as MonoJava,
  Python as MonoPython
} from '@dev.icons/react/mono';

import { FaCode } from 'react-icons/fa';

// Map of components for easy key-based lookup
const DevIconsMap = {
  NextjsIcon,
  _React,
  Html5,
  Css3Icon,
  Javascript,
  TailwindIcon,
  Bootstrap,
  Framer,
  NodejsIcon,
  Express,
  MongodbIcon,
  SpringIcon,
  Auth0,
  MysqlIcon,
  Postgresql,
  Supabase,
  Neon,
  Prisma,
  Langchain,
  GitIcon,
  GithubIcon,
  PostmanIcon,
  Aws,
  MicrosoftAzure,
  Cloudflare,
  Figma,
  Docker,
  Kubernetes,
  Jenkins,
  Netlify,
  VercelIcon,
  CPlusplus,
  Java,
  Python
};

const MonoIconsMap = {
  NextjsIcon: MonoNextjsIcon,
  _React: Mono_React,
  Html5: MonoHtml5,
  Css3Icon: MonoCss3Icon,
  Javascript: MonoJavascript,
  TailwindIcon: MonoTailwindIcon,
  Bootstrap: MonoBootstrap,
  Framer: MonoFramer,
  NodejsIcon: MonoNodejsIcon,
  Express: MonoExpress,
  MongodbIcon: MonoMongodbIcon,
  SpringIcon: MonoSpringIcon,
  Auth0: MonoAuth0,
  MysqlIcon: MonoMysqlIcon,
  Postgresql: MonoPostgresql,
  Supabase: MonoSupabase,
  Neon: MonoNeon,
  Prisma: MonoPrisma,
  Langchain: MonoLangchain,
  GitIcon: MonoGitIcon,
  GithubIcon: MonoGithubIcon,
  PostmanIcon: MonoPostmanIcon,
  Aws: MonoAws,
  MicrosoftAzure: MonoMicrosoftAzure,
  Cloudflare: MonoCloudflare,
  Figma: MonoFigma,
  Docker: MonoDocker,
  Kubernetes: MonoKubernetes,
  Jenkins: MonoJenkins,
  Netlify: MonoNetlify,
  VercelIcon: MonoVercelIcon,
  CPlusplus: MonoCPlusplus,
  Java: MonoJava,
  Python: MonoPython
};

// Map of legacy react-icons or other database name variants to exact exports
const nameMap = {
    'react': '_React',
    'sireact': '_React',
    'fareact': '_React',
    'react-original': '_React',
    'nextjs': 'NextjsIcon',
    'next.js': 'NextjsIcon',
    'sinextdotjs': 'NextjsIcon',
    'nextjs-plain': 'NextjsIcon',
    'nextjs-original': 'NextjsIcon',
    'javascript': 'Javascript',
    'sijavascript': 'Javascript',
    'javascript-plain': 'Javascript',
    'tailwind': 'TailwindIcon',
    'tailwindcss': 'TailwindIcon',
    'sitailwindcss': 'TailwindIcon',
    'tailwindcss-plain': 'TailwindIcon',
    'html': 'Html5',
    'html5': 'Html5',
    'fahtml5': 'Html5',
    'sihtml5': 'Html5',
    'html5-plain': 'Html5',
    'css': 'Css3Icon',
    'css3': 'Css3Icon',
    'facss3': 'Css3Icon',
    'sicss3': 'Css3Icon',
    'css3-plain': 'Css3Icon',
    'framer': 'Framer',
    'siframer': 'Framer',
    'framer-original': 'Framer',
    'node.js': 'NodejsIcon',
    'fanodejs': 'NodejsIcon',
    'sinodedotjs': 'NodejsIcon',
    'nodejs': 'NodejsIcon',
    'nodejs-plain': 'NodejsIcon',
    'spring boot': 'SpringIcon',
    'springboot': 'SpringIcon',
    'sispringboot': 'SpringIcon',
    'spring-plain': 'SpringIcon',
    'express': 'Express',
    'siexpress': 'Express',
    'express-original': 'Express',
    'mongodb': 'MongodbIcon',
    'simongodb': 'MongodbIcon',
    'mongodb-plain': 'MongodbIcon',
    'postgresql': 'Postgresql',
    'sipostgresql': 'Postgresql',
    'postgresql-plain': 'Postgresql',
    'mysql': 'MysqlIcon',
    'simysql': 'MysqlIcon',
    'mysql-plain': 'MysqlIcon',
    'java': 'Java',
    'fajava': 'Java',
    'java-plain': 'Java',
    'c++': 'CPlusplus',
    'sicplusplus': 'CPlusplus',
    'cplusplus-plain': 'CPlusplus',
    'dsa': 'Cog',
    'aws': 'Aws',
    'faaws': 'Aws',
    'siamazonaws': 'Aws',
    'amazonwebservices-plain-wordmark': 'Aws',
    'git': 'GitIcon',
    'fagitalt': 'GitIcon',
    'sigit': 'GitIcon',
    'git-plain': 'GitIcon',
    'github': 'GithubIcon',
    'fagithub': 'GithubIcon',
    'sigithub': 'GithubIcon',
    'github-original': 'GithubIcon',
    'vs code': 'VisualStudioCode',
    'vscvscode': 'VisualStudioCode',
    'vscode-plain': 'VisualStudioCode',
    'postman': 'PostmanIcon',
    'sipostman': 'PostmanIcon',
    'postman-plain': 'PostmanIcon',
    'vercel': 'VercelIcon',
    'sivercel': 'VercelIcon',
    'vercel-original': 'VercelIcon',
};

// Generic finder
function findIconComponent(iconName, iconSet) {
    if (!iconName) return null;
    
    const searchKey = iconName.toLowerCase().trim();
    
    // 1. Check custom mapping first
    if (nameMap[searchKey] && iconSet[nameMap[searchKey]]) {
        return iconSet[nameMap[searchKey]];
    }
    
    const keys = Object.keys(iconSet);
    
    // 2. Try finding standalone name + Icon first
    const iconKey = keys.find(k => k.toLowerCase() === `${searchKey}icon`);
    if (iconKey) return iconSet[iconKey];
    
    // 3. Try finding exact case-insensitive match
    const exactKey = keys.find(k => k.toLowerCase() === searchKey);
    if (exactKey) return iconSet[exactKey];
    
    return null;
}

/**
 * Returns a colored React icon component from `@dev.icons/react`.
 * Falls back to FaCode if not found.
 */
export function getDeviconComponent(iconName) {
    return findIconComponent(iconName, DevIconsMap) || FaCode;
}

/**
 * Returns a monochrome React icon component from `@dev.icons/react/mono`.
 * Falls back to FaCode if not found.
 */
export function getDeviconMonoComponent(iconName) {
    return findIconComponent(iconName, MonoIconsMap) || FaCode;
}
