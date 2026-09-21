import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const { t } = useLanguage();
  const { addToRefs } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    goal: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', goal: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-container">
        
        <div className="contact-info reveal-left" ref={addToRefs}>
          <h2 className="section-title text-left">{t.contact.title}</h2>
          
          <div className="contact-details mt-4">
            <div className="contact-detail-item">
              <MapPin className="contact-icon" />
              <div>
                <h4>LOCATION</h4>
                <p>Opposite Government Hospital, Next to Ranga Theatre, KR Pete - 571426</p>
              </div>
            </div>
            
            <div className="contact-detail-item">
              <Phone className="contact-icon" />
              <div>
                <h4>PHONE</h4>
                <p>{import.meta.env.VITE_BUSINESS_PHONE}</p>
              </div>
            </div>
            
            <div className="contact-detail-item">
              <Clock className="contact-icon" />
              <div>
                <h4>HOURS</h4>
                <p>Mon-Sat: 5:30 AM - 9:30 PM<br/>Sun: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="contact-actions mt-4">
            <a href={`tel:${import.meta.env.VITE_BUSINESS_PHONE}`} className="btn btn-primary btn-block">
              {t.contact.callNow}
            </a>
            <a 
              href={`https://wa.me/91${import.meta.env.VITE_BUSINESS_PHONE?.replace(/^0+/, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary btn-block mt-2"
            >
              {t.contact.whatsappUs}
            </a>
          </div>
        </div>

        <div className="contact-form-wrapper reveal-right delay-200" ref={addToRefs}>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>{t.contact.name}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>{t.contact.phone}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>{t.contact.email}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>{t.contact.goal}</label>
              <select name="goal" value={formData.goal} onChange={handleChange} required>
                <option value="" disabled>---</option>
                <option value="General Fitness">{t.contact.goals.general}</option>
                <option value="Weight Training">{t.contact.goals.weight}</option>
                <option value="Strength">{t.contact.goals.strength}</option>
                <option value="Cardio">{t.contact.goals.cardio}</option>
                <option value="Beginner">{t.contact.goals.beginner}</option>
                <option value="Other">{t.contact.goals.other}</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>{t.contact.message}</label>
              <textarea name="message" rows={4} value={formData.message} onChange={handleChange}></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? t.contact.submitting : t.contact.submit}
            </button>
            
            {status === 'success' && <p className="status-success">{t.contact.success}</p>}
            {status === 'error' && <p className="status-error">{t.contact.error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
