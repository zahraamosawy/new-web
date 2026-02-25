import "./NewsDetails.css";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
        newsItems
          .filter((item) => item.idItem !== Number(id))
          .slice(0, 4)
      );
    };

    fetchData();
  }, [id]);

  if (!article) return <h2>Loading...</h2>;

  const images =
    article.images?.length > 0
      ? article.images.map(
          (img) => `https://fg.com.iq/uploads/${img}`
        )
      : ["/placeholder.jpg"];

  return (
    <section
      className={`single-news-container ${
        i18n.language === "ar" ? "rtl" : ""
      }`}
    >
      {/* MAIN CONTENT */}
      <div className="single-news-content">

        {/* IMAGE SLIDER */}
        <div className="news-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="news" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TITLE */}
        <h1>
          {i18n.language === "ar"
            ? article.titleAr
            : article.titleEr}
        </h1>

        {/* TEXT */}
        <p>
          {i18n.language === "ar"
            ? article.descriptionAr
            : article.descriptionEr}
        </p>

      </div>

      {/* SIDEBAR */}
      <aside className="news-sidebar">
        <h3>{t("newsCenter.recommended")}</h3>

        {recommended.map((item) => {
          const recImage =
            item.images?.length > 0
              ? `https://fg.com.iq/uploads/${item.images[0]}`
              : "/placeholder.jpg";

          return (
            <div key={item.idItem} className="recommended-item">

              <img src={recImage} alt={item.titleEr} />

              <div className="recommended-info">
                <h4>
                  {i18n.language === "ar"
                    ? item.titleAr
                    : item.titleEr}
                </h4>

                <Link
                  to={`/news/${item.idItem}`}
                  className="read-more-btn"
                >
                  {t("newsCenter.more")}
                </Link>
              </div>
            </div>
          );
        })}
      </aside>
    </section>
  );
};

export default NewsDetails;