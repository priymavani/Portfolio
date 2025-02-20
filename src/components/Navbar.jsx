// components/Navbar.js
import React, { useState } from 'react';

const Navbar = ({ setCurrentSection, currentSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'journey', label: 'Coding Journey' },
    { id: 'contact', label: 'Contact Me' },
  ];
  
  const handleNavClick = (sectionId) => {
    setCurrentSection(sectionId);
    setMenuOpen(false); // Close menu when an item is clicked
  };

  return (
    <nav className="navbar">
      <div className="logo">Priy Mavani</div>
      
      <button 
        className="mobile-menu-btn" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <li key={item.id} className={currentSection === item.id ? 'active' : ''}>
            <button onClick={() => handleNavClick(item.id)}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;