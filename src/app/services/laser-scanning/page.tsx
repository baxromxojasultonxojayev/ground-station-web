"use client";

import { PageHero } from "@/components/Shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHero title={t("menu.laser")} />
      <div className="section" style={{ padding: "4rem 2rem", minHeight: "50vh" }}>
        <h2>{t("pages.comingSoon")}</h2>
      </div>
    </main>
  );
}