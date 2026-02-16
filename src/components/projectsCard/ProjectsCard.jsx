import React, { useEffect, useState } from "react";
import "./ProjectsCard.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getItems } from "../api/items";

function ProjectsCard() {

  const { t, i18n } = useTranslation();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const data = await getItems({
          itemtype: "project",
          page: 1,
          limit: 10,
        });

        setProjects(data.items || data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-page">

      {projects.map((item) => (

        <div className="projects-item" key={item.id}>

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
              to={`/projects/${item.id}`}
              className="details-btn"
            >
              {t("newsCenter.more")}
            </Link>

          </div>

        </div>

      ))}

    </section>
  );
}

export default ProjectsCard;
