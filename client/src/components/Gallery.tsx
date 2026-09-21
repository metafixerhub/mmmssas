import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();
  const [filter, setFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { src: '/images/gym/main.jpg', category: 'GYM' },
    { src: '/images/gym/interior-1.jpg', category: 'INTERIOR' },
    { src: '/images/gym/interior-2.jpg', category: 'INTERIOR' },
    { src: '/images/gym/hero-bg.jpg', category: 'GYM' },
    { src: '/images/branding/logo.jpeg', category: 'INTERIOR' }
  ];

  const filteredImages = filter === 'ALL' 
    ? images 
    : images.filter(img => img.category === filter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <h2 className="section-title text-center reveal-up" ref={addToRefs}>{t.nav.gallery}</h2>
        
        <div className="gallery-filters reveal-up delay-200" ref={addToRefs}>
          {['ALL', 'GYM', 'INTERIOR'].map((cat) => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {t.gallery[cat.toLowerCase() as keyof typeof t.gallery] || cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((img, index) => (
            <div 
              key={index} 
              className={`gallery-item reveal-scale delay-${(index % 3 + 1) * 100}`}
              ref={addToRefs}
              onClick={() => openLightbox(index)}
            >
              <img src={img.src} alt={`Gallery image ${index + 1}`} loading="lazy" />
              <div className="gallery-overlay">
                <span>+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </button>
          
          <button className="lightbox-prev" onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[lightboxIndex].src} 
              alt="Lightbox" 
            />
          </div>
          
          <button className="lightbox-next" onClick={nextImage}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
