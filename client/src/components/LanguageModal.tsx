import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageModal.css';

const LanguageModal = () => {
  const { setLanguage, completeFirstVisit, t } = useLanguage();

  const handleSelectLanguage = (lang: 'en' | 'kn') => {
    setLanguage(lang);
    completeFirstVisit();
  };

  return (
    <div className="language-modal-overlay">
      <div className="language-modal-content fade-in visible">
        <div className="language-modal-header">
          <h2 className="language-modal-title">DRONACHARYA</h2>
          <p className="language-modal-subtitle">THE FITNESS GURUKULA</p>
        </div>
        
        <div className="language-modal-welcome">
          <h3>{t.modal.welcome}</h3>
          <p>{t.modal.chooseLanguage}</p>
        </div>

        <div className="language-modal-actions">
          <button 
            className="language-btn en-btn" 
            onClick={() => handleSelectLanguage('en')}
            aria-label="Continue in English"
          >
            <span className="lang-icon">🇬🇧</span>
            <span className="lang-name">ENGLISH</span>
            <span className="lang-desc">{t.modal.englishBtn}</span>
          </button>
          
          <button 
            className="language-btn kn-btn" 
            onClick={() => handleSelectLanguage('kn')}
            aria-label="ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ"
          >
            <span className="lang-icon">🇮🇳</span>
            <span className="lang-name">ಕನ್ನಡ</span>
            <span className="lang-desc">{t.modal.kannadaBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
