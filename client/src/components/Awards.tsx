import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Trophy } from 'lucide-react';
import './Awards.css';

const Awards = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  return (
    <section id="awards" className="section awards-section">
      <div className="container">
        <div className="awards-grid">
          
          <div className="awards-content reveal-left" ref={addToRefs}>
            <div className="awards-icon-wrapper">
              <Trophy className="awards-icon" />
            </div>
            <h2 className="section-title text-left">{t.awards.title}</h2>
            <p className="awards-description">{t.awards.description}</p>
          </div>

          <div className="awards-image-wrapper reveal-right delay-200" ref={addToRefs}>
            <div className="image-frame">
              {/* Fallback styling in case image isn't loaded yet */}
              <img 
                src="/images/gym/awards.png" 
                alt="Gym Awards and Medals" 
                className="awards-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="image-glow"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Awards;
