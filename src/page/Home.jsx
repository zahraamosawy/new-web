import React from "react";
import AboutSection from "../components/aboutSection/AboutSection";
import NewsCenter from "../components/newsCenter/NewsCenter";
import StatsSection from "../components/statsSection/StatsSection";
import HeroSlider from "../components/heroSlider/HeroSlider";

function Home() {
  return (
    <div>
      <HeroSlider />
      <AboutSection />
      <StatsSection />
      <NewsCenter />
    </div>
  );
}

export default Home;
