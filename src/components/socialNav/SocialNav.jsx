import "./SocialNav.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { HiMail } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../languageToggle/LanguageToggle";
import { IoLogoYoutube } from "react-icons/io";

const SocialNav = () => {
  const { t } = useTranslation();

  const phone = "9647750003399";
  const email = "info.fg.iq@gmail.com";

  // WhatsApp message
  const whatsappMessage = t("social.whatsappMessage");
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Email subject and body
  const subject = encodeURIComponent(t("social.emailSubject"));
  const body = encodeURIComponent(t("social.emailBody"));

  // Gmail direct link (الأفضل)
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

  return (
    <div className="social-nav">

      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiInstagramFill />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiWhatsappFill />
      </a>

      {/* LinkedIn */}
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn />
      </a>
       <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
      >
       <IoLogoYoutube />
      </a>

      {/* Gmail */}
      <a
        href={gmailLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <HiMail />
      </a>
    <LanguageToggle />

    </div>
  );
};

export default SocialNav;
