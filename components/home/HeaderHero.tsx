"use client";

import Image from "next/image";

export default function HeaderHero() {
  return (
    <section
      className="pt-14 pb-6"
      style={{
        background: "linear-gradient(180.01deg, #7480FE 0.01%, #FFFFFF 88.85%)",
      }}
    >
      {/* 🔵 Header */}
      <div className="flex justify-between items-center text-white px-6 mb-8">
        <div>
          <h1 className="text-[24px] font-inter italic">Hi, Investor!</h1>
          <p className="text-[13px] text-white  mt-[2px]">
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

      {/* 🎠 Carousel */}
      <div className="flex items-center justify-center overflow-hidden gap-3">
        {/* Left peek card — 182×175, pushed left by -124px so only 58px shows */}
        <div
          className="flex-shrink-0 bg-white shadow-md flex items-center justify-center p-[8px]"
          style={{
            width: 182,
            height: 175,
            borderRadius: 12,
            marginLeft: -124,
          }}
        >
          <div className="w-full h-full rounded-[14px] bg-[linear-gradient(137deg,rgba(198,252,221,0.2)_0%,#BAF4D3_86%)]" />
        </div>

        {/* Main Card */}
        <div className="flex-shrink-0 w-[224px] h-[224px] rounded-[6px] overflow-hidden shadow-xl">
          <Image
            src="/images/gold.png"
            alt="Gold"
            width={224}
            height={224}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Right peek card — mirrored, pushed right by -124px */}
        <div
          className="flex-shrink-0 bg-white shadow-md flex items-center justify-center p-[8px]"
          style={{
            width: 182,
            height: 175,
            borderRadius: 12,
            marginRight: -124,
          }}
        >
          <div className="w-full h-full rounded-[14px] border border-[#DCD7FF] bg-[linear-gradient(137deg,rgba(179,170,244,0.2)_0%,rgba(179,170,244,0.63)_86%)]" />
        </div>
      </div>

      {/* 📝 Card Info */}
      <div className="mt-5 px-6 bg-white pt-5 pb-2 text-center">
        <h2 className="text-[18px] font-inter font-bold text-[#1C1B1B] ">
          24K Digital Gold
        </h2>
        <p className="text-[13px] font-inter font-medium text-[#4D4D4D] mt-1">
          Starting at ₹10 | Returns{" "}
          <span className="text-[#16A34A] font-semibold">12.5%*</span>
        </p>
        <button className="w-[135px] h-[41px] mt-4 bg-[#131314] text-white rounded-[6px] font-inter font-medium text-[14px] active:scale-[0.98] transition">
          Invest Now
        </button>
      </div>
    </section>
  );
}
