import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Dumbbell, ShieldCheck, UserCheck, Flame, Heart, ArrowUpRight } from 'lucide-react';
import './Features.css';

const Features = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  const featureItems = [
    {
      icon: <Dumbbell size={40} />,
      title: t.features.modernEquipmentTitle,
      desc: t.features.modernEquipmentDesc,
      delay: 'delay-100'
    },
    {
      icon: <ShieldCheck size={40} />,
      title: t.features.cleanTitle,
      desc: t.features.cleanDesc,
      delay: 'delay-200'
    },
    {
      icon: <UserCheck size={40} />,
      title: t.features.expertTitle,
      desc: t.features.expertDesc,
      delay: 'delay-300'
    },
    {
      icon: <Flame size={40} />,
      title: t.features.motivatingTitle,
      desc: t.features.motivatingDesc,
      delay: 'delay-100'
    },
    {
      icon: <Heart size={40} />,
      title: t.features.womenTitle,
      desc: t.features.womenDesc,
      delay: 'delay-200'
    },
    {
      icon: <ArrowUpRight size={40} />,
      title: t.features.fitnessLevelsTitle,
      desc: t.features.fitnessLevelsDesc,
      delay: 'delay-300'
    }
  ];

  return (
    <section id="features" className="section features-section">
      <div className="container">
        
        <div className="features-header text-center reveal-up" ref={addToRefs}>
          <h2 className="section-title">WHY CHOOSE US</h2>
        </div>

        <div className="features-grid">
          {featureItems.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card reveal-up ${feature.delay}`}
              ref={addToRefs}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
