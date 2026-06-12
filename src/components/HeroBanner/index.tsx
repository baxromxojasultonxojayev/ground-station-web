"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "./style.scss";

const bannerVideos = [
  "/videos/banner-drone.mp4",
  "/videos/drone-details.mp4"
];

const HeroBanner: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerVideos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerVideos.length) % bannerVideos.length);
  };

  return (
    <section className="hero-banner">
      {/* Background Video Slider */}
      <AnimatePresence mode="popLayout">
        <motion.video
          key={currentSlide}
          autoPlay
          muted
          playsInline
          onEnded={nextSlide}
          className="hero-video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <source src={bannerVideos[currentSlide]} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Slider Navigation Arrows */}
      <button className="slider-arrow left" onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={64} strokeWidth={1.5} />
      </button>
      <button className="slider-arrow right" onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={64} strokeWidth={1.5} />
      </button>

      {/* Slider Controls */}
      {/* <div className="slider-dots">
        {bannerVideos.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div> */}

      {/* <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <h1>
            {t("hero.title1")} <br />
            <span>{t("hero.title2")}</span>
          </h1>

          <p>
            {t("hero.desc")}
          </p>
         

          <div className="btn-group">
            <a href="#products" className="btn-primary">
              {t("hero.explore")}
            </a>
            <a href="#services" className="btn-secondary">
              {t("hero.services")}
            </a>
          </div>
        </motion.div>
      </div> */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="scroll-indicator"
      >
        <span>{t("hero.scroll")}</span>
        <div className="line-track">
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="line-progress"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
