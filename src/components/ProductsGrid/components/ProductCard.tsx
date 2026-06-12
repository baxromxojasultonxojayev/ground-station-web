"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  idx: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="product-card"
    >
      <div className="img-container">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
        />
      </div>

      <div className="content">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
      </div>
    </motion.div>
  );
};
