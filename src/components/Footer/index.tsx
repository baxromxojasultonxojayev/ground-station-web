/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./style.scss";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="brand">
          <img src="/assets/icon/logo-black.svg" alt="ATRAK Logo" style={{ height: "30px", marginBottom: "2.5rem", objectFit: "contain", transform: "scale(2.5)", transformOrigin: "left center" }} />
          <p>{t("footer.desc")}</p>
        </div>

        {/* Links */}
        <div className="links-group">
          <h4>{t("footer.company")}</h4>
          <ul>
            <li><a href="#">{t("footer.about")}</a></li>
            <li><a href="#">{t("footer.career")}</a></li>
            <li><a href="#">{t("footer.news")}</a></li>
            <li><a href="#">{t("footer.contact")}</a></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="contact-group">
          <h4>{t("footer.contact")}</h4>
          <ul>
            <li>{t("footer.address1")}</li>
            <li>{t("footer.address2")}</li>
            <li className="mt"><a href="mailto:info@atrak.uz">info@atrak.uz</a></li>
            <li><a href="tel:+998711234567">+998 71 123 45 67</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
