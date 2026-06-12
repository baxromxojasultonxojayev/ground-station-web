"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";
import { ArrowUpRight, Crosshair, Clock, Scale, Plane, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./style.scss";

// We could fetch this from the translations or have a constant to get the img URL.
const droneImages: Record<string, string> = {
  t20: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop",
  t16: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?q=80&w=800&auto=format&fit=crop"
};

const ProductDetailPage = () => {
  const { id } = useParams() as { id: string };
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"desc" | "specs">("desc");

  const droneData: any = t(`newProducts.drones.${id}`);
  const detailsT: any = t("productDetails");

  if (typeof droneData === "string") {
    return (
      <div className="product-detail-page">
        <main className="product-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Product not found</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <main className="product-main">
        <div className="back-link">
          <Link href="/">
            <ArrowLeft size={16} />
            <span>{detailsT.back || "Back"}</span>
          </Link>
        </div>

        <section className="top-section">
          <div className="image-gallery">
            <div className="thumbnails">
              <div className="thumb active">
                <img src={droneImages[id]} alt="thumb" />
              </div>
            </div>
            <div className="main-image">
              <img src={droneImages[id]} alt={droneData.title} />
            </div>
          </div>

          <div className="info-panel">
            <h1>{droneData.title}</h1>
            <p className="short-desc">{droneData.desc}</p>

            {/* 4 Specs */}
            <div className="specs-grid">
              <div className="spec-item">
                <Crosshair size={24} strokeWidth={1.5} />
                <div className="spec-text">
                  <span className="label">{t("newProducts.specs.range")}</span>
                  <span className="value">{droneData.tableSpecs.range}</span>
                </div>
              </div>
              <div className="spec-item">
                <Scale size={24} strokeWidth={1.5} />
                <div className="spec-text">
                  <span className="label">{t("newProducts.specs.weight")}</span>
                  <span className="value">{droneData.tableSpecs.takeoffWeight}</span>
                </div>
              </div>
              <div className="spec-item">
                <Clock size={24} strokeWidth={1.5} />
                <div className="spec-text">
                  <span className="label">{t("newProducts.specs.endurance")}</span>
                  <span className="value">{droneData.tableSpecs.endurance}</span>
                </div>
              </div>
              <div className="spec-item">
                <Plane size={24} strokeWidth={1.5} />
                <div className="spec-text">
                  <span className="label">{t("newProducts.specs.wingspan")}</span>
                  <span className="value">{droneData.tableSpecs.wingspan}</span>
                </div>
              </div>
            </div>

            <button className="submit-request-btn">
              <div className="icon-box">
                <ArrowUpRight size={24} strokeWidth={1.5} />
              </div>
              <span className="text">{detailsT.submitRequest}</span>
            </button>
          </div>
        </section>

        <section className="tabs-section">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "desc" ? "active" : ""}`}
              onClick={() => setActiveTab("desc")}
            >
              {detailsT.tabs.desc}
            </button>
            <button
              className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
              onClick={() => setActiveTab("specs")}
            >
              {detailsT.tabs.specs}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "desc" && (
              <div className="desc-tab">
                {droneData.fullDesc.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}

                {droneData.benefits && droneData.benefits.length > 0 && (
                  <>
                    <h4>{detailsT.keyBenefits}</h4>
                    <ul>
                      {droneData.benefits.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="specs-tab">
                <table className="specs-table">
                  <tbody>
                    {Object.entries(droneData.tableSpecs).map(([key, val]) => {
                      const label = detailsT.specLabels[key] || key;
                      return (
                        <tr key={key}>
                          <td className="spec-name">{label}</td>
                          <td className="spec-value">{val as string}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;
