"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
);

type TimeFilter = "1D" | "1W" | "1M" | "3M" | "6M" | "1y";

const DATA: Record<TimeFilter, { labels: string[]; data: number[] }> = {
  "1D": {
    labels: ["9AM", "11AM", "1PM", "3PM", "5PM", "7PM"],
    data: [1265000, 1268000, 1262000, 1271000, 1274000, 1274350],
  },
  "1W": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    data: [1240000, 1252000, 1248000, 1261000, 1270000, 1274350],
  },
  "1M": {
    labels: ["W1", "W2", "W3", "W4"],
    data: [1200000, 1228000, 1251000, 1274350],
  },
  "3M": {
    labels: ["Jan", "Feb", "Mar"],
    data: [1130000, 1200000, 1274350],
  },
  "6M": {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    data: [970000, 980000, 970000, 1050000, 1130000, 1274350],
  },
  "1y": {
    labels: ["Oct'25", "Nov'25", "Dec'25", "Jan'26", "Feb'26", "Mar'26"],
    data: [950000, 980000, 970000, 1050000, 1130000, 1274350],
  },
};

export default function PortfolioPerformance() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [active, setActive] = useState<TimeFilter>("1y");

  useEffect(() => {
    if (!canvasRef.current) return;
    const { labels, data } = DATA[active];

    if (chartRef.current) {
      chartRef.current.data.labels = labels;
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.update("active");
      return;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: "#3B7CE8",
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              font: { size: 11 },
              color: "#A0A7B3",
              maxRotation: 0,
            },
          },
          y: {
            display: true,
            grid: {
              display: true,
              color: "#EBEBF0",
              lineWidth: 1,
            },
            border: {
              display: false,
              dash: [5, 5],
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [active]);

  const filters: TimeFilter[] = ["1D", "1W", "1M", "3M", "6M", "1y"];

  return (
    <div style={{ padding: "0 16px 16px 16px" }}>
      <p
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#0D0D0D",
          marginBottom: "12px",
        }}
      >
        Portfolio Performance
      </p>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "20px 16px 12px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* Chart */}
        <div style={{ position: "relative", height: "200px" }}>
          <canvas ref={canvasRef} />
        </div>

        {/* Time filter — flat, no background, active = bold black */}
        <div
          style={{
            display: "flex",
            marginTop: "12px",
            borderTop: "1px solid #F0F1FD",
            paddingTop: "10px",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                padding: "6px 0",
                fontSize: "13px",
                fontWeight: active === f ? 700 : 400,
                color: active === f ? "#0D0D0D" : "#A0A7B3",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
