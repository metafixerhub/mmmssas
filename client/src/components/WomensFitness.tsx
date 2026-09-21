import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './WomensFitness.css';

const WomensFitness = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  return (
    <section className="section womens-fitness-section">
      <div className="womens-fitness-bg" />
      <div className="container">
        <div className="womens-fitness-content text-center reveal-scale" ref={addToRefs}>
          <h2 className="section-title">{t.womensFitness.title}</h2>
          <p>{t.womensFitness.description}</p>
          <a href="#contact" className="btn btn-primary mt-4">
            {t.nav.contact}
          </a>
        </div>
      </div>
    </section>
  );
};

export default WomensFitness;
