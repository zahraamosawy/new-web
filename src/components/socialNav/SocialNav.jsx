import { CgChevronDoubleUpR } from "react-icons/cg";
import "./SocialNav.css";
import { FaFacebookF} from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";


const SocialNav = () => {
  return (
    <div className="social-nav">
       <a href='https://facebook.com' target='_blank' rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
      <a href='https://instagram.com' target='_blank' rel="noopener noreferrer" aria-label="Instagram"><RiInstagramFill /></a>
      <a href='https://twitter.com' target='_blank' rel="noopener noreferrer" aria-label="Twitter"><RiWhatsappFill /></a>
      <a href='https://linkedin.com' target='_blank' rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
      <a href='https://linkedin.com' target='_blank' rel="noopener noreferrer" aria-label="LinkedIn"><HiMail /></a>


    </div>
    
  );
};

export default SocialNav;
