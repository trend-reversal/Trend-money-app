"use client";

interface PortfolioOverviewProps {
  totalValue?: string;
  changeAmount?: string;
  changePct?: string;
  invested?: string;
  currentReturns?: string;
  returnsPct?: string;
}

function MiniBarChart() {
  const bars = [
    { height: 18, opacity: 0.2 },
    { height: 26, opacity: 0.3 },
    { height: 34, opacity: 0.4 },
    { height: 42, opacity: 0.55 },
    { height: 50, opacity: 0.7 },
    { height: 58, opacity: 0.85 },
    { height: 64, opacity: 1 },
  ];

  return (
    <svg width="88" height="64" viewBox="0 0 88 64" style={{ flexShrink: 0 }}>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={2 + i * 13}
          y={64 - b.height}
          width="9"
          height={b.height}
          rx="2"
          fill="#F0F1FD"
        />
      ))}
    </svg>
  );
}

export default function PortfolioOverview({
  totalValue = "₹12,74,350",
  changeAmount = "₹1,23,450",
  changePct = "10.70%",
  invested = "₹11,50,900",
  currentReturns = "₹1,23,450",
  returnsPct = "10.70%",
}: PortfolioOverviewProps) {
  return (
    <div
      style={{
        width: "100%",
        padding: "12px 8px 16px 8px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "189.3px",
          borderRadius: "19.67px",
          background: "#FFFFFF",
          boxShadow:
            "0px 6.56px 8.19px -4.92px #E0E7FF, 0px 16.39px 20.49px -4.1px #E0E7FF",
          opacity: 1,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Top row: label + bar chart */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{ fontSize: "12px", color: "#8A929F", fontWeight: 400 }}
              >
                Total Portfolio Value
              </span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8A929F"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            <p
              style={{
                fontSize: "30px",
                fontWeight: 700,
                letterSpacing: "-1px",
                color: "#0D0D0D",
                margin: "8px 0 0 0",
                lineHeight: 1,
              }}
            >
              {totalValue}
            </p>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#16A05D",
                marginTop: "6px",
              }}
            >
              ▲ {changeAmount} ({changePct})
            </p>
          </div>

          <MiniBarChart />
        </div>

        {/* Stats row */}
        <div
          style={{
            borderTop: "1px solid #F0F1FD",
            marginTop: "18px",
            paddingTop: "16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#A0A7B3",
                margin: 0,
              }}
            >
              Invested Amount
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#0D0D0D",
                marginTop: "5px",
              }}
            >
              {invested}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#A0A7B3",
                margin: 0,
              }}
            >
              Current Returns
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#16A05D",
                marginTop: "5px",
              }}
            >
              {currentReturns}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#A0A7B3",
                margin: 0,
              }}
            >
              Returns %
            </p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#16A05D",
                marginTop: "5px",
              }}
            >
              ▲ {returnsPct}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
