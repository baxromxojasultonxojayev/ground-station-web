"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowLeft, ArrowRight, ArrowUpRight, Crosshair, Clock, Scale, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";

const drones = [
  {
    key: "t20",
    img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop", // Placeholder image, will use mix-blend-mode: multiply
    specs: {
      range: "100+ KM",
      endurance: "7+ H",
      weight: "17 KG",
      wingspan: "4 000 MM"
    }
  },
  {
    key: "t16",
    img: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=800&auto=format&fit=crop", // Placeholder
    specs: {
      range: "75+ KM",
      endurance: "4+ H",
      weight: "10.5 KG",
      wingspan: "2 800 MM"
    }
  }
];

export const NewProductsSlider: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % drones.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + drones.length) % drones.length);
  };

  const currentDrone = drones[currentIndex];

  return (
    <section className="section new-products-slider">
      <div className="container">
        <div className="slider-header">
          <h2>{t("newProducts.title")}</h2>
          <div className="controls">
            <button onClick={prevSlide} className="icon-btn" aria-label="Previous slide">
              <ArrowLeft size={24} strokeWidth={1} />
            </button>
            <button onClick={nextSlide} className="icon-btn" aria-label="Next slide">
              <ArrowRight size={24} strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="slider-container">
          <button onClick={prevSlide} className="arrow-btn" aria-label="Previous slide">
            <ArrowLeft size={24} strokeWidth={1} />
          </button>

          <div className="slide-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${currentIndex}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="slide-image"
              >
                <img src={currentDrone.img} alt={t(`newProducts.drones.${currentDrone.key}.title`)} />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${currentIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="slide-info"
              >
                <h3>{t(`newProducts.drones.${currentDrone.key}.title`)}</h3>
                <p className="desc">{t(`newProducts.drones.${currentDrone.key}.desc`)}</p>

                <div className="specs-grid">
                  <div className="spec-item">
                    <Crosshair className="spec-icon" size={24} strokeWidth={1.5} />
                    <div className="spec-text">
                      <span className="spec-label">{t("newProducts.specs.range")}</span>
                      <span className="spec-value">{currentDrone.specs.range}</span>
                    </div>
                  </div>
                  
                  <div className="spec-item">
                    <Scale className="spec-icon" size={24} strokeWidth={1.5} />
                    <div className="spec-text">
                      <span className="spec-label">{t("newProducts.specs.weight")}</span>
                      <span className="spec-value">{currentDrone.specs.weight}</span>
                    </div>
                  </div>

                  <div className="spec-item">
                    <Clock className="spec-icon" size={24} strokeWidth={1.5} />
                    <div className="spec-text">
                      <span className="spec-label">{t("newProducts.specs.endurance")}</span>
                      <span className="spec-value">{currentDrone.specs.endurance}</span>
                    </div>
                  </div>

                  <div className="spec-item">
                    <Plane className="spec-icon" size={24} strokeWidth={1.5} />
                    <div className="spec-text">
                      <span className="spec-label">{t("newProducts.specs.wingspan")}</span>
                      <span className="spec-value">{currentDrone.specs.wingspan}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/products/uav/${currentDrone.key}`} style={{ textDecoration: 'none' }}>
                  <button className="read-more-btn">
                    <div className="icon-box">
                      <ArrowUpRight size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text">{t("newProducts.readMore")}</span>
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <button onClick={nextSlide} className="arrow-btn" aria-label="Next slide">
            <ArrowRight size={24} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewProductsSlider;
