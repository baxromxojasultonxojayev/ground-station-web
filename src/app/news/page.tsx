"use client";

import { PageHero } from "@/components/Shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsPage() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHero 
        title={t("pages.news.title")} 
        subtitle={t("pages.news.desc")} 
      />
      <div className="section" style={{ padding: "4rem 2rem", minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2 style={{ color: "var(--text-secondary)", fontWeight: 300, letterSpacing: "0.05em", textTransform: "uppercase" }}>{t("pages.comingSoon")}</h2>
      </div>
    </main>
  );
}