import "./NewsList.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // أضفنا useNavigate
import { getItems } from "../api/items";

const NewsList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // هوك للتنقل البرمجي

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getItems({ type: "news" });
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // دالة للتعامل مع النقر على الكارد بالكامل
  const handleCardClick = (id) => {
    // نتحقق إذا كان عرض الشاشة أصغر من 900px (نفس قيمة الميديا كويري)
    if (window.innerWidth <= 900) {
      navigate(`/news/${id}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (news.length === 0) return <div>No news available</div>;

  return (
    <section className="news-page">
      {news.map((item) => (
        <div 
          className="news-item" 
          key={item.idItem}
          onClick={() => handleCardClick(item.idItem)} // النقر على الكارد
          style={{ cursor: window.innerWidth <= 900 ? 'pointer' : 'default' }}
        >
          
          <img
            src={
              item.images && item.images.length > 0
                ? `https://fg.com.iq/uploads/${item.images[0]}`
                : "/default-news.jpg"
            }
            alt={i18n.language === "ar" ? item.titleAr : item.titleEr}
            className="news-image"
          />

          <div className="news-text">
            <h3>
              {i18n.language === "ar" ? item.titleAr : item.titleEr}
            </h3>

            {/* أضفنا كلاس truncate-text هنا */}
            <p className="truncate-text">
              {i18n.language === "ar"
                ? item.descriptionAr
                : item.descriptionEr}
            </p>

            <Link to={`/news/${item.idItem}`} className="details-btn">
              {t("newsCenter.more")}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NewsList;