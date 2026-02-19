import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import "./Login.css"; // سنستخدم نفس التنسيق لتوحيد الشكل

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://fg.com.iq/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t("register.success") || "Account Created!");
        navigate("/login"); // نوجهه لتسجيل الدخول بعد نجاح التسجيل
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>{t("register.title")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("register.username")}</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t("register.email")}</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>{t("register.password")}</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : t("register.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;