import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './TrustBar.css';

const TrustBar = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  return (
    <div className="trust-bar reveal-up" ref={addToRefs}>
      <div className="container trust-bar-container">
        
        <div className="trust-item">
          <div className="trust-icon">★</div>
          <div className="trust-text">
            <h4>{t.trustBar.rating}</h4>
            <p>{t.trustBar.reviews}</p>
          </div>
        </div>
        
        <div className="trust-item">
          <div className="trust-icon">🏋️</div>
          <div className="trust-text">
            <h4>{t.trustBar.equipment}</h4>
            <p>{t.trustBar.equipmentSub}</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">✨</div>
          <div className="trust-text">
            <h4>{t.trustBar.clean}</h4>
            <p>{t.trustBar.cleanSub}</p>
          </div>
        </div>

        <div className="trust-item">
          <div className="trust-icon">🤝</div>
          <div className="trust-text">
            <h4>{t.trustBar.trainers}</h4>
            <p>{t.trustBar.trainersSub}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustBar;
