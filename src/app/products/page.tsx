"use client";

import { PageHero } from "@/components/Shared/PageHero";
import ProductsGrid from "@/components/ProductsGrid";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHero 
        title={t("menu.products")} 
        subtitle={t("products.desc")} 
      />
      <div style={{ paddingBottom: "4rem" }}>
        <ProductsGrid hideHeader={true} />
      </div>
    </main>
  );
}