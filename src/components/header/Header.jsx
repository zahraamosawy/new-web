import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import { MdMenu, MdClose } from "react-icons/md";

import "./Header.css";
import logo from "../../img/3d.jpeg";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [fade, setFade] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLang = () => {
    setFade(true); // بدء مرحلة الاختفاء

    setTimeout(() => {
      const newLang = i18n.language === "en" ? "ar" : "en";
      i18n.changeLanguage(newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";

      // ننتظر قليلاً ثم نبدأ مرحلة الظهور
      setFade(false);
    }, 400);
  };

  const navLinks = [
    { to: "/", label: "home", end: true },
    { to: "/about", label: "about" },
    { to: "/services", label: "services" },
    { to: "/projects", label: "projects" },
    { to: "/news", label: "news" },
    { to: "/contact", label: "contact" },
  ];

  return (
    <header className="navbar">
      <div className="header-container">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="logo" />
        </NavLink>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>

        <nav className={`links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              style={{ "--i": index }} // لتحديد ترتيب حركة الروابط
              className={fade ? "fade-out" : "fade-in"}
            >
              {t(link.label)}
            </NavLink>


            

          ))}
          <button
            className={`lang-btn ${fade ? "fade-out" : "fade-in"}`}
            onClick={toggleLang}
            style={{ "--i": navLinks.length }}
            // يظهر بعد آخر رابط مباشرة
          >
            <GrLanguage />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
