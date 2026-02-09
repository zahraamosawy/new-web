import "./Milestones.css";
import { useTranslation } from "react-i18next";

const Milestones = () => {
  const { t, i18n } = useTranslation();
  const items = t("milestones.items", { returnObjects: true });

  return (
    <section className="milestones-section">
      {/* IMAGE */}
      <div className="milestones-image">
      </div>

      {/* TITLE */}
      <h2 className="milestones-title">
        {t("milestones.title")}
      </h2>

      {/* CONTENT */}
      <div className={`milestones-content ${i18n.language === "ar" ? "rtl" : ""}`}>
        
        {/* RIGHT COLUMN */}
        <div className="milestones-column">
          {items.slice(0, 3).map((item, i) => (
            <MilestoneItem key={i} item={item} number={i + 1} />
          ))}
        </div>

        {/* LEFT COLUMN */}
        <div className="milestones-column">
          {items.slice(3, 6).map((item, i) => (
            <MilestoneItem key={i} item={item} number={i + 4} />
          ))}
        </div>

      </div>
    </section>
  );
};

const MilestoneItem = ({ item, number }) => {
  return (
    <div className="milestone-item">
      <div className="milestone-head">
        <span className="milestone-number">{number}.</span>
        <span className="milestone-date">{item.date}</span>
      </div>
      <p className="milestone-text">{item.text}</p>
    </div>
  );
};

export default Milestones;
