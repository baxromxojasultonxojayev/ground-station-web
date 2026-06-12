"use client";

import React from "react";
import { ProductCard, Product } from "./components/ProductCard";
import { useLanguage } from "../../context/LanguageContext";
import "./style.scss";

const productsData = [
  {
    id: "zala-aero-1",
    key: "zala-aero-1",
    catKey: "uav",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "zala-aero-2",
    key: "zala-aero-2",
    catKey: "uav",
    imageUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "zala-payload-1",
    key: "zala-payload-1",
    catKey: "payload",
    imageUrl: "https://images.unsplash.com/photo-1516331165160-562db94b0593?q=80&w=2000&auto=format&fit=crop"
  },
  // {
  //   id: "zala-payload-2",
  //   key: "zala-payload-2",
  //   catKey: "payload",
  //   imageUrl: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?q=80&w=2000&auto=format&fit=crop"
  // }
];

interface ProductsGridProps {
  hideHeader?: boolean;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ hideHeader = false }) => {
  const { t } = useLanguage();

  return (
    <section id="products" className="section products-grid-section">
      <div className="container">
        {!hideHeader && (
          <div className="section-header">
            <h2>{t("products.title")}</h2>
            <p>{t("products.desc")}</p>
          </div>
        )}

        <div className="products-grid">
          {productsData.map((prod, idx) => {
            const product: Product = {
              id: prod.id,
              imageUrl: prod.imageUrl,
              name: t(`products.items.${prod.key}.name`),
              category: t(`products.categories.${prod.catKey}`)
            };
            return <ProductCard key={product.id} product={product} idx={idx} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
