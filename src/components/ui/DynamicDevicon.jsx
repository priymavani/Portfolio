'use client';

import React from 'react';
import * as DevIcons from '@dev.icons/react';
import * as MonoIcons from '@dev.icons/react/mono';
import { FaCode } from 'react-icons/fa';

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

export default function DynamicDevicon({ iconName, isMono, size, className, ...props }) {
  const IconComponent = findIconComponent(iconName, isMono ? MonoIcons : DevIcons) || FaCode;
  return <IconComponent size={size} className={className} {...props} />;
}
