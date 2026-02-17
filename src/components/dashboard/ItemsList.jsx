import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./ItemsList.css";

const ItemsList = ({ items, type, onItemDeleted }) => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm(t("dashboard.confirmDelete"))) {
      return;
    }

    setLoading(true);
    try {
      // استبدل هذا الرابط برابط API الفعلي
      const response = await fetch(`https://fg.com.iq/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        // إعلام المكون الأصل بحذف العنصر
        onItemDeleted();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-list">
        <p>{t("dashboard.noItems")}</p>
      </div>
    );
  }

  return (
    <div className="items-list">
      <h2>
        {t("dashboard.list")}{" "}
        {type === "projects"
          ? t("dashboard.projects")
          : type === "news"
          ? t("dashboard.news")
          : t("dashboard.products")}
      </h2>

      <div className="items-container">
        {items.map((item) => (
          <div className="item-card" key={item.idItem}>
            {item.images && item.images.length > 0 && (
              <div className="item-image">
                <img
                  src={`https://fg.com.iq/api/${item.images[0]}`}
                  alt={
                    i18n.language === "ar"
                      ? item.titleAr
                      : item.titleEr
                  }
                />
              </div>
            )}

            <div className="item-content">
              <h3>
                {i18n.language === "ar"
                  ? item.titleAr
                  : item.titleEr}
              </h3>

              {item.subTitleAr && item.subTitleEr && (
                <h4>
                  {i18n.language === "ar"
                    ? item.subTitleAr
                    : item.subTitleEr}
                </h4>
              )}

              <p className="item-description">
                {i18n.language === "ar"
                  ? item.descriptionAr
                  : item.descriptionEr}
              </p>

              <div className="item-footer">
                <span className="item-date">
                  {new Date(item.created_at).toLocaleDateString(
                    i18n.language === "ar" ? "ar-SA" : "en-US"
                  )}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.idItem)}
                  disabled={loading}
                >
                  {t("dashboard.delete")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
