import "./NewsList.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems } from "../api/items";

const NewsList = () => {
  const { t, i18n } = useTranslation();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchNews = async () => {
    try {
      const data = await getItems({ type: "news" });
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };
  

  fetchNews();
}, []);


  if (loading) return <div>Loading...</div>;

  if (news.length === 0) return <div>No news available</div>;

  return (
    <section className="news-page">
      {news.map((item) => (
        <div className="news-item" key={item.idItem}>
          
          {/* صورة افتراضية حالياً */}
          <img
            src="/placeholder.jpg"
            alt={i18n.language === "ar" ? item.titleAr : item.titleEr}
          />

          <div className="news-text">
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

            <Link
              to={`/news/${item.idItem}`}
              className="details-btn"
            >
              {t("newsCenter.more")}
            </Link>

          </div>
        </div>
      ))}
    </section>
  );
};

export default NewsList;
