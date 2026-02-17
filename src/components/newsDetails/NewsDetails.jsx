import "./NewsDetails.css";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

const NewsDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [article, setArticle] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItems({ type: "news", page: 1, limit: 50 });

      const newsItems = data.filter(
        (item) => normalizeItemType(item.itemType) === "news"
      );

      const selected = newsItems.find(
        (item) => item.idItem === Number(id)
      );

      setArticle(selected);
      setRecommended(
        newsItems.filter((item) => item.idItem !== Number(id)).slice(0, 4)
      );
    };

    fetchData();
  }, [id]);

  if (!article) return <h2>Loading...</h2>;

  const imageUrl =
    article.images?.length > 0
      ? `https://fg.com.iq/api/${article.images[0]}`
      : "/placeholder.jpg";

  return (
    <section className="single-news-container">
      <div className="single-news-content">
        <h1>
          {i18n.language === "ar"
            ? article.titleAr
            : article.titleEr}
        </h1>

        <img src={imageUrl} alt={article.titleEr} />

        <p>
          {i18n.language === "ar"
            ? article.descriptionAr
            : article.descriptionEr}
        </p>
      </div>

      <aside className="news-sidebar">
        <h3>{t("newsCenter.recommended")}</h3>

        {recommended.map((item) => (
          <div key={item.idItem} className="recommended-item">
            <h4>
              {i18n.language === "ar"
                ? item.titleAr
                : item.titleEr}
            </h4>

            <Link to={`/news/${item.idItem}`}>
              {t("newsCenter.more")}
            </Link>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default NewsDetails;
