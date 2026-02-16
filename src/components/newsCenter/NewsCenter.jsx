import "./NewsCenter.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";

const NewsCenter = () => {
  const { t, i18n } = useTranslation();

  const [items, setItems] = useState([]);

  useEffect(() => {
  const fetchItems = async () => {
    try {
      const data = await getItems({
        type: "news",
        page: 1,
        limit: 10,
      });

      setItems(data.items || data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchItems();
}, []);


  return (
    <section className="news-center">
      <h2 className="news-title">
        <span>{t("newsCenter.titleRed")}</span> {t("newsCenter.titleBlack")}
      </h2>

      <div className="news-grid">
        {items.map((item, index) => (
          <div className="news-card" key={index}>
            <img
              src={`http://localhost:5000/${item.image}`}
              alt={item.titleEr}
            />

            <div className="news-content">
              <h3>
                {i18n.language === "ar"
                  ? item.titleAr
                  : item.titleEr}
              </h3>

              <p>
                {i18n.language === "ar"
                  ? item.descriptionAr
                  : item.descriptionEr}
              </p>
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
