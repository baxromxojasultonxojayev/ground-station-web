"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Globe } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

interface SubMenuItem {
  key: string;
  href: string;
  labelKey: string;
}

interface MenuItem {
  key: string;
  href: string;
  labelKey: string;
  hasSubmenu?: boolean;
  subItems?: SubMenuItem[];
}

interface DrawerMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const { language, t, changeLanguage } = useLanguage();

  const handleLangSelect = (lang: any) => {
    changeLanguage(lang);
    setLangOpen(false);
  };

  const menuItems: MenuItem[] = [
    { key: "main", href: "/", labelKey: "menu.main" },
    {
      key: "about",
      href: "/about",
      labelKey: "menu.about",
      hasSubmenu: true,
      subItems: [
        { key: "training", href: "/about/training", labelKey: "menu.training" },
        { key: "licences", href: "/about/licences", labelKey: "menu.licences" },
        { key: "contacts", href: "/contacts", labelKey: "menu.contacts" },
      ]
    },
    { key: "career", href: "/career", labelKey: "menu.career" },
    { key: "news", href: "/news", labelKey: "menu.news" },
    { key: "photos", href: "/photos", labelKey: "menu.photos" },
    { key: "videos", href: "/videos", labelKey: "menu.videos" },
    {
      key: "products",
      href: "/products",
      labelKey: "menu.products",
      hasSubmenu: true,
      subItems: [
        { key: "uav", href: "/products/uav", labelKey: "menu.uav" },
        { key: "payloads", href: "/products/payloads", labelKey: "menu.payloads" }
      ]
    },
    {
      key: "services",
      href: "/services",
      labelKey: "menu.services",
      hasSubmenu: true,
      subItems: [
        { key: "aerial", href: "/services/aerial-photography", labelKey: "menu.aerial" },
        { key: "laser", href: "/services/laser-scanning", labelKey: "menu.laser" }
      ]
    },
    { key: "application", href: "/application", labelKey: "menu.application", hasSubmenu: true },
  ];

  const activeMenu = menuItems.find(item => item.key === activeMenuKey);
  const isExpanded = activeMenu && activeMenu.subItems && activeMenu.subItems.length > 0;

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex"
          }}
        >
          {/* Expanding Drawer Container */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isExpanded ? "640px" : "320px" }}
            exit={{ width: 0 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            style={{
              display: "flex",
              height: "100%",
              background: "#ffffff",
              boxShadow: "5px 0 25px rgba(0,0,0,0.2)",
              overflow: "hidden"
            }}
          >
            {/* LEFT PANE (Main Menu) */}
            <div style={{
              width: "320px",
              flexShrink: 0,
              padding: "2.5rem 3rem",
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              borderRight: isExpanded ? "1px solid #f0f0f0" : "none"
            }}>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#000000",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.85rem",
                  fontFamily: "'TT Norms', sans-serif",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  marginBottom: "3rem",
                  alignSelf: "flex-start"
                }}
              >
                <X size={20} strokeWidth={1} />
                {t("topBar.menu")}
              </button>

              <nav style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {menuItems.map((item) => (
                  <div
                    key={item.key}
                    onMouseEnter={() => {
                      if (item.hasSubmenu) {
                        setActiveMenuKey(item.key);
                      } else {
                        setActiveMenuKey(null);
                      }
                    }}
                    style={{
                      position: "relative",
                      display: "inline-block"
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.hasSubmenu) {
                          setActiveMenuKey(item.key);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                      style={{
                        fontFamily: "'TT Norms', sans-serif",
                        fontSize: "17px",
                        lineHeight: "1.2",
                        fontWeight: 300,
                        color: "#000000",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingBottom: "0.25rem",
                        borderBottom: activeMenuKey === item.key ? "1px solid #000000" : "1px solid transparent",
                        transition: "border-color 0.2s"
                      }}
                    >
                      <span style={{ maxWidth: "80%" }}>{t(item.labelKey)}</span>
                      {item.hasSubmenu && <ChevronRight size={16} strokeWidth={1} color="#666" />}
                    </Link>
                  </div>
                ))}
              </nav>

              <div style={{ marginTop: "auto", position: "relative" }}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    alignSelf: "flex-start"
                  }}
                >
                  <span style={{
                    color: "#000000",
                    fontFamily: "'TT Norms', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    {language || "RU"}
                  </span>
                  <Globe size={16} strokeWidth={1.5} color="#000000" />
                </button>

                {langOpen && (
                  <div style={{
                    position: "absolute",
                    bottom: "100%",
                    left: 0,
                    marginBottom: "0.5rem",
                    background: "#ffffff",
                    border: "1px solid #e5e5e5",
                    boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
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

            {/* RIGHT PANE (Sub Menu) */}
            <div style={{
              width: "320px",
              flexShrink: 0,
              background: "#fafafa",
              padding: "2.5rem 3rem",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ height: "4.5rem" }} />

              {activeMenu && activeMenu.subItems && (
                <motion.nav
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={activeMenu.key} // Re-animate when active menu changes
                  style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                >
                  {activeMenu.subItems.map(sub => (
                    <Link
                      key={sub.key}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontFamily: "'TT Norms', sans-serif",
                        fontSize: "17px",
                        lineHeight: "1.2",
                        fontWeight: 300,
                        color: "#666666",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        transition: "color 0.2s"
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#000000")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "#666666")}
                    >
                      {t(sub.labelKey)}
                    </Link>
                  ))}
                </motion.nav>
              )}
            </div>
          </motion.div>

          <div
            style={{ flex: 1, height: "100%" }}
            onClick={() => setMobileMenuOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
