"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import uz from "../../public/locales/uz/translation.json";
import ru from "../../public/locales/ru/translation.json";
import en from "../../public/locales/en/translation.json";

type Language = "uz" | "ru" | "en";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => any;
}

const translations: Record<Language, any> = { uz, ru, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("uz");

  useEffect(() => {
    const savedLang = localStorage.getItem("atrak-lang") as Language | null;
    if (savedLang && (savedLang === "uz" || savedLang === "ru" || savedLang === "en")) {
      setTimeout(() => {
        setLanguage(savedLang);
      }, 0);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("atrak-lang", lang);
  };

  const t = (key: string, replacements?: Record<string, string | number>): any => {
    const keys = key.split(".");
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Return raw key as fallback
      }
    }

    if (typeof value === "string") {
      let result = value;
      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          result = result.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }
      return result;
    }

    return value !== undefined ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
