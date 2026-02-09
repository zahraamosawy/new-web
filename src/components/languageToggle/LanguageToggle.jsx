import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import "./LanguageToggle.css";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [fade, setFade] = useState(false);

  const toggleLang = () => {
    setFade(true);
    setTimeout(() => {
      const newLang = i18n.language === "en" ? "ar" : "en";
      i18n.changeLanguage(newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      setFade(false);
    }, 300);
  };

  return (
    <button 
      className={`lang-btn-fixed ${fade ? "fade-out" : "fade-in"}`} 
      onClick={toggleLang}
    >
      <span className="lang-text">
      </span>
      <GrLanguage className="lang-icon" />
    </button>
  );
};

export default LanguageToggle;