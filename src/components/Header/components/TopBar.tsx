"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, Search, Globe, Maximize } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

interface TopBarProps {
  scrolled: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ scrolled, setMobileMenuOpen }) => {
  const { language, t, changeLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const handleLangSelect = (lang: any) => {
    changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        transition: "all 0.3s ease",
        background: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#000000"
      }}
    >
      {/* LEFT: Menu and Products */}
      <div style={{ display: "flex", alignItems: "center", width: "33%", gap: "2rem" }}>
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'TT Norms', sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "0.85rem",
            letterSpacing: "0.05em"
          }}
        >
          <Menu size={18} strokeWidth={1} />
          <span className="hidden md:inline">{t("topBar.menu")}</span>
        </button>

        <Link
          href="/products"
          style={{
            textDecoration: "none",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'TT Norms', sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "0.85rem",
            letterSpacing: "0.05em"
          }}
        >
          <Maximize size={16} strokeWidth={1.5} />
          <span className="hidden md:inline">{t("topBar.products")}</span>
        </Link>
      </div>

      {/* CENTER: Logo */}
      <div style={{ width: "33%", display: "flex", justifyContent: "center" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#000000", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{
            fontSize: "2rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            fontFamily: "sans-serif", // Zala font placeholder
            lineHeight: 1
          }}>ATRAK</span>
        </Link>
      </div>

      {/* RIGHT: Search, Language */}
      <div style={{ width: "33%", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "2rem" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#000000",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'TT Norms', sans-serif",
            fontWeight: 400,
            fontSize: "0.85rem",
            letterSpacing: "0.05em"
          }}
        >
          <span className="hidden md:inline">{t("topBar.search")}</span>
          <Search size={16} strokeWidth={1.5} />
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
          >
            <span style={{
              color: "#000000",
              fontFamily: "'TT Norms', sans-serif",
              fontWeight: 400,
              textTransform: "uppercase",
              fontSize: "0.85rem",
              letterSpacing: "0.05em"
            }}>
              {language || "RU"}
            </span>
            <Globe size={16} strokeWidth={1.5} color="#000000" />
          </button>

          {langOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "0.5rem",
              background: "#ffffff",
              border: "1px solid #e5e5e5",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              minWidth: "80px",
              zIndex: 200
            }}>
              {["uz", "ru", "en"].map(l => (
                <button
                  key={l}
                  onClick={() => handleLangSelect(l)}
                  style={{
                    padding: "0.75rem 1rem",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'TT Norms', sans-serif",
                    fontSize: "0.85rem",
                    color: language === l ? "#000000" : "#666666",
                    fontWeight: language === l ? 600 : 400,
                    textTransform: "uppercase"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
