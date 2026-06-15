"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Globe, ArrowLeft } from "lucide-react";
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
  const [mobileSubMenu, setMobileSubMenu] = useState<MenuItem | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const { language, t, changeLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Render Mobile SubMenu View
  if (isMobile && mobileSubMenu) {
    return (
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "#ffffff",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem"
            }}
          >
            {/* Header: X and Logo */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#000" }}
              >
                <X size={28} strokeWidth={1} />
              </button>
              <div style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "2px", fontFamily: "var(--font-family-mono)" }}>
                ATRAK
              </div>
              <div style={{ width: 28 }} /> {/* spacer for centering */}
            </div>

            {/* Back Button */}
            <button
              onClick={() => setMobileSubMenu(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                fontFamily: "'TT Norms', sans-serif",
                letterSpacing: "0.05em",
                marginBottom: "2.5rem",
                padding: 0
              }}
            >
              <ArrowLeft size={18} strokeWidth={1} />
              {t("topBar.back") || "NAZAD"}
            </button>

            {/* Sub Menu Links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {mobileSubMenu.subItems?.map(sub => (
                <Link
                  key={sub.key}
                  href={sub.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileSubMenu(null);
                  }}
                  style={{
                    fontFamily: "'TT Norms', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 300,
                    color: "#666",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}
                >
                  {t(sub.labelKey)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Render Main Menu (Desktop + Mobile)
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
            background: isMobile ? "#ffffff" : "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex"
          }}
        >
          {/* Expanding Drawer Container */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isMobile ? "100%" : (isExpanded ? "640px" : "320px") }}
            exit={{ width: 0 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            style={{
              display: "flex",
              height: "100%",
              background: "#ffffff",
              boxShadow: isMobile ? "none" : "5px 0 25px rgba(0,0,0,0.2)",
              overflowY: "auto",
              overflowX: "hidden"
            }}
          >
            {/* LEFT PANE (Main Menu) */}
            <div style={{
              width: isMobile ? "100%" : "320px",
              flexShrink: 0,
              padding: isMobile ? "1.5rem" : "2.5rem 3rem",
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              borderRight: (!isMobile && isExpanded) ? "1px solid #f0f0f0" : "none"
            }}>
              
              {/* Header inside pane */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
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
                    padding: 0
                  }}
                >
                  <X size={isMobile ? 28 : 20} strokeWidth={1} />
                  {!isMobile && t("topBar.menu")}
                </button>
                {isMobile && (
                  <div style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "2px", fontFamily: "var(--font-family-mono)" }}>
                    ATRAK
                  </div>
                )}
                {isMobile && <div style={{ width: 28 }} />}
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
                {menuItems.map((item) => (
                  <div
                    key={item.key}
                    onMouseEnter={() => {
                      if (!isMobile && item.hasSubmenu) {
                        setActiveMenuKey(item.key);
                      } else if (!isMobile) {
                        setActiveMenuKey(null);
                      }
                    }}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      paddingBottom: isMobile ? "0.5rem" : "0.25rem",
                      borderBottom: (!isMobile && activeMenuKey === item.key) ? "1px solid #000000" : "1px solid transparent",
                      transition: "border-color 0.2s"
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontFamily: "'TT Norms', sans-serif",
                        fontSize: isMobile ? "22px" : "17px",
                        lineHeight: "1.2",
                        fontWeight: 300,
                        color: "#4a4a4a",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t(item.labelKey)}
                    </Link>
                    {item.hasSubmenu && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isMobile) {
                            setMobileSubMenu(item);
                          } else {
                            setActiveMenuKey(item.key);
                          }
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "0",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center"
                        }}
                      >
                        <ChevronRight 
                          size={isMobile ? 24 : 18} 
                          strokeWidth={1} 
                          color="#4a4a4a" 
                        />
                      </button>
                    )}
                  </div>
                ))}
              </nav>

              <div style={{ marginTop: "auto", paddingTop: "2rem", position: "relative" }}>
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
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANE (Sub Menu) - Hidden on Mobile */}
            {!isMobile && (
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
            )}
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
