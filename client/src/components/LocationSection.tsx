import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LocationSection.css';

const LocationSection = () => {
  const { t } = useLanguage();
  
  const mapUrl = import.meta.env.VITE_GOOGLE_MAPS_URL;
  const address = import.meta.env.VITE_BUSINESS_ADDRESS;
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || '')}`;

  return (
    <section id="location" className="section location-section">
      <div className="container">
        <div className="location-grid">
          <div className="location-content">
            <h2 className="section-title text-left">{t.nav.location}</h2>
            <h3 className="location-name">{import.meta.env.VITE_BUSINESS_NAME}</h3>
            <p className="location-address">{address}</p>
            <p className="location-phone">📞 {import.meta.env.VITE_BUSINESS_PHONE}</p>
            
            <a 
              href={mapUrl || mapSearchUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary mt-3"
            >
              {t.location.getDirections}
            </a>
          </div>
          
          <div className="location-map">
            <iframe 
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Dronacharya The Fitness Gurukula, Krishnarajpete, Karnataka')}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px', borderRadius: '4px' }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
