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

  // ✅ Swipe states
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

  // Badge style (same as your original)
  const badgeStyle = (size: number, isMain = false) => ({
    width: size,
    height: size,
    borderRadius: 20,
    backgroundColor: "#EAF9F4",
    border: isMain ? "2px solid #A8E8D4" : "1.5px solid #C4EEE0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMain ? 16 : 12,
    boxShadow: isMain
      ? "0 8px 24px rgba(0,0,0,0.10)"
      : "0 4px 12px rgba(0,0,0,0.06)",
    flexShrink: 0,
    cursor: "pointer",
    overflow: "hidden",
  });

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

      {/* 🔥 FINAL LOOP CAROUSEL */}
      <div
        className="flex items-center justify-center overflow-hidden gap-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT */}
        <div
          style={{ ...badgeStyle(148), marginLeft: -90 }}
          onClick={() =>
            setIndex((prev) => (prev - 1 + assets.length) % assets.length)
          }
        >
          <Image
            src={assets[(index - 1 + assets.length) % assets.length].img}
            alt="prev"
            width={124}
            height={124}
            className="w-full h-full object-contain"
          />
        </div>

        {/* CENTER */}
        <div
          style={badgeStyle(200, true)}
          onClick={() => setIndex((prev) => (prev + 1) % assets.length)}
        >
          <Image
            src={assets[index].img}
            alt="main"
            width={168}
            height={168}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* RIGHT */}
        <div
          style={{ ...badgeStyle(148), marginRight: -90 }}
          onClick={() => setIndex((prev) => (prev + 1) % assets.length)}
        >
          <Image
            src={assets[(index + 1) % assets.length].img}
            alt="next"
            width={124}
            height={124}
            className="w-full h-full object-contain"
          />
        </div>
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
