import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './TrainerSection.css';

const TrainerSection = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  return (
    <section className="section trainer-section">
      <div className="container">
        <div className="trainer-grid">
          <div className="trainer-content reveal-left" ref={addToRefs}>
            <h2 className="section-title text-left">{t.trainer.title}</h2>
            <p>{t.trainer.description}</p>
            <div className="trainer-stats mt-3">
              <div className="stat">
                <h4>15+</h4>
                <span>Years Experience</span>
              </div>
              <div className="stat">
                <h4>500+</h4>
                <span>Transformations</span>
              </div>
            </div>
          </div>
          
          <div className="trainer-image-wrapper reveal-right delay-200" ref={addToRefs}>
            <div className="trainer-image-frame">
              <div className="trainer-placeholder">
                <span>GYM MASTER</span>
              </div>
              <div className="frame-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerSection;
