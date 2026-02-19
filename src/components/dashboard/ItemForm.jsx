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
      // 1️⃣ إنشاء العنصر (JSON فقط)
      const createResponse = await fetch("https://fg.com.iq/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const createData = await createResponse.json();

      if (!createResponse.ok) {
        throw new Error(createData.message || "Failed to create item");
      }

      const newItemId = createData.item_id;

      // 2️⃣ رفع الصور بعد إنشاء العنصر
      if (images.length > 0) {
        for (let image of images) {
          const imageFormData = new FormData();
          imageFormData.append("image", image.file);
          imageFormData.append("idItem", newItemId);

          const imageResponse = await fetch(
            "https://fg.com.iq/api/items-image",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: imageFormData,
            }
          );

          if (!imageResponse.ok) {
            console.error("Image upload failed");
          }
        }
      }

      // Reset form
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
      onItemAdded();

    } catch (err) {
      setError(err.message || "Something went wrong");
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
          <input
            type="text"
            name="titleAr"
            placeholder="Title Arabic"
            value={formData.titleAr}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="titleEr"
            placeholder="Title English"
            value={formData.titleEr}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="subTitleAr"
            placeholder="SubTitle Arabic"
            value={formData.subTitleAr}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subTitleEr"
            placeholder="SubTitle English"
            value={formData.subTitleEr}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="descriptionAr"
          placeholder="Description Arabic"
          value={formData.descriptionAr}
          onChange={handleChange}
          required
        />

        <textarea
          name="descriptionEr"
          placeholder="Description English"
          value={formData.descriptionEr}
          onChange={handleChange}
          required
        />

        <ImageUpload onImagesChange={handleImageChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ItemForm;
