import React from "react";
import AboutSection from "../components/aboutSection/AboutSection";
import MissionVision from "../components/missionVision/MissionVision";
import SolarImportance from "../components/solarImportance/SolarImportance";
import HeroSlider from "../components/heroSlider/HeroSlider";
import Milestones from "../components/milestones/Milestones";

function About() {
  return (
    <div>
      <HeroSlider />
      <AboutSection />
         <Milestones />
      <MissionVision />
      <SolarImportance />


    </div>
  );
}

export default About;
