import "./Products.css";

import p1 from "../../img/products/growatt1.png";
import p2 from "../../img/products/deye.png";
import p3 from "../../img/products/battery1.png";
import p4 from "../../img/products/hv-bob.png";
import p5 from "../../img/products/longi.png";
import p6 from "../../img/products/trina.png";
import p7 from "../../img/products/jinko.png";
import p8 from "../../img/products/growatt2.png";

const products = [
  { img: p1, title: "Growatt Intelligent String Inverter" },
  { img: p2, title: "Deye SUN-(5~12)K-SG04LP3" },
  { img: p3, title: "SBR096 / 128 / 160 / 192 / 224 / 256" },
  { img: p4, title: "High Voltage Series (HV) BOB" },
  { img: p5, title: "LONGi Hi-MO X6" },
  { img: p6, title: "Trina Vertex N 725W" },
  { img: p7, title: "Jinko Tiger Neo 575–600W" },
  { img: p8, title: "Growatt Smart Energy Storage" },
];

const ProductsCard = () => {
  return (
    <section className="products-section">
      <h2 className="products-title">PRODUCTS</h2>

      <div className="products-grid">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsCard;
