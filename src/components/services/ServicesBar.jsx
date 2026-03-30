import "./ServicesBar.css";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaSolarPanel } from "react-icons/fa";
import { MdOutlineEnergySavingsLeaf } from "react-icons/md";

const ServicesBar = () => {
  const { t, i18n } = useTranslation();
  const services = t("services.list", { returnObjects: true });

  const isRTL = i18n.language === "ar";

  return (
    <section className={`services-section ${isRTL ? "rtl" : ""}`}>
      <div className="services-container">

        {/* Title Animation */}
        <motion.h1
          className="services-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("services.title")}
        </motion.h1>

        {/* Services List */}
        <ul className="services-list">
          {services.map((service, index) => (
            <motion.li
              key={index}
              className="services-item"
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <FaSolarPanel className="service-icon" />
              {service}
            </motion.li>
          ))}
        </ul>

        {/* Footer */}
        <motion.div
          className="services-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="footer-left">
            <MdOutlineEnergySavingsLeaf />
            <span>{t("services.footer")}</span>
          </div>

          <span className="page-number">03</span>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesBar;