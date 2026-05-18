"use client";

import { useState } from "react";

type Tab = "holdings" | "trend";

interface PortfolioHeroProps {
  defaultTab?: Tab;
  onChange?: (tab: Tab) => void;
}

export default function PortfolioHero({
  defaultTab = "holdings",
  onChange,
}: PortfolioHeroProps) {
  const [active, setActive] = useState<Tab>(defaultTab);

  const handleChange = (tab: Tab) => {
    setActive(tab);
    onChange?.(tab);
  };

  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "100%",
        background:
          "linear-gradient(176.45deg, #7480FE -7.42%, #FFFFFF 80.76%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "52px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        boxSizing: "border-box",
        minHeight: "300px",
        margin: 0,
      }}
    >
      {/* Greeting */}
      <div>
        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            fontStyle: "italic",
            letterSpacing: "-0.5px",
            color: "#ffffff",
            margin: 0,
            fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
          }}
        >
          Hi, Investor!
        </h1>
        <p
          style={{
            marginTop: "5px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Here's Your Wealth Overview
        </p>
      </div>

      {/* Tab pill */}
      <div
        style={{
          display: "flex",
          height: "50px",
          borderRadius: "999px",
          padding: "5px",
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <button
          onClick={() => handleChange("holdings")}
          style={{
            flex: 1,
            borderRadius: "999px",
            border: "none",
            fontSize: "14px",
            fontWeight: active === "holdings" ? 700 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
            background: active === "holdings" ? "#0D0D0D" : "transparent",
            color: active === "holdings" ? "#ffffff" : "#9198A4",
            boxShadow:
              active === "holdings" ? "0px 2px 8px rgba(0,0,0,0.25)" : "none",
          }}
        >
          Holdings
        </button>
        <button
          onClick={() => handleChange("trend")}
          style={{
            flex: 1,
            borderRadius: "999px",
            border: "none",
            fontSize: "14px",
            fontWeight: active === "trend" ? 700 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
            background: active === "trend" ? "#0D0D0D" : "transparent",
            color: active === "trend" ? "#ffffff" : "#9198A4",
            boxShadow:
              active === "trend" ? "0px 2px 8px rgba(0,0,0,0.25)" : "none",
          }}
        >
          Trend Money
        </button>
      </div>
    </div>
  );
}
