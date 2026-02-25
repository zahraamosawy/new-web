import "./ProjectsCard.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";

const ProjectsCard = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getItems({ type: "project" });
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
 if (loading) return <div>Loading...</div>;
  if (projects.length === 0) return <div>No projects available</div>;
  return (
    <section className="projects-page">
      {projects.map((item) => (
        <div className="project-card" key={item.idItem}>
          
           <img
            src={
              item.images && item.images.length > 0
                ? `https://fg.com.iq/uploads/${item.images[0]}`
                : "/default-project.jpg"
            }
            alt={i18n.language === "ar" ? item.titleAr : item.titleEr}
            className="project-image"
          />

          <div className="project-overlay">
            <h3>
              {i18n.language === "ar"
                ? item.titleAr
                : item.titleEr}
            </h3>

            <Link
              to={`/projects/${item.idItem}`}
              className="details-btn"
            >
              {t("projectsCard.more")}
            </Link>
          </div>

        </div>
      ))}
    </section>
  );
};

export default ProjectsCard;