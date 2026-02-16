import "./NewsList.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";

const NewsList = () => {

  const { t, i18n } = useTranslation();

  const [news, setNews] = useState([]);

  useEffect(() => {

    const fetchNews = async () => {

      try {

        const data = await getItems({
          type: "news",
          page: 1,
          limit: 50,
        });

        setNews(data.items || data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchNews();

  }, []);

  return (

    <section className="news-page">

      {news.map((item) => (

        <div className="news-item" key={item.id}>

          <img
            src={`https://fg.com.iq/${item.image}`}
            alt={item.titleEr}
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
              to={`/news/${item.id}`}
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
