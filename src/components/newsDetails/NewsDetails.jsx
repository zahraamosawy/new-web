import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Styles
import "./NewsDetails.css";

const NewsDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const [article, setArticle] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems({ type: "news", page: 1, limit: 50 });

        const newsItems = data.filter(
          (item) => normalizeItemType(item.itemType) === "news"
        );

        const selected = newsItems.find(
          (item) => item.idItem === Number(id)
        );

        setArticle(selected);

        // جلب أخبار مقترحة (باستثناء الخبر الحالي)
        setRecommended(
          newsItems
            .filter((item) => item.idItem !== Number(id))
            .slice(0, 4)
        );
      } catch (error) {
        console.error("Error fetching news details:", error);
      }
    };

    fetchData();
    // العودة لأعلى الصفحة عند تغيير الخبر
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) return <h2 className="loading-text">Loading...</h2>;

  // معالجة مصفوفة الصور
  const images = article.images?.length > 0
    ? article.images.map((img) => `https://fg.com.iq/uploads/${img}`)
    : ["/placeholder.jpg"];

  return (
    <section className={`single-news-container ${i18n.language === "ar" ? "rtl" : ""}`}>
      
      <div className="single-news-content">
        {/* IMAGE SLIDER */}
        <div className="news-slider">
          <Swiper
            key={article.idItem} // لضمان إعادة تهيئة السلايدر عند تغيير الخبر
            modules={[Navigation, Pagination, Autoplay]}
            navigation={images.length > 1}
            pagination={{ clickable: true }}
            autoplay={images.length > 1 ? { delay: 4000 } : false}
            loop={images.length > 1}
            spaceBetween={10}
            slidesPerView={1}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="slide-image-wrapper">
                  <img src={img} alt={`Slide ${index + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CONTENT TEXT */}
        <div className="news-body">
          <h1>
            {i18n.language === "ar" ? article.titleAr : article.titleEr}
          </h1>
          <p className="description-text">
            {i18n.language === "ar" ? article.descriptionAr : article.descriptionEr}
          </p>
        </div>
      </div>

      {/* SIDEBAR - RECOMMENDED NEWS */}
      <aside className="news-sidebar">
        <h3>{t("newsCenter.recommended")}</h3>
        <div className="recommended-list">
          {recommended.map((item) => {
            const recImage = item.images?.length > 0
              ? `https://fg.com.iq/uploads/${item.images[0]}`
              : "/placeholder.jpg";

            return (
              <div key={item.idItem} className="recommended-item">
                <img src={recImage} alt="recommended" />
                <div className="recommended-info">
                  <h4>
                    {i18n.language === "ar" ? item.titleAr : item.titleEr}
                  </h4>
                  <Link to={`/news/${item.idItem}`} className="read-more-link">
                    {t("newsCenter.more")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

    </section>
  );
};

export default NewsDetails;