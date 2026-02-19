import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { login } from "../components/api/auth"; // ← المسار الصحيح حسب مشروعك
import "./Login.css";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "info.fg.iq@gmail.com", // حسب Postman (مطلوب)
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // استخدام auth.js بدل fetch
      const data = await login(formData);

      // حفظ بيانات المستخدم
      localStorage.setItem("user", JSON.stringify(data));

      toast.success(t("login.success") || "Login successful");

      // الانتقال
      navigate("/dashboard");

      // تحديث الصفحة لتحديث الهيدر
      window.location.reload();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        t("login.error") ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">

        <h2>{t("login.title")}</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>{t("login.username")}</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>{t("login.password")}</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit" disabled={loading}>

            {loading
              ? <span className="loader"></span>
              : t("login.submit")}

          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
