import React from "react";
import AboutSection from "../components/aboutSection/AboutSection";
import NewsCenter from "../components/newsCenter/NewsCenter";
import StatsSection from "../components/statsSection/StatsSection";
import Sidebar from "../components/sidebar/Sidebar";

function Home() {
  return (
    <div>
      <Sidebar />

      <AboutSection />
      <StatsSection />
      <NewsCenter />
    </div>
  );
}

export default Home;
