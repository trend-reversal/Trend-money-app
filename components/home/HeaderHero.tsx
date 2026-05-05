"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeaderHero() {
  const assets = [
    { name: "Gold", img: "/images/gold-main.png" },
    { name: "Silver", img: "/images/silver-main.png" },
    { name: "Bond", img: "/images/bond-main.png" },
    { name: "FD", img: "/images/fd-main.png" },
  ];

  const [index, setIndex] = useState(0);

  // ✅ Swipe logic
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setIndex((prev) => (prev + 1) % assets.length);
    }

    if (touchStart - touchEnd < -50) {
      setIndex((prev) => (prev - 1 + assets.length) % assets.length);
    }
  };

  return (
    <section className="pt-14 pb-6 w-full h-[386px] -mt-[31px] bg-gradient-to-b from-[#7480FE] to-[#FFFFFF]">
      {/* Header */}
      <div className="flex justify-between items-center text-white px-6 mb-8">
        <div>
          <h1 className="text-[24px] italic">Hi, Investor!</h1>
          <p className="text-[13px] mt-[2px]">
            Let's Build Your Financial Future
          </p>
        </div>

        {/* Profile */}
        <div className="relative w-[48px] h-[48px]">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeDasharray="132"
              strokeDashoffset="33"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-[4px] bg-white rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#929292">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 🔥 Loop Carousel (Always 3 Cards) */}
      <div
        className="relative flex items-center justify-center overflow-hidden h-[220px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {[
          (index - 1 + assets.length) % assets.length, // left
          index, // center
          (index + 1) % assets.length, // right
        ].map((i, pos) => {
          const position = pos === 1 ? "center" : pos === 0 ? "left" : "right";

          return (
            <div
              key={i}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                transform:
                  position === "center"
                    ? "translateX(0) scale(1)"
                    : position === "left"
                      ? "translateX(-172px) scale(0.8)"
                      : "translateX(172px) scale(0.8)",
                zIndex: position === "center" ? 3 : 2,
              }}
            >
              <div
                style={{
                  width: position === "center" ? 200 : 148,
                  height: position === "center" ? 200 : 148,
                  borderRadius: 20,
                  backgroundColor: "#EAF9F4",
                  border:
                    position === "center"
                      ? "2px solid #FFFFFF"
                      : "1.5px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: position === "center" ? 16 : 12,
                  boxShadow:
                    position === "center"
                      ? "0 8px 24px rgba(0,0,0,0.10)"
                      : "0 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                <Image
                  src={assets[i].img}
                  alt={assets[i].name}
                  width={position === "center" ? 168 : 124}
                  height={position === "center" ? 168 : 124}
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Info */}
      <div className="mt-5 px-6 bg-white pt-5 pb-2 text-center">
        <h2 className="text-[18px] font-bold text-[#1C1B1B]">
          {assets[index].name}
        </h2>

        <p className="text-[13px] text-[#4D4D4D] mt-1">
          Starting at ₹10 |{" "}
          <span className="text-[#16A34A] font-semibold">12.5%</span>
        </p>

        <button className="w-[135px] h-[41px] mt-4 bg-[#131314] text-white rounded-[6px] text-[14px] active:scale-[0.98] transition">
          Invest Now
        </button>
      </div>
    </section>
  );
}
