import "./NewsDetails.css";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { newsImages } from "../../data";

const NewsDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const newsData = t("newsCenter.items", { returnObjects: true });

  const article = newsData[id];

  if (!article) return <h2>Not Found</h2>;

  return (
    <section className="single-news-container">
      
      {/* المحتوى الرئيسي */}
      <div className="single-news-content">

        <h1>{article.title}</h1>
        
        <p>{article.desc}</p>
         <img src={newsImages[article.image]} alt={article.title} />
      </div>

      {/* السايدبار */}
      <aside className="news-sidebar">
        <h3>{t("newsCenter.recommended")}</h3>

        {newsData.map((item, index) =>
          index != id ? (
            <div key={index} className="recommended-item">
              <img src={newsImages[item.image]} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <Link to={`/news/${index}`}>
                  {t("newsCenter.more")}
                </Link>
              </div>
            </div>
          ) : null
        )}
      </aside>
    </section>
  );
};

export default NewsDetails;
