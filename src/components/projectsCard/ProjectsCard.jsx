import "./ProjectsCard.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

const ProjectsCard = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getItems(1, 50);

      const filteredProjects = data.items.filter(
        (item) => normalizeItemType(item.itemType) === "project"
      );

      setNews(filteredProjects);
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-page">
      {news.map((item) => {
        const imageUrl =
          item.images?.length > 0
            ? `https://fg.com.iq/api/${item.images[0]}`
            : "/placeholder.jpg";

        return (
          <div className="projects-item" key={item.idItem}>
            <img src={imageUrl} alt={item.titleEr} />

            <div className="projects-text">
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
                to={`//${item.idItem}`}
                className="details-btn"
              >
                {t("projectsCard.more")}
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProjectsCard;
