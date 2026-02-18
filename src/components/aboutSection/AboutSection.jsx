import "./AboutSection.css";
import aboutImg from "../../img/img3.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);

    const timer = setTimeout(() => {
      setFade(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [i18n.language]); // 🔥 يتفعل فقط عند تغيير اللغة

  return (
    <section className={`about-section ${fade ? "fade-out" : "fade-in"}`}>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-tag">{t("aboutUs.title")}</h1>
          <h2 className="about-title">Future Generation</h2>

          <p>{t("aboutUs.paragraph1")}</p>
          <p>{t("aboutUs.paragraph2")}</p>
          <p>{t("aboutUs.paragraph3")}</p>
          <p>{t("aboutUs.paragraph4")}</p>

          <Link to="/about" className="about-btn">
            {t("aboutUs.buttun")}
          </Link>
        </div>

        <div className="about-image">
          <img src={aboutImg} alt="Solar Panels" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
