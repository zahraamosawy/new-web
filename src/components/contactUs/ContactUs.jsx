import { FaMapPin } from "react-icons/fa6";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <section className="contact">
     

      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-container">
        {/* Left Info */}
        <div className="contact-info">
          <h2>Future Generation</h2>

          <p>
            <strong><FaMapPin />Address:</strong><br />
            No. 1201 Huafeng Road Shushan Economic Development Zone<br />
            Shushan District Hefei City Anhui Province
          </p>

          <p>
            <strong>WhatsApp:</strong>+964 775 000 3399 
          </p>

          <p>
            <strong>Email:</strong> info@futuergeneration.com
          </p>
        </div>

        {/* Right Form */}
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Please enter your name" />
            <div className="required">
              <input type="text" placeholder="Please enter your WhatsApp" />
              <span>*</span>
            </div>
          </div>

          <div className="required">
            <input type="email" placeholder="Please enter your email" />
            <span>*</span>
          </div>

          <div className="required">
            <textarea placeholder="Please enter your message" rows="4"></textarea>
            <span>*</span>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
