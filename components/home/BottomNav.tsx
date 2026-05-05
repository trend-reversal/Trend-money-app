"use client";

import Image from "next/image";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-black text-white flex justify-around py-3 border-t border-gray-800">
      {/* 🔹 Home (Active) */}
      <div className="flex flex-col items-center text-xs">
        <div className="relative w-[22px] h-[22px]">
          <Image
            src="/images/my-money.svg"
            alt="my-money"
            fill
            className="object-contain"
          />
        </div>
        <span className="mt-1">My Money</span>
      </div>

      {/* 🔹 Portfolio */}
      <div className="flex flex-col items-center text-xs text-white">
        <div className="relative w-[22px] h-[22px]">
          <Image
            src="/images/portfolio.svg"
            alt="portfolio"
            fill
            className="object-contain opacity-60"
          />
        </div>
        <span className="mt-1">Portfolio</span>
      </div>

      {/* 🔹 Trend AI */}
      {/* 🔹 Trend AI */}
      <div className="flex flex-col items-center text-xs text-white relative">
        {/* 🔥 New Badge */}
        <div className="absolute -top-5 right-0 w-[60px] h-[24px]">
          <Image
            src="/images/new.png"
            alt="new"
            fill
            className="object-contain"
          />
        </div>

        {/* AI Icon */}
        <div className="relative w-[22px] h-[22px]">
          <Image
            src="/images/ai.svg"
            alt="ai"
            fill
            className="object-contain opacity-80"
          />
        </div>

        <span className="mt-1">AI Assistant</span>
      </div>
    </div>
  );
}
