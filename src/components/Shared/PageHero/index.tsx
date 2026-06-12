"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        padding: "8rem 2rem 4rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderBottom: "1px solid var(--border-muted)"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "800px" }}
      >
        <h1 
          style={{ 
            fontFamily: "'TT Norms', sans-serif",
            fontSize: "3rem", 
            fontWeight: 300, 
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            margin: 0,
            marginBottom: subtitle ? "1rem" : 0
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            style={{ 
              color: "var(--text-secondary)", 
              fontSize: "1.2rem", 
              fontWeight: 300,
              margin: 0 
            }}
          >
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
};
