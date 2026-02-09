import { useEffect, useState } from "react";
import "./Sidebar.css";

import img1 from "../../img/img1.png";
import img2 from "../../img/img2.png";
import img3 from "../../img/img3.png";

const images = [img1, img2, img3];

const Sidebar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="container-sidebar">
        <aside className="sidebar">
          <img src={images[index]} alt="sidebar" />
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
