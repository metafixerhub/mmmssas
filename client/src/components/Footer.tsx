import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>DRONACHARYA</h3>
          <p>THE FITNESS GURUKULA</p>
          <p className="footer-address">{import.meta.env.VITE_BUSINESS_ADDRESS}</p>
          <p className="footer-phone">📞 {import.meta.env.VITE_BUSINESS_PHONE}</p>
        </div>
        
        <div className="footer-links">
          <h4>{t.footer.quickLinks}</h4>
          <ul>
            <li><a href="#home">{t.nav.home}</a></li>
            <li><a href="#about">{t.nav.about}</a></li>
            <li><a href="#facilities">{t.nav.facilities}</a></li>
            <li><a href="#gallery">{t.nav.gallery}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
          </ul>
        </div>

        {instagramUrl && (
          <div className="footer-social">
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Instagram
            </a>
          </div>
        )}
      </div>
      <div className="footer-bottom">
        <p>{t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
