import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";
import ItemForm from "../components/dashboard/ItemForm";
import ItemsList from "../components/dashboard/ItemsList";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // التحقق من وجود توكن
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // جلب البيانات عند تحميل المكون
    fetchItems();
  }, [navigate, activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      // استبدل هذا الرابط برابط API الفعلي
      const response = await fetch(
        `https://fg.com.iq/api/items?type=${activeTab}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
      } else {
        console.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleItemAdded = () => {
    fetchItems();
  };

  const handleItemDeleted = () => {
    fetchItems();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{t("dashboard.title")}</h1>
        <button onClick={handleLogout} className="logout-btn">
          {t("dashboard.logout")}
        </button>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          {t("dashboard.projects")}
        </button>
        <button
          className={`tab-btn ${activeTab === "news" ? "active" : ""}`}
          onClick={() => setActiveTab("news")}
        >
          {t("dashboard.news")}
        </button>
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          {t("dashboard.products")}
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-form-section">
          <ItemForm
            type={activeTab}
            onItemAdded={handleItemAdded}
          />
        </div>

        <div className="dashboard-list-section">
          {loading ? (
            <div className="loading">{t("dashboard.loading")}</div>
          ) : (
            <ItemsList
              items={items}
              type={activeTab}
              onItemDeleted={handleItemDeleted}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
