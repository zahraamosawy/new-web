import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageUpload from "./ImageUpload";
import "./ItemForm.css";

const ItemForm = ({ type, onItemAdded }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    titleAr: "",
    titleEr: "",
    subTitleAr: "",
    subTitleEr: "",
    descriptionAr: "",
    descriptionEr: "",
    itemType: type,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (newImages) => {
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // إنشاء FormData لإرسال البيانات والصور
      const itemFormData = new FormData();

      // إضافة الحقول النصية
      Object.keys(formData).forEach(key => {
        itemFormData.append(key, formData[key]);
      });

      // إضافة الصور
      images.forEach((image, index) => {
        itemFormData.append(`images[${index}]`, image.file);
      });

      // استبدل هذا الرابط برابط API الفعلي
      const response = await fetch("https://fg.com.iq/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: itemFormData,
      });

      const data = await response.json();

      if (response.ok) {
        // إعادة تعيين النموذج
        setFormData({
          titleAr: "",
          titleEr: "",
          subTitleAr: "",
          subTitleEr: "",
          descriptionAr: "",
          descriptionEr: "",
          itemType: type,
        });
        setImages([]);

        // إعلام المكون الأصل بإضافة عنصر جديد
        onItemAdded();
      } else {
        setError(data.message || "Failed to add item");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-form">
      <h2>
        {t("dashboard.add")}{" "}
        {type === "projects"
          ? t("dashboard.projects")
          : type === "news"
          ? t("dashboard.news")
          : t("dashboard.products")}
      </h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="titleAr">{t("dashboard.titleAr")}</label>
            <input
              type="text"
              id="titleAr"
              name="titleAr"
              value={formData.titleAr}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="titleEr">{t("dashboard.titleEr")}</label>
            <input
              type="text"
              id="titleEr"
              name="titleEr"
              value={formData.titleEr}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subTitleAr">{t("dashboard.subTitleAr")}</label>
            <input
              type="text"
              id="subTitleAr"
              name="subTitleAr"
              value={formData.subTitleAr}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subTitleEr">{t("dashboard.subTitleEr")}</label>
            <input
              type="text"
              id="subTitleEr"
              name="subTitleEr"
              value={formData.subTitleEr}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="descriptionAr">{t("dashboard.descriptionAr")}</label>
          <textarea
            id="descriptionAr"
            name="descriptionAr"
            value={formData.descriptionAr}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descriptionEr">{t("dashboard.descriptionEr")}</label>
          <textarea
            id="descriptionEr"
            name="descriptionEr"
            value={formData.descriptionEr}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>{t("dashboard.images")}</label>
          <ImageUpload onImagesChange={handleImageChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? t("dashboard.loading") : t("dashboard.submit")}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
