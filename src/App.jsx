// solar/src/App.js
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./i18n";

// المكونات (Components)
import Header from "./components/header/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/footer/Footer.jsx";
import SocialNav from "./components/socialNav/SocialNav.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import NewsDetails from "./components/newsDetails/NewsDetails.jsx";
import ProjectDetails from "./components/projectsCard/ProjectsDetails.jsx";

// الصفحات (Pages)
import Home from "./page/Home.jsx";
import About from "./page/About.jsx";
import Services from "./page/Services.jsx";
import Projects from "./page/Projects.jsx";
import Contact from "./page/Contact.jsx";
import News from "./page/News.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Dashboard from "./page/Dashboard.jsx";

function App() {
  return (
    <div className="app-layout">
      {/* العناصر الثابتة في أعلى الصفحة */}
      <Header />
      <NavBar /> 
      <Toaster position="top-center" />

      {/* المحتوى الرئيسي المتغير */}
      <main className="main-content">
        <Routes>
          {/* المسارات العامة (Public Routes) */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* المسارات المحمية (Protected Routes) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* أيقونات التواصل الاجتماعي الجانبية */}
        <SocialNav />
      </main>

      {/* العنصر الثابت في أسفل الصفحة */}
      <Footer />
    </div>
  );
}

export default App;