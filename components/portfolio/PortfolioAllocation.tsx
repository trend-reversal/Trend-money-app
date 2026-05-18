"use client";

import { useEffect, useRef } from "react";
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip);

interface AllocationItem {
  name: string;
  pct: number;
  color: string;
}

const ALLOCATIONS: AllocationItem[] = [
  { name: "Fixed Deposits", pct: 48, color: "#8B87EF" },
  { name: "Bonds", pct: 10, color: "#5DCAA5" },
  { name: "Digital Gold", pct: 22, color: "#EF9F27" },
  { name: "Digital silver", pct: 20, color: "#AFA9EC" },
];

export default function PortfolioAllocation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current || chartRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: ALLOCATIONS.map((a) => a.pct),
            backgroundColor: ALLOCATIONS.map((a) => a.color),
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: false,
        cutout: "65%",
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className="px-4 pb-4">
      <p className="mb-3 text-[17px] font-semibold text-black">
        Asset Allocation
      </p>
      <div className="rounded-[16px] bg-white p-5">
        <div className="relative mx-auto" style={{ width: 200, height: 200 }}>
          <canvas ref={canvasRef} width={200} height={200} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[22px] font-bold text-black leading-none">
              ₹5.4L
            </p>
          </div>
        </div>

        <div className="mt-5 divide-y divide-[#F1F1F1]">
          {ALLOCATIONS.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-[14px]"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: item.color }}
                />
                <span className="text-[14px] font-medium text-black">
                  {item.name}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5C8D0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
