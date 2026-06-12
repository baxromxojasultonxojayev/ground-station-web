"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceCardProps {
  service: Service;
  idx: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="service-card"
    >
      <div className="icon-wrapper">
        {service.icon}
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </motion.div>
  );
};
