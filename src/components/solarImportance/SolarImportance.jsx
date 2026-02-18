import "./SolarImportance.css";
import { FaLeaf, FaRecycle, FaDollarSign, FaBolt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import img from "../../img/img2/future2.jpeg";

const icons = [FaLeaf, FaRecycle, FaDollarSign, FaBolt];

const SolarImportance = () => {
  const { t } = useTranslation();

  const features = t("solarImportance.features", {
    returnObjects: true,
  });

  return (
    <section className="solar-importance">
      <div className="solar-image">
        <img src={img} alt="Solar Panels" />
      </div>

      <div className="solar-content">
        <h2>{t("solarImportance.title")}</h2>

        <p className="intro">{t("solarImportance.intro")}</p>

        {features.map((item, index) => {
          const Icon = icons[index];

          return (
            <div className="feature" key={index}>
              <span className="icon">
                <Icon />
              </span>
              <div className="feature-text-group">
                {" "}
                {/* أضفنا حاوية هنا */}
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SolarImportance;
