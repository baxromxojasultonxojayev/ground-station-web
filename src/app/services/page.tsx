"use client";

import { PageHero } from "@/components/Shared/PageHero";
import ServicesSection from "@/components/ServicesSection";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHero 
        title={t("menu.services")} 
        subtitle={t("services.desc")} 
      />
      <div style={{ paddingBottom: "4rem" }}>
        <ServicesSection hideHeader={true} />
      </div>
    </main>
  );
}