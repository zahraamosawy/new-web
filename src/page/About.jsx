import React from "react";
import AboutSection from "../components/aboutSection/AboutSection";
import MissionVision from "../components/missionVision/MissionVision";
import Sidebar from "../components/sidebar/Sidebar";
import SolarImportance from "../components/solarImportance/SolarImportance";

function About() {
  return (
    <div>
      
      <Sidebar />
      <AboutSection />
      <MissionVision />
      <SolarImportance />


    </div>
  );
}

export default About;
