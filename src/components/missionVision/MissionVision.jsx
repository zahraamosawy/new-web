import "./MissionVision.css";
import { useTranslation } from "react-i18next";
import heroImg from "../../img/16.jpeg";

const MissionVision = () => {
  const { t } = useTranslation();

  const missionList = t("missionVision.mission", { returnObjects: true });
  const visionList = t("missionVision.vision", { returnObjects: true });

  return (
    <section className="mission-vision">
      <div className="mv-hero">
        <img src={heroImg} alt="Mission & Vision" />
      </div>

      <div className="mv-content">
        <h2 className="mv-title">{t("missionVision.title")}</h2>

        <div className="mv-block">
          <h3 className="mv-subtitle">
            {t("missionVision.missionTitle")}
          </h3>
          <ul>
            {missionList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mv-block">
          <h3 className="mv-subtitle">
            {t("missionVision.visionTitle")}
          </h3>
          <ul>
            {visionList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
