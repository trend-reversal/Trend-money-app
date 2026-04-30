"use client";

import Image from "next/image";

export default function HeaderHero() {
  const cards = [
    { bg: "bg-[#B8F0D8]", label: "Mutual Funds" },
    { isMain: true },
    { bg: "bg-[#EEF0FF]", label: "Fixed Deposit" },
  ];

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
          <h1 className="text-[24px] font-bold italic">Hi, Investor!</h1>
          <p className="text-[13px] text-white/80 mt-[2px]">
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
          <div className="absolute inset-[4px] bg-white/20 rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 🎠 Carousel */}
      <div className="flex items-center justify-center gap-3 px-2 overflow-hidden">
        {/* Left peek card */}
        <div className="w-[60px] h-[160px] rounded-[16px] bg-[#B8F0D8] flex-shrink-0 opacity-80" />

        {/* Main Card — only image inside */}
        <div className="flex-shrink-0 w-[224px] h-[224px] rounded-[6px] overflow-hidden shadow-lg bg-white flex items-center justify-center">
          <Image
            src="/images/gold.png"
            alt="Gold"
            width={180}
            height={180}
            className="object-contain"
            priority
          />
        </div>

        {/* Right peek card */}
        <div className="w-[60px] h-[160px] rounded-[16px] bg-[#EEF0FF] flex-shrink-0 opacity-80" />
      </div>

      {/* 📝 Card Info — outside the card */}
      <div className="mt-5 px-6 bg-white pt-5 pb-2 text-center">
        <h2 className="text-[18px] font-bold text-black underline underline-offset-2">
          24K Digital Gold
        </h2>
        <p className="text-[13px] text-gray-500 mt-1">
          Starting at ₹10 |{" "}
          <span className="text-green-600 font-semibold">Returns 12.5%*</span>
        </p>
        <button className="w-full mt-4 bg-black text-white py-[13px] rounded-[12px] font-semibold text-[14px] active:scale-[0.98] transition">
          Invest Now
        </button>
      </div>
    </section>
  );
}
