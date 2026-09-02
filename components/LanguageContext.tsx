import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(Language.AR);

  const dir = language === Language.AR ? 'rtl' : 'ltr';

  useEffect(() => {
    // Update HTML attributes for global styling/accessibility
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    
    // Update body font class based on language
    if (language === Language.AR) {
        document.body.classList.add('font-arabic');
        document.body.classList.remove('font-sans');
    } else {
        document.body.classList.add('font-sans');
        document.body.classList.remove('font-arabic');
    }
  }, [language, dir]);

  const t = (key: string) => {
    const translation = TRANSLATIONS[language] as Record<string, string>;
    return translation[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
