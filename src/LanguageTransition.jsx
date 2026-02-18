//src/LanguageTransition.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageTransition = ({ children }) => {
  const { i18n } = useTranslation();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);

    const timer = setTimeout(() => {
      setFade(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [i18n.language]);

  return (
    <div className={`lang-transition ${fade ? "fade-out" : "fade-in"}`}>
      {children}
    </div>
  );
};

export default LanguageTransition;
