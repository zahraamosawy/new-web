import "./Products.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getItems } from "../api/items";
import { normalizeItemType } from "../../utils/normalizeItemType.js";

const ProductsCard = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getItems({ type: "product", page: 1, limit: 50 });
        
        const filteredProducts = data.filter(
          (item) => normalizeItemType(item.itemType) === "product"
        );
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (products.length === 0) return <div>No products available</div>;
  return (
    <section className="products-section">
      <h2 className="products-title">{t("productsCard.title")}</h2>

      <div className="products-grid">
        {products.map((item) => {
          const imageUrl =
            item.images?.length > 0
              ? `https://fg.com.iq/api/${item.images[0]}`
              : "/placeholder.jpg";

          return (
            <div className="product-card" key={item.idItem}>
              <img src={imageUrl} alt={item.titleEr} />
              <h3>
                {i18n.language === "ar"
                  ? item.titleAr
                  : item.titleEr}
              </h3>
              <p className="clamp">
                {i18n.language === "ar"
                  ? item.descriptionAr
                  : item.descriptionEr}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsCard;
