import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './TrainingExperience.css';

const TrainingExperience = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  const steps = [
    { num: t.training.step1Title, desc: t.training.step1Desc },
    { num: t.training.step2Title, desc: t.training.step2Desc },
    { num: t.training.step3Title, desc: t.training.step3Desc },
    { num: t.training.step4Title, desc: t.training.step4Desc }
  ];

  return (
    <section id="training" className="section training-section">
      <div className="container">
        <h2 className="section-title text-center reveal-up" ref={addToRefs}>{t.training.title}</h2>
        
        <div className="training-steps-container">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`training-step reveal-up delay-${(index + 1) * 100}`}
              ref={addToRefs}
            >
              <div className="step-number-card">
                <div className="step-count">0{index + 1}</div>
                <h3>{step.num}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingExperience;
