import { FaMapPin } from "react-icons/fa6";
import "./ContactUs.css";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const ContactUs = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      );

      toast.success(t("contactUs.form.success"));
      form.current.reset();
    } catch (error) {
      console.error("Email Error:", error);
      toast.error(t("contactUs.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <h1 className="contact-title">{t("contactUs.title")}</h1>

      <div className="contact-container">
        {/* Left Info */}
        <div className="contact-info">
          <h2>{t("contactUs.company")}</h2>

          <p>
            <strong>
              <FaMapPin /> {t("contactUs.addressTitle")}
            </strong>
            <br />
            {t("contactUs.mainBranch")}
            <br />
            {t("contactUs.secondBranch")}
          </p>

          <p>
            <strong>{t("contactUs.whatsappLabel")}</strong>
            {t("contactUs.phones")}
          </p>

          <p>
            <strong>{t("contactUs.emailLabel")}</strong>
            info.fg.iq@gmail.com
          </p>
        </div>

        {/* Form */}
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder={t("contactUs.form.name")}
              required
            />

            <input
              type="text"
              name="whatsapp"
              placeholder={t("contactUs.form.whatsapp")}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder={t("contactUs.form.email")}
            required
          />

          <textarea
            name="message"
            placeholder={t("contactUs.form.message")}
            rows="4"
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? t("contactUs.form.sending") || "Sending..."
              : t("contactUs.form.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
