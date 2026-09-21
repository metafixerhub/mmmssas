import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div 
        className="hero-background" 
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div className="hero-overlay" />
      
      <div className="hero-content">
        <h1 className="hero-title reveal-up" ref={addToRefs}>
          {t.hero.title.split(' ').map((word, i) => (
            <span key={i} className="title-word">{word} </span>
          ))}
        </h1>
        <h2 className="hero-subtitle reveal-up delay-200" ref={addToRefs}>{t.hero.subtitle}</h2>
        
        <div className="hero-actions reveal-up delay-400" ref={addToRefs}>
          <a href="#contact" className="btn btn-primary btn-lg">
            {t.hero.primaryButton}
          </a>
          <a href="#facilities" className="btn btn-secondary btn-lg">
            {t.hero.secondaryButton}
          </a>
        </div>
      </div>
      
      <div className="hero-scroll-indicator reveal-scale delay-400" ref={addToRefs}>
        <span>Scroll</span>
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
