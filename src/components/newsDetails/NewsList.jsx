import "./NewsList.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

const NewsList = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getItems(1, 50);

      const filteredNews = data.items.filter(
        (item) => normalizeItemType(item.itemType) === "news"
      );

      setNews(filteredNews);
    };

    fetchNews();
  }, []);

  return (
    <section className="news-page">
      {news.map((item) => {
        const imageUrl =
          item.images?.length > 0
            ? `https://fg.com.iq/uploads/${item.images[0]}`
            : "/placeholder.jpg";

        return (
          <div className="news-item" key={item.idItem}>
            <img src={imageUrl} alt={item.titleEr} />

            <div className="news-text">
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

              <Link
                to={`/news/${item.idItem}`}
                className="details-btn"
              >
                {t("newsCenter.more")}
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default NewsList;
