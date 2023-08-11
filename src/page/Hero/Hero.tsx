import React, { useEffect } from 'react';
import './Hero.css';

const Hero: React.FC = () => {

  useEffect(() => {
    const interval = setInterval(() => {
      const mask = document.querySelector('.mask');
      const spans = mask?.querySelectorAll('span');

      if (spans && spans.length > 0) {
        const currentShow = mask?.querySelector('span[data-show]');
        const nextShow = currentShow?.nextElementSibling || spans[0];

        if (currentShow) {
          currentShow.removeAttribute('data-show');
        }

        if (nextShow) {
          nextShow.setAttribute('data-show', '');
        }
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <div className="hero-container">
      <h2>
        Turn your Meeting into
        <div className="mask">
          <span data-show>a gripping narrative.</span>
          <span>a concise report.</span>
          <span>an insightful overview.</span>
          <span>a captivating digest.</span>
        </div>
      </h2>
      <a className="btn btn-primary btn-lg mt-3 home-btn" href="#summerize-home">
        Get Started
      </a>
    </div>
  );
};

export default Hero;
