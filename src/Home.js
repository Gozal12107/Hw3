// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page!</h1>
      <p>
        Hello, I'm Gozal Alizada, a 2024 SITE student. I'm passionate about creating interactive projects.
        Explore my work below and dive into the exciting world of learning!
      </p>
      <h2>Projects</h2>
      <ul>
        <li>
          <strong>Flashcard Quiz App:</strong> A project focused on creating flashcards using React.
          Explore the source code on GitHub and try it out!
          <br />
          GitHub Repository: <a href="https://github.com/Gozal12107/hw3" target="_blank" rel="noopener noreferrer">Flashcard Quiz App on GitHub</a>
          <br />
          Live Demo: <a href="https://your-demo-url.com" target="_blank" rel="noopener noreferrer">Flashcard Quiz App Demo</a>
        </li>
        <li>
          <strong>Gozal's Bio Page:</strong> A project showcasing my bio information.
          Explore the source code on GitHub and learn more about me!
          <br />
          GitHub Repository: <a href="https://github.com/Gozal12107/Gozals_Bio_Page" target="_blank" rel="noopener noreferrer">Gozal's Bio Page on GitHub</a>
        </li>
        {/* Add more projects as needed */}
      </ul>
      <Link to="/flashcards">
        <button className="btn btn-go-to-flashcards">Go to Flashcards</button>
      </Link>
    </div>
  );
};

export default Home;
