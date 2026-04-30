"use client";

import Image from "next/image";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-black text-white flex justify-around py-3 border-t border-gray-800">
      {/* 🔹 Home (Active) */}
      <div className="flex flex-col items-center text-xs">
        <div className="relative w-[22px] h-[22px]">
          <Image
            src="/images/home.png"
            alt="home"
            fill
            className="object-contain"
          />
        </div>
        <span className="mt-1">Home</span>
      </div>

      {/* 🔹 Portfolio */}
      <div className="flex flex-col items-center text-xs text-white">
        <div className="relative w-[22px] h-[22px]">
          <Image
            src="/images/portfolio.png"
            alt="portfolio"
            fill
            className="object-contain opacity-60"
          />
        </div>
        <span className="mt-1">Portfolio</span>
      </div>

      {/* 🔹 Trend AI */}
      <div className="flex flex-col items-center text-xs text-white">
        <div className="relative w-[22px] h-[22px]">
          <Image
            src="/images/ai.png"
            alt="ai"
            fill
            className="object-contain opacity-60"
          />
        </div>
        <span className="mt-1">Trend AI</span>
      </div>
    </div>
  );
}
