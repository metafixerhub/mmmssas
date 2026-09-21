import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Features from '../components/Features';
import Facilities from '../components/Facilities';
import TrainingExperience from '../components/TrainingExperience';
import TrainerSection from '../components/TrainerSection';
import WomensFitness from '../components/WomensFitness';
import Reviews from '../components/Reviews';
import Gallery from '../components/Gallery';
import LocationSection from '../components/LocationSection';
import ContactForm from '../components/ContactForm';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div>
      <Hero />
      <TrustBar />
      <section id="about" className="section container">
        <h2>{t.about.heading1}</h2>
        <p>{t.about.description}</p>
      </section>
      <Features />
      <Facilities />
      <TrainingExperience />
      <TrainerSection />
      <WomensFitness />
      <Reviews />
      <Gallery />
      <LocationSection />
      <ContactForm />
    </div>
  );
};

export default Home;
