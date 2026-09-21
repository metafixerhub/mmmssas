import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Facilities.css';

const Facilities = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  const facilities = [
    { title: t.facilities.strength, image: '/images/gym/interior-1.jpg', span: 'col-span-2' },
    { title: t.facilities.cardio, image: '/images/gym/interior-2.jpg', span: 'col-span-1' },
    { title: t.facilities.freeWeights, image: '/images/gym/main.jpg', span: 'col-span-3' }
  ];

  return (
    <section id="facilities" className="section facilities-section">
      <div className="container">
        <h2 className="section-title text-center reveal-up" ref={addToRefs}>{t.facilities.title}</h2>
        
        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div 
              key={index} 
              className={`facility-card ${facility.span} reveal-scale delay-${(index % 3 + 1) * 100}`}
              ref={addToRefs}
            >
              <div className="facility-image-wrapper">
                <img src={facility.image} alt={facility.title} className="facility-image" loading="lazy" />
                <div className="facility-overlay" />
              </div>
              <div className="facility-content">
                <h3>{facility.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
