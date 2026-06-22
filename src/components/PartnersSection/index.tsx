/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./style.scss";

const PartnersSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section partners-section">
      <div className="container">
        <div className="section-header">
          <h2>{t("partners.title")}</h2>
        </div>
        <div className="partners-grid">
          <div className="partner-card">
            <div className="partner-logo">
              <img src="/assets/icon/nr-logo.png" alt="NR Partner" />
            </div>
            <p className="partner-name">NR Partner</p>
          </div>
          <a href="https://eascompany.uz/en/" target="_blank" rel="noopener noreferrer" className="partner-card clickable">
            <div className="partner-logo">
              <img src="/assets/icon/eas-logo.jpeg" alt="EAS Company" />
            </div>
            <p className="partner-name">EAS Company</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
