import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Visit Penang</h1>
            </div>
            <div className="navbar-links">
                <a href="#home">Home</a>
                <a href="#attractions">Attractions</a>
                <a href="#food">Food & Beverages</a>
                <a href="#hotels">Hotels</a>
            </div>
        </nav>
    );
};

export default Navbar; 