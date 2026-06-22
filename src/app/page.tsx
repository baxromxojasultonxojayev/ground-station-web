"use client";

import React from "react";
import HeroBanner from "../components/HeroBanner";
import CapabilitiesSection from "../components/CapabilitiesSection";
import NewProductsSlider from "../components/NewProductsSlider";
import ProductsGrid from "../components/ProductsGrid";
import ServicesSection from "../components/ServicesSection";
import PartnersSection from "../components/PartnersSection";

const Home: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Main Hero Video/Banner */}
      <HeroBanner />

      {/* Capabilities */}
      <CapabilitiesSection />

      {/* New Products Slider */}
      <NewProductsSlider />

      {/* Products & Solutions */}
      <ProductsGrid />

      {/* Services */}
      <ServicesSection />

      {/* Partners */}
      <PartnersSection />
    </div>
  );
};

export default Home;
