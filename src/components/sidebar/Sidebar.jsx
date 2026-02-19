import { useEffect, useState } from "react";
import "./Sidebar.css";

import img1 from "../../img/img2/future11.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";

const images = [img1, img2, img3];

const Sidebar = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400); // مدة fade out

    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="container-sidebar">
        <aside className="sidebar">
          <img
            key={index}
            src={images[index]}
            alt="sidebar"
            className={`sidebar-image ${fade ? "fade-in" : "fade-out"}`}
          />
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
