import React from "react";
import AboutSection from "../components/aboutSection/AboutSection";
import MissionVision from "../components/missionVision/MissionVision";
import SolarImportance from "../components/solarImportance/SolarImportance";
import HeroSlider from "../components/heroSlider/HeroSlider";

function About() {
  return (
    <div>
      <HeroSlider />
      <AboutSection />
      <MissionVision />
      <SolarImportance />


    </div>
  );
}

export default About;
