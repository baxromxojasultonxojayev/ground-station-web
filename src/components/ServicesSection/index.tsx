"use client";

import React from "react";
import { ServiceCard, Service } from "./components/ServiceCard";
import { useLanguage } from "../../context/LanguageContext";
import { Camera, Map, Radar } from "lucide-react";
import "./style.scss";

const servicesData = [
  {
    id: "service-1",
    key: "service-1",
    icon: "Camera"
  },
  {
    id: "service-2",
    key: "service-2",
    icon: "Radar"
  },
  {
    id: "service-3",
    key: "service-3",
    icon: "Map"
  }
];

interface ServicesSectionProps {
  hideHeader?: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ hideHeader = false }) => {
  const { t } = useLanguage();

  return (
    <section id="services" className="section services-section">
      <div className="container">
        {!hideHeader && (
          <div className="section-header">
            <h2>{t("services.title")}</h2>
            <p>{t("services.desc")}</p>
          </div>
        )}

        <div className="services-grid">
          {servicesData.map((srv, idx) => {
            let iconNode = <Map size={40} strokeWidth={1} />;
            if (srv.icon === "Camera") iconNode = <Camera size={40} strokeWidth={1} />;
            if (srv.icon === "Radar") iconNode = <Radar size={40} strokeWidth={1} />;

            const service: Service = {
              id: srv.id,
              title: t(`services.items.${srv.key}.title`),
              description: t(`services.items.${srv.key}.desc`),
              icon: iconNode
            };
            return <ServiceCard key={service.id} service={service} idx={idx} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
