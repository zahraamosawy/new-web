import "./ProjectsCard.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

const ProjectsCard = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Starting to fetch projects...");
        const data = await getItems({ type: "project", page: 1, limit: 50 });
        
        console.log("Projects data received:", data); // للتحقق من البيانات
        console.log("Number of items received:", data.length);
        
        // عرض كل عنصر وتصنيفه
        data.forEach(item => {
          const normalizedType = normalizeItemType(item.itemType);
          console.log(`Item ${item.idItem}: type="${item.itemType}" -> normalized="${normalizedType}"`);
        });

        const filteredProjects = data.filter(
          (item) => normalizeItemType(item.itemType) === "project"
        );
        
        console.log("Filtered projects:", filteredProjects); // للتحقق من البيانات بعد التصفية
        console.log("Number of filtered projects:", filteredProjects.length);
        
        setProjects(filteredProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (projects.length === 0) return <div>No projects available</div>;

  return (
    <section className="projects-page">
      {projects.map((item) => {
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
                to={`/projects/${item.idItem}`}
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
