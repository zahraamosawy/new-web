import "./ProjectsDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectDetails = () => {
  const { id } = useParams(); // هذا يأخذ القيمة من الرابط /projects/:id
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // نطلب البيانات من السيرفر
        const data = await getItems({ type: "project", page: 1, limit: 50 });

        const foundProject = data.find(
          (item) => String(item.idItem) === String(id), // نضمن تحويل الطرفين لنصوص للمقارنة
        );

        setProject(foundProject);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!project) return <h2 className="error">Project not found! (ID: {id})</h2>;

  const images =
    project.images?.length > 0
      ? project.images.map((img) => `https://fg.com.iq/uploads/${img}`)
      : ["/placeholder.jpg"];

  return (
    <section className="project-details">
      <div className="project-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          className="details-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={project.titleAr || "project"} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="project-details-content">
          <h1>{i18n.language === "ar" ? project.titleAr : project.titleEr}</h1>

          <div className="description">
            {i18n.language === "ar"
              ? project.descriptionAr
              : project.descriptionEr}
          </div>

          <button className="back-btn" onClick={() => navigate("/projects")}>
            {i18n.language === "ar"
              ? "← العودة للمشاريع"
              : "← Back to Projects"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
