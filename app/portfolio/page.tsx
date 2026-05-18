"use client";

import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioOverview from "@/components/portfolio/PortfolioOverview";
import PortfolioAssets from "@/components/portfolio/PortfolioAssets";
import PortfolioPerformance from "@/components/portfolio/PortfolioPerformance";
import PortfolioAllocation from "@/components/portfolio/PortfolioAllocation";

export default function PortfolioPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "white",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      }}
    >
      {/* Full bleed gradient hero */}
      <PortfolioHero defaultTab="holdings" />

      {/* Rest of content — centered max 390px */}
      <div
        style={{
          margin: "0 auto",
          width: "100%",
          maxWidth: "390px",
          background: "white",
          padding: 0,
        }}
      >
        <PortfolioOverview
          totalValue="₹12,74,350"
          changeAmount="₹1,23,450"
          changePct="10.70%"
          invested="₹11,50,900"
          currentReturns="₹1,23,450"
          returnsPct="10.70%"
        />
        <PortfolioAssets />
        <PortfolioPerformance />
        <PortfolioAllocation />
      </div>
    </main>
  );
}
