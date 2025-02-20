import React from 'react';

const Footer = () => {
  const socialLinks = [
    { id: 'github', icon: 'fab fa-github', url: 'https://github.com/priymavani' },
    { id: 'linkedin', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/priy-mavani/' },

  ];
  
  return (
    <footer className="footer">
      <div className="social-links">
        {socialLinks.map(link => (
          <a 
            key={link.id} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className={link.icon}></i>
          </a>
        ))}
      </div>
      <p className="copyright">© {new Date().getFullYear()} Priy Mavani. All rights reserved.</p>
    </footer>
  );
};

export default Footer;