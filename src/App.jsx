// App.js - Main component with FontAwesome integration
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Projects from './components/Projects';
import CodingJourney from './components/CodingJourney';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const [currentSection, setCurrentSection] = useState('about');
  const [loaded, setLoaded] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  // Load FontAwesome when component mounts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.onload = () => setLoaded(true);
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 2000); // Minimum loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);
  
  // Show loader until both loaded and loadingComplete are true
  useEffect(() => {
    if (loaded && loadingComplete) {
      setLoaded(true);
    }
  }, [loaded, loadingComplete]);
  
  return (
    <>
      {!loadingComplete ? (
        <Loader />
      ) : (
        <div className="portfolio-app">
          <Navbar setCurrentSection={setCurrentSection} currentSection={currentSection} />
          <main>
            {currentSection === 'about' && <About />}
            {currentSection === 'contact' && <Contact />}
            {currentSection === 'resume' && <Resume />}
            {currentSection === 'projects' && <Projects />}
            {currentSection === 'journey' && <CodingJourney />}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;