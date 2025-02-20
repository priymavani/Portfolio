
import React from 'react';
import C from '../assets/sololearn_C.png'
import JS from '../assets/sololearn_JS.png'
const Resume = () => {
  
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Computer Science',
      institution: 'Rai University',
      period: '2024 - 2028',
      description: 'Semester 1 : CGPA - 9.95.'
    },
    {
      id: 2,
      degree: 'Higher Secondary',
      institution: 'The School of Science',
      period: '2023 - 2024',
      description: 'Percentage: 79.85%'
    }
  ];
  
  const certifications = [
    {
      id: 1,
      title: 'Introduction to C',
      issuer: 'SoloLearn',
      img:'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051851/team_%22team%40123%22/oehlrhcleacbhphf7qph.png',
      link :'https://www.sololearn.com/certificates/CC-RAJXJIZY'
    },
    {
      id: 2,
      title: 'Introduction to JavaScript',
      issuer: 'Sololearn',
      img:'https://res.cloudinary.com/dd6lqkak0/image/upload/v1740051857/team_%22team%40123%22/ocvk8wn6ddvumh8qndfy.png',
      link : 'https://www.sololearn.com/certificates/CC-JWTVNWRM'
    }
  ];
  
  return (
    <section className="resume section">
      <h2>Resume</h2>

      <iframe 
                src="/Resume_PriyMavani.pdf" 
                title="Resume Preview" 
                className="resume-preview"
      ></iframe>
            
      <div className="download-btn">
        <a href="/Resume_PriyMavani.pdf" download>Download PDF</a>
      </div>
      
      {/* <div className="resume-section">
        <h3>Experience</h3>
        {experiences.map(exp => (
          <div key={exp.id} className="resume-item">
            <div className="resume-item-header">
              <h4>{exp.role}</h4>
              <span className="period">{exp.period}</span>
            </div>
            <h5>{exp.company}</h5>
            <p>{exp.description}</p>
          </div>
        ))}
      </div> */}
      
      <div className="resume-section">
        <h3>Education</h3>
        {education.map(edu => (
          <div key={edu.id} className="resume-item">
            <div className="resume-item-header">
              <h4>{edu.degree}</h4>
              <span className="period">{edu.period}</span>
            </div>
            <h5>{edu.institution}</h5>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
      
      <div className="resume-section">
        <h3>Certifications</h3>
        <div className="certifications-grid">
          {certifications.map(cert => (
            <div key={cert.id} className="certification-item">
              <h4>{cert.title}</h4>
              <img className='cert' src={cert.img} alt="certificate" />
              <p>{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
