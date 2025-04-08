import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import MatrixRain from './MatrixRain';
import CustomCursor from './CustomCursor';

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState('');
  const fullText = "Je m'appelle Nicolas Blanc et je suis développeur d'application web et mobile.";
  
  const socialLinks = [
    { name: 'LinkedIn', icon: '/linkedin-icon.svg', url: 'https://www.linkedin.com/in/nicolas-blanc-6b270014b/' },
    { name: 'GitHub', icon: '/github-icon.svg', url: 'https://github.com/NicoDev83' },
    { name: 'TryHackMe', icon: '/tryhackme-icon.svg', url: 'https://tryhackme.com/p/Dreadx' },
    { name: 'Email', icon: '/email-icon.svg', url: 'mailto:pro@nicolasblanc.fr' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    // Effet de frappe
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Vitesse de frappe (ajustable)
  
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
    <CustomCursor />
    <div className="portfolio-container">
      <MatrixRain />
      <div className="content-wrapper">
        <div className="center-content">
          <img 
            src="/nicolas_blanc.png" 
            alt="Nicolas_Blanc" 
            className="profile-image"
          />
        </div>

        <div className="typing-text">
          {text}
          <span className="cursor">|</span>
        </div>
        
        <div className="social-links-container">
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              className={`social-link ${isLoaded ? 'appear' : ''}`}
              style={{
                '--delay': `${index * 0.5}s`,
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={link.icon}
                alt={link.name}
                className="icon-image"
              />
              <span className="name">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Portfolio;