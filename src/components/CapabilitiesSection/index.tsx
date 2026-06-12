"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./style.scss";

const data = [
  { key: "mission", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" },
  { key: "uav", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop" },
  { key: "ai", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop" },
  { key: "comm", img: "https://images.unsplash.com/photo-1544866582-98c94c8e9069?q=80&w=800&auto=format&fit=crop" },
  { key: "sim", img: "https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=800&auto=format&fit=crop" },
];

export const CapabilitiesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="capabilities" className="section capabilities-section">
      <div className="container">
        <div className="section-header">
          <h2>{t("capabilities.title")}</h2>
          <span className="hidden md:inline">{t("capabilities.subtitle")}</span>
        </div>

        <div className="capabilities-grid">
          {data.map((item) => (
            <div key={item.key} className="capability-card">
              <div 
                className="bg-img"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="bg-overlay" />
              <h3>{t(`capabilities.items.${item.key}`)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
