import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ur";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  isElderly: boolean;
  setIsElderly: (val: boolean) => void;
  t: (en: string, ur: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [isElderly, setIsElderly] = useState(false);

  const t = (en: string, ur: string) => (lang === "en" ? en : ur);

  useEffect(() => {
    if (isElderly) {
      document.documentElement.classList.add('elderly-mode');
    } else {
      document.documentElement.classList.remove('elderly-mode');
    }
  }, [isElderly]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, isElderly, setIsElderly, t }}>
      <div dir={lang === "ur" ? "rtl" : "ltr"} className={`${lang === "ur" ? "font-urdu" : ""} ${isElderly ? 'text-2xl' : ''}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
