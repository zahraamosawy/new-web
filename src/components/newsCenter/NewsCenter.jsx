import "./NewsCenter.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType";

const NewsCenter = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItems(1, 10);

      const filteredNews = data.items.filter(
        (item) => normalizeItemType(item.itemType) === "news"
      );

      setNews(filteredNews.slice(0, 4)); // بس 4 أخبار بالهوم
    };

    fetchItems();
  }, []);

  return (
    <section className="news-center">
      <h2 className="news-title">
        <span>{t("newsCenter.titleRed")}</span>{" "}
        {t("newsCenter.titleBlack")}
      </h2>

      <div className="news-grid">
        {news.map((item) => {
          const imageUrl =
            item.images?.length > 0
              ? `https://fg.com.iq/api/${item.images[0]}`
              : "/placeholder.jpg";

          return (
            <div className="news-card" key={item.idItem}>
              <img src={imageUrl} alt={item.titleEr} />

              <div className="news-content">
                <h3>
                  {i18n.language === "ar"
                    ? item.titleAr
                    : item.titleEr}
                </h3>

                <p className="clamp">
                  {i18n.language === "ar"
                    ? item.descriptionAr
                    : item.descriptionEr}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/news" className="more-btn">
        {t("newsCenter.more")}
      </Link>
    </section>
  );
};

export default NewsCenter;
