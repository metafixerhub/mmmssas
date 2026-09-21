import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.facilities, href: '#facilities' },
    { name: t.nav.training, href: '#training' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.location, href: '#location' },
    { name: t.nav.contact, href: '#contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        
        <div className="nav-brand">
          <a href="#home">{import.meta.env.VITE_BUSINESS_NAME || 'DRONACHARYA'}</a>
        </div>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} className="nav-link">{link.name}</a>
          ))}
          
          <button 
            className="lang-toggle-btn"
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
          >
            {language === 'en' ? 'ಕನ್ನಡ' : 'ENG'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle desktop-hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button 
            className="mobile-lang-btn"
            onClick={() => {
              setLanguage(language === 'en' ? 'kn' : 'en');
              setMobileMenuOpen(false);
            }}
          >
            {language === 'en' ? 'Switch to ಕನ್ನಡ' : 'Switch to English'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
