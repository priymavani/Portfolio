import React from 'react';

const CodingJourney = () => {
  const journeyTimeline = [
    {
      id: 1,
      month: 'AUG',
      year:'2024',
      title: 'Beginning of the Journey',
      description: 'Started my coding journey by learning web development fundamentals, focusing on HTML, CSS, and JavaScript. Alongside, I explored Git and GitHub for version control and UI/UX design using Figma.',
      milestones: [
        'Learned HTML, CSS, and JavaScript basics',
        'Explored Git and GitHub for version control',
        'Designed UI/UX wireframes using Figma',
        'Built basic static websites to practice'
      ]
    },
    {
      id: 2,
      month: 'OCT',
      year:'2024',
      title: 'Stepping into Programming',
      description: 'Dived into programming by learning C and JavaScript. Focused on problem-solving with basic coding questions while continuously working on frontend projects to strengthen my web development skills.',
      milestones: [
        'Learned C programming basics',
        'Practiced problem-solving with basic coding exercises',
        'Built and refined multiple frontend projects',
        'Created website clones: Tata Clone, Coding Ninjas Clone, Realme Clone'
      ]
    },
    {
      id: 3,
      month: 'DEC',
      year:'2024',
      title: 'Entering the React World',
      description: 'Started learning React.js, focusing on building dynamic and interactive applications using hooks and reusable components. Worked on real-world API-fetching projects to enhance my React skills.',
      milestones: [
        'Learned React fundamentals and JSX',
        'Implemented React Hooks (useState, useEffect)',
        'Built reusable and modular React components',
        'Developed projects with API integration'
      ]
    },
    {
      id: 4,
      month: 'JAN',
      year:'2025',
      title: 'Exploring Backend Development',
      description: 'Transitioned into backend development with Node.js, Express.js, and MongoDB. Gained knowledge about servers, REST APIs, authentication, and database management while working on full-stack applications.',
      milestones: [
        'Learned Node.js and Express.js for backend development',
        'Explored MongoDB and MongoDB Atlas for NoSQL database management',
        'Created RESTful APIs with authentication and authorization',
        'Built API-based projects inspired by LinkedIn and YouTube',
        'Used Postman for API testing and documentation'
      ]
    },
    {
      id: 5,
      month: 'FEB',
      year:'2025',
      title: 'Starting the MERN Stack Journey',
      description: 'Began working on Task Bridge, a full-stack project designed to be a task management tool for teams. Designed the UI in Figma and implemented the frontend with React while setting up backend functionalities.',
      milestones: [
        'Designed Task Bridge UI/UX in Figma',
        'Developed Task Bridge using React for the frontend',
        'Implemented backend with Node.js, Express, and MongoDB',
        'Integrated authentication and task management features',
        'Focused on real-time collaboration and team productivity tools'
      ]
    }
  ];
  
  return (
    <section className="coding-journey section">
      <h2>My Coding Journey</h2>
      <div className="timeline">
        {journeyTimeline.map(item => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-marker">{item.month} <div>{item.year}</div> </div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="milestones">
                <h4>Key Milestones:</h4>
                <ul>
                  {item.milestones.map((milestone, index) => (
                    <li key={index}>{milestone}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CodingJourney;