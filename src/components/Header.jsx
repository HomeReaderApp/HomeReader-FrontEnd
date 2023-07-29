
// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 

export default function Header(){
  return (
    <header className="header">
      <div className="logo">
        {/* Replace the image URL with your round logo image */}
        <img src="your-round-logo.png" alt="Logo" />
      </div>
      <nav className="navbar">
        <Link to="/teacher/classes">
          <button>Teacher classes</button>
        </Link>

        <Link to="/teacher/class-dropdown">
          <button>Comments</button>
        </Link>

        <Link to="/teacher/favourite-books">
          <button>Favourite books</button>
        </Link>
      </nav>
    </header>
  );
};
