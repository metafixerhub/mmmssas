import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Reviews.css';

const Reviews = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();

  return (
    <section id="reviews" className="section reviews-section">
      <div className="container">
        <div className="reviews-header reveal-up" ref={addToRefs}>
          <div className="reviews-stats">
            <h2 className="rating-number">{import.meta.env.VITE_BUSINESS_RATING} / 5</h2>
            <div className="stars">★★★★★</div>
            <p>{import.meta.env.VITE_BUSINESS_REVIEW_COUNT} {t.hero.reviewsLabel}</p>
          </div>
          <h2 className="section-title">{t.reviews.title}</h2>
        </div>

        <div className="reviews-grid">
          <div className="review-card reveal-left delay-100" ref={addToRefs}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"{t.reviews.review1}"</p>
            <p className="review-author">— {t.reviews.review1Author}</p>
          </div>

          <div className="review-card reveal-right delay-200" ref={addToRefs}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"{t.reviews.review2}"</p>
            <p className="review-author">— {t.reviews.review2Author}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
