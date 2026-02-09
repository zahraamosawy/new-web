import "./NewsCenter.css";
import { useTranslation } from "react-i18next";
import { newsImages } from "../../data";
import { Link } from "react-router-dom";

const NewsCenter = () => {
  const { t } = useTranslation();

  const newsData = t("newsCenter.items", { returnObjects: true });

  return (
    <section className="news-center">
      <h2 className="news-title">
        <span>{t("newsCenter.titleRed")}</span> {t("newsCenter.titleBlack")}
      </h2>

      <div className="news-grid">
        {newsData.map((item, index) => (
          <div className="news-card" key={index}>
            <img src={newsImages[item.image]} alt={item.title} />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/news" className="more-btn">
        {t("newsCenter.more")}
      </Link>
    </section>
  );
};

export default NewsCenter;
