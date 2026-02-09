// solar/src/App.js
import { Routes, Route } from "react-router-dom";
import "./i18n";
import Header from "./components/header/Header.jsx";
import SocialNav from "./components/socialNav/SocialNav.jsx";
import Home from "./page/Home.jsx";
import About from "./page/About.jsx";
import Services from "./page/Services.jsx";
import Projects from "./page/Projects.jsx";
import Contact from "./page/Contact.jsx";
import News from "./page/News.jsx";
import Footer from "./components/footer/Footer.jsx";
import LanguageToggle from "./components/languageToggle/LanguageToggle.jsx";
import NewsDetails from "./components/newsDetails/NewsDetails.jsx";

function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
         
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <LanguageToggle />
        <SocialNav />
      </main>

      <Footer />
    </div>
  );
}

export default App;
