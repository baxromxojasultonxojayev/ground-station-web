"use client";

import { PageHero } from "@/components/Shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { num: "10+", label: t("about.stats.years") },
    { num: "25", label: t("about.stats.systems") },
    { num: "100k+", label: t("about.stats.flights") }
  ];

  return (
    <main>
      <PageHero 
        title={t("about.title")} 
        subtitle={t("about.desc")} 
      />
      
      {/* Mission Section */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "var(--bg-primary)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem", textTransform: "uppercase" }}>{t("about.missionTitle")}</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
              {t("about.missionDesc")}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1574268688489-0c6198f24b2b?q=80&w=1000&auto=format&fit=crop" 
              alt="Mission" 
              style={{ width: "100%", borderRadius: "12px", filter: "grayscale(30%) contrast(1.2)" }} 
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "4rem 2rem", backgroundColor: "#0f1115", borderTop: "1px solid #1f2228", borderBottom: "1px solid #1f2228" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "2rem" }}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              style={{ textAlign: "center" }}
            >
              <h3 style={{ fontSize: "4rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>{stat.num}</h3>
              <p style={{ color: "#888", fontSize: "0.9rem", letterSpacing: "0.1em" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section style={{ padding: "6rem 2rem", backgroundColor: "var(--bg-primary)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem", textTransform: "uppercase" }}>{t("about.historyTitle")}</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t("about.historyDesc")}
          </p>
        </div>
      </section>
    </main>
  );
}