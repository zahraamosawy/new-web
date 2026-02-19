import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../api/axiosInstance"; // تأكد من المسار الصحيح
import "./ItemsList.css";

const ItemsList = ({ items, type, onItemDeleted }) => {
  const { t, i18n } = useTranslation();
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm(t("dashboard.confirmDelete"))) return;

    try {
      setLoadingId(id);

      await axiosInstance.delete("/items", {
        data: { id }, // مهم جداً لأن axios يحط body بهالشكل بالـ DELETE
      });

      if (onItemDeleted) {
        onItemDeleted();
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    } finally {
      setLoadingId(null);
    }
  };

  if (!items || items.length === 0) {
    return <div className="empty-list">{t("dashboard.noItems")}</div>;
  }

  return (
    <div className="items-list">
      <h2>{t("dashboard.list")}</h2>

      <div className="items-container">
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            {item.images && item.images.length > 0 && (
              <div className="item-image">
                <img
                  src={`/api/${item.images[0]}`} 
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

              <p>
                {i18n.language === "ar"
                  ? item.descriptionAr
                  : item.descriptionEr}
              </p>

              <button
                onClick={() => handleDelete(item.id)}
                disabled={loadingId === item.id}
              >
                {loadingId === item.id
                  ? t("dashboard.deleting")
                  : t("dashboard.delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsList;
