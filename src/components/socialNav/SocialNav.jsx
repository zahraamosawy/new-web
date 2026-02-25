import "./SocialNav.css";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { HiMail } from "react-icons/hi";
import { IoLogoYoutube } from "react-icons/io";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../languageToggle/LanguageToggle";

const SocialNav = () => {
  const { t } = useTranslation();

  const phone = "9647750003399";
  const email = "info.fg.iq@gmail.com";

  const whatsappMessage = t("social.whatsappMessage");
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const subject = encodeURIComponent(t("social.emailSubject"));
  const body = encodeURIComponent(t("social.emailBody"));

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

  return (
    <div className="social-nav">

      {/* Facebook */}
      <a
        href="https://www.facebook.com/futuregen.iq"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/future_generation_solar/"
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
        href="https://www.linkedin.com/company/future-generation-iq/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn />
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@FutuerGeneration"
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