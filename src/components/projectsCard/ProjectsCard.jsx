import React from 'react'
import "./ProjectsCard.css";
import { useTranslation } from "react-i18next";
import { newsImages } from "../../data";
import { Link } from "react-router-dom";

function ProjectsCard() {
  return (
     <section className="news-page">
          {newsData.map((item, index) => (
            <div className="news-item" key={index}>
              <img src={newsImages[item.image]} alt={item.title} />
    
              <div className="news-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
    
                {/* زر التفاصيل */}
                <Link to={`/news/${index}`} className="details-btn">
                  {t("newsCenter.more")}
                </Link>
              </div>
            </div>
          ))}
        </section>
  )
}

export default ProjectsCard;