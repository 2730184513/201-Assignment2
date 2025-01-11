import React from 'react';
import Navbar from './components/Navbar';
import Attractions from './components/Attractions';
import Foods from './components/Foods';
import Hotels from './components/Hotels';
import MusicControl from './components/MusicControl';
import './styles/App.css';

const App = () => {
    const handleExploreClick = () => {
        const attractionsSection = document.getElementById('attractions');
        attractionsSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <section id="home" className="hero-section">
                    <div className="hero-content">
                        <h1>Welcome to Penang</h1>
                        <p>Discover the Pearl of the Orient</p>
                        <button className="cta-button" onClick={handleExploreClick}>Explore Now</button>
                    </div>
                </section>
                
                <section id="attractions" className="section">
                    <h2>Popular Attractions</h2>
                    <Attractions />
                </section>

                <section id="food" className="section">
                    <h2>Food & Beverages</h2>
                    <Foods />
                </section>

                <section id="hotels" className="section">
                    <h2>Hotels & Accommodations</h2>
                    <Hotels />
                </section>
            </main>
            <MusicControl />
        </div>
    );
};

export default App;
