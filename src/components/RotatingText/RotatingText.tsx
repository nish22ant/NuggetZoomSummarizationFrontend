import React, { useEffect } from 'react';
import './RotatingText.css';

interface RotatingTextProps {
  phrases: string[];
}

const RotatingText: React.FC<RotatingTextProps> = ({ phrases }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const mask = document.querySelector('.rotating-mask');
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
    <div className="rotating-container">
      <h1>
        <div className="rotating-mask">
          {phrases.map((phrase, index) => (
            <span key={index} data-show={index === 0 ? '' : undefined}>
              {phrase}
            </span>
          ))}
        </div>
      </h1>
    </div>
  );
};

export default RotatingText;
