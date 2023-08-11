import React, { useEffect, useState } from 'react';
import './Home.css';
import Hero from '../Hero/Hero';
import Summerize from '../Summerize/Summerize';

const Home: React.FC = () => {
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight / 2) {
        setShowHero(false);
      } else {
        setShowHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`full-screen ${showHero ? 'show' : 'hide'}`}>
        <Hero />
      </div>
      <div
        id="summerize-home"
        className={`full-screen ${showHero ? 'hide' : 'show'}`}
      >
        <Summerize />
      </div>
    </>
  );
};

export default Home;
