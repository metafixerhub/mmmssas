import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Language, type Translation, translations } from '../i18n';

interface LanguageContextType {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
  isFirstVisit: boolean;
  completeFirstVisit: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'kn')) {
      setLanguageState(savedLang);
      setIsFirstVisit(false);
      document.documentElement.lang = savedLang;
      document.documentElement.setAttribute('data-language', savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-language', lang);
  };

  const completeFirstVisit = () => {
    setIsFirstVisit(false);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, isFirstVisit, completeFirstVisit }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
