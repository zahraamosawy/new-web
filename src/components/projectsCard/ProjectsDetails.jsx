import "./ProjectsDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { useTranslation } from "react-i18next";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getItems({ page: 1, limit: 100 });

        const selected = data.find(
          (item) => item.idItem.toString() === id
        );

        setProject(selected);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  const imageUrl =
    project.images?.length > 0
      ? `https://fg.com.iq/api/${project.images[0]}`
      : "/placeholder.jpg";

  return (
    <section className="project-details">
      <img src={imageUrl} alt={project.titleEr} />

      <div className="project-details-content">
        <h1>
          {i18n.language === "ar"
            ? project.titleAr
            : project.titleEr}
        </h1>

        <p>
          {i18n.language === "ar"
            ? project.descriptionAr
            : project.descriptionEr}
        </p>

        <button
          className="back-btn"
          onClick={() => navigate("/projects")}
        >
          ← Back to Projects
        </button>
      </div>
    </section>
  );
};

export default ProjectDetails;
